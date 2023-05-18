import styled from 'styled-components';
import { VscDebugDisconnect } from 'react-icons/vsc';
import { Player } from 'components';
import { SVGIcon } from 'styled';

export const StyledOpponents = styled.ul`
  height: 58px;
  display: flex;
  justify-content: space-around;

  & > :nth-child(5),
  & > :nth-last-child(5) {
    margin-top: 15px;
  }

  & > :nth-child(4),
  & > :nth-last-child(4) {
    margin-top: 5px;
  }
`;

export const OpponentPlayer = styled(Player).attrs({ forwardedAs: 'li' })``;

export const DisconnectIconPanel = styled.div<{ outlined?: boolean }>`
  position: absolute;
  z-index: -2;
  top: calc(var(--outline-width) * ${(props) => (props.outlined ? 2 : 1)});
  left: 50%;
  transform: translateX(-50%);
  margin-top: 12px;
  width: calc(100% - var(--outline-width) * 2);
  height: calc(100% - var(--outline-width) * 2);
  display: flex;
  justify-content: center;
  align-items: flex-end;

  background: rgba(128, 128, 128, 0.8);
  border-radius: var(--border-radius);

  color: black;
`;

export const DisconnectIconWrapper = styled(SVGIcon)`
  margin: -4.8px 0;
  width: 22px;
  height: 22px;
`;

export const DisconnectIcon = styled(VscDebugDisconnect)`
  transform: rotate(45deg) scale(0.87);
`;
