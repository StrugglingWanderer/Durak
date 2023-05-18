import styled, { css, keyframes } from 'styled-components';
import { createHand } from 'styled';

const { Hand, CardInHandContainer, CardInHand } = createHand({
  cardHeight: 120,
  overlap: 25,
});

export const StyledUserHand = styled(Hand)`
  box-sizing: content-box;
  padding-top: 20px;
  margin-bottom: -20px;
`;

interface DragProp {
  drag?: boolean;
}

export const UserCardContainer = styled(CardInHandContainer)<DragProp>`
  transition: width 500ms;

  ${(props) =>
    props.drag &&
    css`
      width: 0px;
      transition: none;
    `}
`;

const hide = keyframes`
  to {
    width: 0px;
  }
`;

export const UserCardContainerPlaceholder = styled(CardInHandContainer)`
  animation: ${hide} 500ms forwards;
`;

export const UserCard = styled(CardInHand)<DragProp>`
  cursor: grab;
  transition: transform 200ms;

  ${(props) =>
    !props.drag &&
    css`
      @media (hover) {
        &:hover {
          transform: translateY(-14px);
        }
      }
    `}
`;
