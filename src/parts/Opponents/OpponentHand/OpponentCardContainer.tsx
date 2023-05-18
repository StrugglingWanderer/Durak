import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import {
  OpponentCardContainer as StyledCardContainer,
  OpponentCard,
} from './OpponentHand.styled';

function OpponentCardContainer() {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <CSSTransition
      nodeRef={ref}
      addEndListener={(done) => ref.current?.addEventListener('transitionend', done)}
    >
      <StyledCardContainer ref={ref}>
        <OpponentCard />
      </StyledCardContainer>
    </CSSTransition>
  );
}

export default OpponentCardContainer;
