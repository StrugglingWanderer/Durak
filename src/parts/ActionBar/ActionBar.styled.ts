import styled from 'styled-components';
import { SVGIcon } from 'styled';

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
`;

export const RightSide = styled.div`
  display: flex;
  justify-content: flex-end;

  & > * {
    flex: none;
  }
`;

export const StyledActionBar = styled.div`
  flex: none;

  position: relative;
  z-index: 100;

  padding: 0 10px;
  width: 100%;
  height: 70px;

  display: flex;
  align-items: center;
  column-gap: 10px;

  background: var(--c-bg);
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  box-shadow: 0 1px 5px gray;

  & > ${LeftSide}, & > ${RightSide} {
    flex: 0 1 50%;
  }
`;

export const Button = styled.button`
  padding: 0 20px;
  height: 45px;

  display: flex;
  align-items: center;

  background: var(--c-btn);
  border: none;
  border-radius: 6px;

  font-family: inherit;
  font-size: 24px;
  font-weight: var(--fw-normal);
  line-height: 1;
  color: var(--c-btn-text);
  cursor: pointer;
`;
export const ActionHint = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 18px;
  line-height: 1;
  text-align: center;
`;

export const SurrenderButton = styled.button`
  all: unset;
  display: block;
  border-radius: 50%;
  cursor: pointer;

  @media (hover) {
    &:hover {
      background: rgba(128, 128, 128, 0.5);
    }
  }

  &:active {
    background: rgba(128, 128, 128, 0.5);
  }
`;

export const FlagIconWrapper = styled(SVGIcon)`
  box-sizing: content-box;
  padding: 10px;

  transform: rotate(10deg);
`;
