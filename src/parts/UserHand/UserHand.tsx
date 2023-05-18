import { TransitionGroup } from 'react-transition-group';
import { StyledUserHand } from './UserHand.styled';
import UserCardContainer from './UserCardContainer';
import { PlayerStatus } from 'types/state';
import { Card } from 'types/card';

function UserHand({ cards, status }: { cards: Card[]; status: PlayerStatus }) {
  return (
    <TransitionGroup component={StyledUserHand}>
      {status === 'playing'
        ? cards.map((value) => <UserCardContainer key={value.join()} card={value} />)
        : []}
    </TransitionGroup>
  );
}

export default UserHand;
