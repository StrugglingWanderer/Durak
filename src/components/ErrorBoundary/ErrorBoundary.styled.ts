import styled from 'styled-components';

export const StyledErrorBoundary = styled.div`
  position: absolute;
  inset: 0;

  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  background: var(--tg-theme-secondary-bg-color);

  font-family: 'Roboto', sans-serif;
  color: var(--tg-theme-text-color);

  & > hr {
    width: 80%;
  }
`;

export const ErrorText = styled.div`
  padding: 20px 0;
  font-size: 20px;
`;

export const ErrorDetails = styled.details`
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  white-space: pre-wrap;
  text-overflow: ellipsis;
  overflow-x: hidden;
  font-size: 14px;
`;

export const ErrorDetailsSummary = styled.summary`
  width: 100%;
  text-align: center;
  font-size: 1rem;
  cursor: pointer;
`;

export const CopyButton = styled.button`
  margin-top: 15px;
  padding: 10px 15px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  background: var(--tg-theme-button-color);
  border: none;
  border-radius: 6px;

  font-family: inherit;
  font-size: 18px;
  font-weight: normal;
  line-height: 1;
  color: var(--tg-theme-button-text-color);
  cursor: pointer;
`;
