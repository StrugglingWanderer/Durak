import { useContext } from 'react';
import StateContext, { StateContextLoadedValue } from 'contexts/StateContext';
import WebApp from '@twa-dev/sdk';
import { socket } from 'lib';
import {
  StyledActionBar,
  LeftSide,
  RightSide,
  Button,
  ActionHint,
  SurrenderButton,
  FlagIconWrapper,
} from './ActionBar.styled';
import { BsFlag as FlagIcon } from 'react-icons/bs';
import Player from 'components/Player';

function handleSurrender() {
  WebApp.showConfirm('Вы хотите сдаться?', (isConfirmed) => {
    if (isConfirmed) socket.emit('game', { action: 'surrender' });
  });
}

function ActionBar() {
  const [state] = useContext(StateContext) as StateContextLoadedValue,
    { user, table: board } = state.game;

  const hints = {
    waiter: undefined,
    attacker: 'Ваш ход',
    nextAttacker: 'Ход противника',
    defender: 'Противник атакует',
    winner: undefined,
    loser: undefined,
  };

  const btnTypes = {
    ready: {
      label: 'Готов',
      onClick: () => {
        if (!user.ready) socket.emit('game', { action: 'ready' });
      },
    },

    passTake: {
      label: 'Пас',
      onClick: () => socket.emit('game', { action: 'pass' }),
    },

    passBeaten: {
      label: 'Бито',
      onClick: () => socket.emit('game', { action: 'pass' }),
    },

    take: {
      label: 'Взять',
      onClick: () => socket.emit('game', { action: 'take' }),
    },
  };

  const isCompletelyBeaten = board?.length && board?.every((cell) => cell.length === 2);

  //* Defining action button type
  let btn = null;

  switch (user.role) {
    case 'attacker':
      if (user.pass) break;

      if (state.game.take) btn = btnTypes.passTake;
      if (isCompletelyBeaten) btn = btnTypes.passBeaten;
      break;

    case 'nextAttacker':
      if (user.pass || !state.game.access) break;

      if (state.game.take) btn = btnTypes.passTake;
      if (isCompletelyBeaten) btn = btnTypes.passBeaten;
      break;

    case 'defender':
      if (board?.length !== 0 && !isCompletelyBeaten && !state.game.take)
        btn = btnTypes.take;
      break;
  }
  if (!user.ready) btn = btnTypes.ready;

  return (
    <StyledActionBar>
      <LeftSide>
        {btn ? (
          <Button onClick={btn.onClick}>{btn.label}</Button>
        ) : (
          user &&
          user.status === 'playing' &&
          !user.pass && <ActionHint>{hints[user.role]}</ActionHint>
        )}
      </LeftSide>

      {user && <Player player={user} />}

      <RightSide>
        {user.status === 'playing' && (
          <SurrenderButton onClick={handleSurrender}>
            <FlagIconWrapper>
              <FlagIcon />
            </FlagIconWrapper>
          </SurrenderButton>
        )}
      </RightSide>
    </StyledActionBar>
  );
}

export default ActionBar;
