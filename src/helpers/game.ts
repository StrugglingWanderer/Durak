import WebApp from '@twa-dev/sdk';
import { log } from 'helpers';
import { Player, User, Opponent } from 'types/state';
import { Card, Suit } from 'types/card';

export function findPlayer(playerId: number, players: Player[]) {
  return players.find((player) => player.id === playerId);
}

export function splitPlayers(players: Player[]) {
  const webAppUser = WebApp.initDataUnsafe.user;
  const userIndex = players.findIndex((player) => player.id === webAppUser?.id);

  if (userIndex === -1) {
    if (webAppUser) log.nonExistentUserPlayer(webAppUser);
  }

  let opponents = Array.from(players);
  const user = opponents.splice(userIndex, 1)[0] as User;

  const shift = opponents.splice(userIndex);
  opponents = [...shift, ...opponents];

  return {
    user: user as User,
    opponents: opponents as Opponent[],
  };
}

const defaultSuitOrder: Suit[] = ['diamonds', 'hearts', 'clubs', 'spades'];

export function sortCards(cards: Card[], trump: Card, order: Suit[] = defaultSuitOrder) {
  //* Forwarding trumps
  order.push(order.splice(order.indexOf(trump[1]), 1)[0]);

  return Array.from(cards).sort(([rankA, suitA], [rankB, suitB]) => {
    const sortBySuit = order.indexOf(suitA) - order.indexOf(suitB);

    return sortBySuit === 0 ? rankA - rankB : sortBySuit;
  });
}
