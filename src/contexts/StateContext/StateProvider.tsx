import { useState, useEffect, PropsWithChildren } from 'react';
import StateContext from './StateContext';
import WebApp from '@twa-dev/sdk';
import { socket } from 'lib';
import { log } from 'helpers';
import { splitPlayers, sortCards } from 'helpers/game';
import { convert } from 'utils';
import { SocketData, State } from 'types/state';

function StateProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<State>();

  //* Socket connection
  useEffect(() => {
    socket.open();

    return () => {
      socket.close();
    };
  }, []);

  //* Handling socket events
  useEffect(() => {
    function handleGame(data: SocketData) {
      if (data.type === 'error') {
        log.responseError(data.message as string);

        const error = {
          message: null as string | null,
          isCritical: false,
        };

        switch (data.message) {
          case 'gameNotFound':
            error.message = 'Игра не найдена';
            error.isCritical = true;
            break;

          case 'notEnoughBalance':
            error.message = 'Недостаточно средств';
            error.isCritical = true;
            break;

          case 'gamePlaying':
            error.message = 'Игра уже идёт';
            error.isCritical = true;
            break;

          case 'gameFull':
            error.message = 'Комната переполнена';
            error.isCritical = true;
            break;

          case 'canNotJoin':
            error.message = 'Невозможно войти в комнату';
            error.isCritical = true;
            break;

          case 'gameNotInPlay':
            error.message = 'Игра ещё не началась';
            break;

          case 'missingToBeat':
            error.message = 'Неверная карта';
            break;

          case 'cardNotFound':
            error.message = 'Карта не найдена';
            break;

          case 'enoughCards':
            error.message = 'Слишком много карт';
            break;
        }

        const closeWebApp = error.isCritical ? WebApp.close : undefined;

        if (error.message) WebApp.showAlert(`Ошибка: ${error.message}.`, closeWebApp);
      }

      //* Splitting up players by creating `user` and `opponents` properties
      const { user, opponents } = splitPlayers(data.game.players);

      //* Unification boolean properties (if string or number passed)
      const rules = convert.toBoolean(data.game.rules);
      const money = convert.toBoolean(data.game.money);

      //* Creating state
      const stateData: State = {
        ...data,
        game: { ...data.game, rules, money, user, opponents },
      };

      //* Sorting cards
      const { game: stateGame } = stateData;
      if (Array.isArray(stateGame.user.cards) && stateGame.trump)
        stateGame.user.cards = sortCards(stateGame.user.cards, stateGame.trump);

      //* On initialize state
      if (!state) {
        WebApp.ready();
        WebApp.expand();
        WebApp.onEvent('viewportChanged', WebApp.expand);
      }

      setState(stateData);
    }

    socket.on('game', handleGame);

    return () => {
      socket.off('game', handleGame);
    };
  }, [state]);

  //* State logging
  useEffect(() => {
    if (state) log.state(state);
  }, [state]);

  return (
    <StateContext.Provider value={[state, setState]}>{children}</StateContext.Provider>
  );
}

export default StateProvider;
