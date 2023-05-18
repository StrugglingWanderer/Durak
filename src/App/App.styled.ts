import styled from 'styled-components';

export const StyledApp = styled.div`
  position: relative;
  z-index: 0;

  height: 100vh;
  display: flex;
  flex-direction: column;

  background: var(--c-secondary-bg);
  overflow: hidden;
`;

export const SpinnerContainer = styled.div`
  height: var(--tg-viewport-height);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Table = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
