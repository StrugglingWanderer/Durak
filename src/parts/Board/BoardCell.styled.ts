import styled, { css } from 'styled-components';
import { Card, SVGIcon } from 'styled';

export const StyledBoardCell = styled.li<{ dragOverEffect?: boolean }>`
  flex: 0 0 calc(100% / 3);
  padding: 10px 0;
  width: calc(100% / 3);
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.dragOverEffect &&
    css`
      &.card-over > * > :only-child {
        box-shadow: 0.5px 1px 7px 3px var(--c-red);
      }
    `}
`;

export const CardsContainer = styled.div`
  position: relative;
`;

export const CardOnBoard = styled(Card)`
  --card-translate-x: 6px;
  --first-card-transform: translateX(var(--card-translate-x)) rotate(-5deg);

  &:first-child {
    transform: var(--first-card-transform);
    transition: box-shadow 150ms ease;
  }

  &:nth-child(2) {
    position: absolute;
    top: 8px;
    left: 20%;
    transform: translateX(var(--card-translate-x)) rotate(12deg);
  }
`;

export const TransferIconWrapper = styled(SVGIcon)`
  padding: 21%;
  width: 100%;
  height: 100%;
  color: black;
`;
