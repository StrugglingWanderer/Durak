import { forwardRef, useContext, RefObject } from 'react';
import StateContext, { StateContextLoadedValue } from 'contexts/StateContext';
import BoardCell from './BoardCell';
import { ReadyHint, StyledBoard } from './Board.styled';

const Board = forwardRef(function Board(_, ref) {
  const [state] = useContext(StateContext) as StateContextLoadedValue,
    { rules, table: board, deck, remainingCards, players, user, opponents } = state.game;

  const isPlaying = state.game.status === 'playing';
  const isBeatingStarted = board?.some((cell) => cell.length !== 1);
  const isFirstBeating = board?.length === 5 && remainingCards === deck;
  const boardMaxCells = isFirstBeating ? 5 : 6;

  //* Transfer availability
  const transferReceiver =
    isPlaying && opponents.find((opponent) => opponent.status === 'playing');

  const userHaveTransferCard = user.cards.some((cardInHand) =>
    board?.some(([cardOnBoard]) => cardOnBoard[0] === cardInHand[0]),
  );

  const isTransfer =
    board &&
    rules.passing &&
    user.role === 'defender' &&
    !isBeatingStarted &&
    board.length < boardMaxCells &&
    !state.game.take &&
    transferReceiver &&
    board.length + 1 <= transferReceiver.cards &&
    userHaveTransferCard;

  //* Defining ready hint text
  let readyHintText: string;

  if (user.ready)
    if (players.length === 1) {
      readyHintText = 'Ожидание игроков';
    } else {
      readyHintText = 'Ожидание готовности игроков';
    }
  else {
    readyHintText = 'Нажмите «Готов» для начала игры';
  }

  return (
    <StyledBoard ref={ref as RefObject<HTMLUListElement>} data-cell-parent>
      {isPlaying ? (
        <>
          {board?.map((cell, idx) => (
            <BoardCell
              bottomCard={cell[0]}
              topCard={cell[1]}
              cellNumber={idx}
              key={idx}
            />
          ))}

          {isTransfer && <BoardCell transferPlaceholder />}
        </>
      ) : (
        <ReadyHint>{readyHintText}</ReadyHint>
      )}
    </StyledBoard>
  );
});

export default Board;
