import { useState, useRef, useCallback, useContext, PointerEvent } from 'react';
import { CSSTransition } from 'react-transition-group';
import StateContext, { StateContextLoadedValue } from 'contexts/StateContext';
import {
  UserCardContainer as StyledCardContainer,
  UserCard,
  UserCardContainerPlaceholder,
} from './UserHand.styled';

import { socket } from 'lib';
import { log } from 'helpers';

import { State } from 'types/state';
import { Card } from 'types/card';
import { TransitionActions, ExitHandler } from 'react-transition-group/Transition';

interface CSSTransitionProps extends TransitionActions {
  in?: boolean;
  onExited?: ExitHandler<HTMLLIElement>;
}

interface Props extends CSSTransitionProps {
  card: Card;
}

function UserCardContainer({ card, ...rest }: Props) {
  const cssTransitionProps: CSSTransitionProps = {
    in: rest.in,
    appear: rest.appear,
    enter: rest.enter,
    exit: rest.exit,
    onExited: rest.onExited,
  };

  const ref = useRef<HTMLLIElement>(null);

  const [state, setState] = useContext(StateContext) as StateContextLoadedValue;

  //* Drag'n'Drop
  //** State
  interface DragState {
    diffX: number;
    diffY: number;
    started: boolean;
  }

  const [drag, setDrag] = useState<DragState>();

  //** Drag-over effect nodes
  const dragOverElements = useRef<HTMLElement[]>([]);
  const clearDragOverEffect = () => {
    dragOverElements.current.forEach((element) => element.classList.remove('card-over'));
    dragOverElements.current = [];
  };

  //** Event handlers
  //*** PointerDown
  const handlePointerDown = useCallback((event: PointerEvent<HTMLDivElement>) => {
    //* Handles only main mouse button
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.style.cursor = 'grabbing';

    const { x, y } = event.currentTarget.getBoundingClientRect();

    const diffX = event.clientX - x,
      diffY = event.clientY - y;

    setDrag({ diffX, diffY, started: false });
  }, []);

  //*** PointerMove
  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!drag || !event.currentTarget.hasPointerCapture(event.pointerId)) return;

      if (!drag.started) {
        Object.assign(event.currentTarget.style, {
          position: 'fixed',
          zIndex: '999',
          marginTop: '0',
          marginLeft: '0',
          transform: 'none',
          transition: 'none',
          pointerEvents: 'none',
        });

        setDrag((drag) => {
          if (drag) return { ...drag, started: true };
        });
      }

      const pointTarget = document.elementFromPoint(event.clientX, event.clientY);

      const dropTarget = pointTarget?.closest('[data-cell]');

      clearDragOverEffect();

      if (dropTarget?.firstChild?.childNodes.length === 1) {
        dragOverElements.current.push(dropTarget as HTMLElement);
        dropTarget.classList.add('card-over');
      }

      //* Setting position of dragged card
      event.currentTarget.style.top = event.clientY - drag.diffY + 'px';
      event.currentTarget.style.left = event.clientX - drag.diffX + 'px';
    },
    [drag],
  );

  //*** PointerUp
  const handlePointerUp = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;

      event.currentTarget.releasePointerCapture(event.pointerId);

      clearDragOverEffect();

      event.currentTarget.setAttribute('style', '');

      const pointTarget = document.elementFromPoint(event.clientX, event.clientY);

      //* If drop into the cell
      type DropTarget = HTMLElement | null | undefined;
      let dropTarget: DropTarget = pointTarget?.closest('[data-cell]');

      if (dropTarget?.dataset.cell === 'transfer') {
        const newState = JSON.parse(JSON.stringify(state));
        newState.game.transferCard = card;

        setState(newState);

        socket.emit('game', { action: 'card', card });
      }

      const dropTargetCell = Number(dropTarget?.dataset.cell);

      //* If dropped into empty board
      if (!dropTarget) dropTarget = pointTarget?.closest('[data-cell-parent]');

      //* Calls throwCard function
      if (dropTarget) {
        switch (state.game.user.role) {
          case 'attacker':
            throwCard(card, 'attack');
            break;

          case 'nextAttacker':
            if (!state.game.access) break;
            throwCard(card, 'attack');
            break;

          case 'defender':
            if (
              (!dropTargetCell && dropTargetCell !== 0) ||
              (state.game.table && state.game.table[dropTargetCell].length > 1)
            )
              break;

            throwCard(card, 'defend', dropTargetCell);
            break;
        }
      }

      setDrag(undefined);

      function throwCard(
        card: Card,
        action: 'attack' | 'defend',
        boardCellIndex?: number,
      ) {
        const newState: State = JSON.parse(JSON.stringify(state));

        const board = newState.game.table,
          cardsInHand = newState.game.user.cards,
          deck = newState.game.deck,
          remainingCards = newState.game.remainingCards;

        if (!board) return;

        const thrownCardIndex = cardsInHand.findIndex(
          (cardInHand) => cardInHand[0] === card[0] && cardInHand[1] === card[1],
        );
        if (thrownCardIndex === -1) {
          log.unexpectedCard(card);
          return;
        }

        const thrownCard = cardsInHand.splice(thrownCardIndex, 1)[0];

        let sendData: Card | [Card, Card] | undefined;

        if (action === 'attack') {
          if ((board.length === 5 && remainingCards === deck) || board.length >= 6)
            return;

          boardCellIndex = board.push([thrownCard]) - 1;

          sendData = board[boardCellIndex][0] as Card;
        } else if (action === 'defend') {
          if (boardCellIndex === undefined) return;
          if (!board[boardCellIndex]) {
            log.nonExistentBoardCell(boardCellIndex);
            return;
          }
          if (board[boardCellIndex].length >= 2) {
            log.fullBoardCell(boardCellIndex);
            return;
          }

          board[boardCellIndex].push(thrownCard);

          sendData = board[boardCellIndex] as [Card, Card];
        }

        setState(newState);

        if (!sendData) return;

        const data = { action: 'card', card: sendData };
        socket.emit('game', data);

        const player = state.game.user;
        log.playerMoves(player, action, sendData);
      }
    },
    [card, state, setState],
  );

  const placeholderContainerRef = useRef(null);

  return (
    <CSSTransition
      nodeRef={ref}
      addEndListener={(done) => ref.current?.addEventListener('transitionend', done)}
      classNames="card"
      {...cssTransitionProps}
    >
      <>
        <StyledCardContainer ref={ref} drag={drag?.started}>
          <UserCard
            value={card}
            drag={drag?.started}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerLeave={handlePointerUp}
          />
        </StyledCardContainer>

        {drag?.started && <UserCardContainerPlaceholder ref={placeholderContainerRef} />}
      </>
    </CSSTransition>
  );
}

export default UserCardContainer;
