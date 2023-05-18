import styled from 'styled-components';
import { Card } from 'styled';

export const StyledDeck = styled.div`
  flex: none;
  position: relative;
  width: 28px;
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  align-items: center;
  justify-content: center;
`;

export const RemainingQuantity = styled.div`
  padding-left: 2px;
  font-size: 26px;
`;

export const Cards = styled.div`
  position: relative;
  margin-left: -62px;
  margin-right: 10px;
  transform: rotate(17deg);
`;

export const TopCard = styled(Card).attrs({ flipped: true })``;

export const TrumpCard = styled(Card)`
  position: absolute;
  z-index: -1;
  top: 50%;
  right: -32px;
  transform: translateY(-50%) rotate(90deg);
`;

export const TrumpPlaceholderCard = styled(Card)`
  position: absolute;
  left: 0;

  background-color: transparent;
  box-shadow: none;
`;
