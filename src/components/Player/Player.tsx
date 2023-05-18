import { useContext, ReactNode } from 'react';
import StateContext, { StateContextLoadedValue } from 'contexts/StateContext';
import useAvatar from './hooks/useAvatar';
import useBubbleVisibility from './hooks/useBubbleVisibility';
import { FaCheck as ReadyIcon } from 'react-icons/fa';
import {
  StyledPlayer,
  PlayerStackingContext,
  PlayerOutline,
  ReadyIconWrapper,
  Username,
} from './Player.styled';
import { BubbleStackingContext, Bubble } from './Bubble.styled';
import { Player as IPlayer } from 'types/state';

interface Props {
  className?: string;
  player: IPlayer;
  children?: ReactNode | ReactNode[];
}

function Player({ player, className, children, ...restProps }: Props) {
  const [state] = useContext(StateContext) as StateContextLoadedValue;

  const board = state.game.table;
  const isCompletelyBeaten = board?.every((cell) => cell.length === 2);

  const role = player.status === 'playing' ? player.role : undefined;

  //* Avatar loading
  const avatar = useAvatar(player);

  //* Bubble appearance
  let bubble: string | null = null;

  if (state.by === player.id) {
    switch (state.action) {
      case 'newRound':
      case 'pass':
        bubble = 'Пас';
        break;

      case 'take':
        bubble = 'Беру';
        break;
    }
  }
  const isBubbleVisible = useBubbleVisibility(bubble);

  //* Timer setting
  let isTimer = false,
    timeForRound = state.game.timeForRound,
    remainingTime = state.game.timer;

  switch (role) {
    case 'attacker':
      if (player.pass) break;

      if (state.game.take || isCompletelyBeaten) isTimer = true;
      break;

    case 'nextAttacker':
      if (player.pass || !state.game.access) break;

      if (state.game.take || isCompletelyBeaten) isTimer = true;
      break;

    case 'defender':
      if (!isCompletelyBeaten && !state.game.take) isTimer = true;
      break;
  }

  if (!isTimer) {
    timeForRound = undefined;
    remainingTime = undefined;
  }

  return (
    <PlayerStackingContext className={className}>
      <StyledPlayer {...restProps} avatar={avatar}>
        <Username>{player.name}</Username>
      </StyledPlayer>

      <PlayerOutline
        timeForRound={timeForRound}
        remainingTime={remainingTime}
        role={role}
      />

      {player.ready && state.game.status !== 'playing' && (
        <ReadyIconWrapper>
          <ReadyIcon />
        </ReadyIconWrapper>
      )}

      <BubbleStackingContext visible={isBubbleVisible}>
        <Bubble>
          <span>{bubble}</span>
        </Bubble>
      </BubbleStackingContext>

      {children}
    </PlayerStackingContext>
  );
}

export default Player;
