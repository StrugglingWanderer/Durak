import styled, { keyframes } from 'styled-components';

const bubbleAppear = keyframes`
  from {
    opacity: 0.5;
    transform: scale(2);
  }
`;

export const BubbleStackingContext = styled.div<{ visible?: boolean }>`
  position: absolute;
  z-index: 100;
  bottom: 105%;
  right: 0;

  display: ${(props) => (props.visible ? 'block' : 'none')};

  animation: ${bubbleAppear} 0.6s;
`;

export const Bubble = styled.div`
  --tail-size: 12px;
  --border-width: 1px;

  padding: 0.2em 0.6em;

  background: var(--c-white);

  border: var(--border-width) solid black;
  border-radius: 0.2em;

  text-align: center;
  color: black;

  &::before,
  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    top: calc(100% - 3px);
    right: 0.2em;
    width: var(--tail-size);
    height: var(--tail-size);
    background: inherit;
    border: inherit;
    transform: rotate(90deg) skewX(50deg) translateX(-6px);
  }

  &::after {
    z-index: 1;
    transform: rotate(90deg) skewX(50deg) translateX(-6px) scale(0.9);

    border: none;
  }

  & > * {
    position: relative;
    z-index: 101;
  }
`;
