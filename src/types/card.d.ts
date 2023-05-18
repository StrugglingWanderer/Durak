export type Suit = 'clubs' | 'hearts' | 'spades' | 'diamonds';

export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

export type SizeObj = { width?: number; height?: number };

export type Card = [Rank, Suit];
