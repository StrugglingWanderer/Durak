import styled from 'styled-components';
import { createHand } from 'styled';

const { Hand, CardInHandContainer, CardInHand } = createHand({
  width: 68,
  cardWidth: 30,
  overlap: 10,
});

export const OpponentHand = styled(Hand)`
  position: absolute;
  z-index: -3;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);

  margin-top: -30px;

  &:not(:empty)::after {
    flex: none;
    width: var(--remaining-width);
  }
`;

export const OpponentCardContainer = styled(CardInHandContainer)``;

export const OpponentCard = styled(CardInHand).attrs({ flipped: true })`
  box-shadow: 0 0 3px black;
`;
