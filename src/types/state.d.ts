import { Card } from './card';

//* Rules
export type RuleKey = 'passing' | 'throwOnlyNeighbors' | 'cheating' | 'draws' | 'rapid';

export type Rules = Record<RuleKey, boolean>;

//* Player
export type PlayerRole =
  | 'waiter'
  | 'attacker'
  | 'nextAttacker'
  | 'defender'
  | 'winner'
  | 'loser';

export type PlayerStatus = 'waiting' | 'playing';

export type PlayerMove = 'attack' | 'defend';

export interface Player {
  id: number;
  name: string;
  lang?: string;
  /** Image URL */
  avatar?: string;
  /** Array of cards if the player is the user, otherwise the number of cards */
  role: PlayerRole;
  status: PlayerStatus;
  cards: Card[] | number;
  isNew: boolean;
  ready?: boolean;
  disconnected?: boolean;
  pass?: boolean;
}

export interface User extends Omit<Player, 'cards'> {
  cards: Card[];
}

export interface Opponent extends Omit<Player, 'cards'> {
  cards: number;
}

export type BoardCell = [Card] | [Card, Card];

export type GameStatus = 'waiting' | 'playing';

// The differences from the StateGame are marked with //!
interface Game {
  status: GameStatus;
  rules: Rules; //! Record<RuleKey, 0 | 1>
  deck: number;
  remainingCards: number;
  money: boolean; //! 0 | 1
  bet: number;
  maxPlayers: number;
  players: Player[];
  user: User; //! Omitted
  opponents: Opponent[]; //! Omitted
  access?: boolean;
  trump?: Card;
  table?: BoardCell[];
  timeForRound?: number;
  timer?: number;
  take?: boolean;
  transferCard?: Card; //! Omitted
}

export type Action =
  | 'join'
  | 'disconnect'
  | 'ready'
  | 'start'
  | 'newRound'
  | 'attack'
  | 'pass'
  | 'take'
  | 'surrender';

export interface State {
  type: 'move' | 'error';
  action: Action;
  by?: number;
  message?: string;
  game: Game;
}

//* Socket pure response differences
type GameKeysDifference = 'user' | 'opponents' | 'transferCard' | 'rules' | 'money';

export interface SocketGame extends Omit<Game, GameKeysDifference> {
  rules: Record<RuleKey, 0 | 1>;
  money: 0 | 1;
}

export interface SocketData extends Omit<State, 'game'> {
  game: SocketGame;
}
