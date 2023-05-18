import { WebAppUser } from '@twa-dev/types';
import { Card } from 'types/card';
import { State, Player, PlayerMove } from 'types/state';

function state(value: State) {
  console.info('Game state updated: ', value);
}

function responseError(message: string) {
  console.error('Socket response error: ' + message);
}

function imageFailed(src: string) {
  console.error('Failed to load image: ' + src);
}

function invalidCardSize(size: number) {
  console.error('Invalid card size. Size must be greater than 0. Given: ' + size);
}

function unexpectedCard(card: Card) {
  console.error(`Could not find ${card[0]} of ${card[1]} in hand.`);
}

function nonExistentBoardCell(boardCellIndex: number) {
  console.error(`Board cell (${boardCellIndex}) is not exists.`);
}

function fullBoardCell(boardCellIndex: number) {
  console.error(`Board cell (${boardCellIndex}) is full of cards.`);
}

function nonExistentUserPlayer(webAppUser: WebAppUser) {
  let user = '';
  if (webAppUser.username) user += webAppUser.username;
  else {
    user += webAppUser.first_name;
    if (webAppUser.last_name) user += ' ' + webAppUser.last_name;
    user += ` width ID ${webAppUser.id}.`;
  }

  throw Error('Can not find user ' + user);
}

function playerMoves(player: Player, action: PlayerMove, cards: Card | [Card, Card]) {
  console.info(`Player ${player.name}(${player.id}) moves: ${action}:`, cards);
}

export default {
  state,
  responseError,
  imageFailed,
  invalidCardSize,
  unexpectedCard,
  nonExistentBoardCell,
  fullBoardCell,
  nonExistentUserPlayer,
  playerMoves,
};
