import { OpponentHand as StyledOpponentHand } from './OpponentHand.styled';
import OpponentCardContainer from './OpponentCardContainer';
import { PlayerStatus } from 'types/state';

function OpponentHand({ cards, status }: { cards: number; status: PlayerStatus }) {
  return (
    <StyledOpponentHand>
      {status === 'playing'
        ? [...Array(cards).keys()].map((key) => <OpponentCardContainer key={key} />)
        : []}
    </StyledOpponentHand>
  );
}

export default OpponentHand;
