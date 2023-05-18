import styled, { keyframes } from 'styled-components';

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const StyledSpinner = styled.div`
  position: relative;
  width: 80px;
  height: 80px;

  display: inline-block;

  & > * {
    position: absolute;
    margin: 8px;
    width: 64px;
    height: 64px;

    border: 8px solid currentColor;
    border-color: currentColor transparent transparent transparent;
    border-radius: 50%;

    animation: ${rotation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  }

  & > :first-child {
    animation-delay: -0.45s;
  }

  & > :nth-child(2) {
    animation-delay: -0.3s;
  }

  & > :nth-child(3) {
    animation-delay: -0.15s;
  }
`;
