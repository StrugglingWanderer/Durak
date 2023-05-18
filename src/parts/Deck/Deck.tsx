import { useContext } from 'react';
import StateContext, { StateContextLoadedValue } from 'contexts/StateContext';
import {
  StyledDeck,
  RemainingQuantity,
  Cards,
  TopCard,
  TrumpCard,
  TrumpPlaceholderCard,
} from './Deck.styled';

function Deck() {
  const [state] = useContext(StateContext) as StateContextLoadedValue,
    { status, trump, deck, remainingCards } = state.game;

  if (status !== 'playing')
    return (
      <StyledDeck>
        <RemainingQuantity>{deck}</RemainingQuantity>
        <Cards>
          <TopCard />
        </Cards>
      </StyledDeck>
    );

  if (remainingCards)
    return (
      <StyledDeck>
        <RemainingQuantity>{remainingCards}</RemainingQuantity>
        <Cards>
          <TopCard />
          <TrumpCard value={trump} />
        </Cards>
      </StyledDeck>
    );

  return (
    <StyledDeck>{trump && <TrumpPlaceholderCard value={[1, trump[1]]} />}</StyledDeck>
  );
}

export default Deck;
