import styled, { css, keyframes } from 'styled-components';
import { excludeForwardingProps } from 'helpers/styled-components';
import { SVGIcon, squaredTimer } from 'styled';
import { avatarDefault } from 'assets';
import { PlayerRole } from 'types/state';

export const PlayerStackingContext = styled.div<{ size?: number }>`
  --border-radius: 15%;
  --outline-width: 6px;

  flex: none;
  position: relative;
  width: ${(props) => props.size ?? 58}px;
  height: ${(props) => props.size ?? 58}px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledPlayer = styled.div<{ avatar?: string }>`
  flex: none;

  width: calc(100% - var(--outline-width) * 2);
  height: calc(100% - var(--outline-width) * 2);
  display: flex;
  overflow: hidden;

  border-radius: 15%;
  box-shadow: 0 0 7px hsl(0, 0%, 26%);

  background-image: url(${(props) => props.avatar ?? avatarDefault});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: white;
`;

export const Username = styled.div`
  --height: 1.1em;

  align-self: flex-end;

  padding: 0 2px;
  width: 100%;
  height: var(--height);
  overflow: hidden;

  background: rgba(128, 128, 128, 0.8);

  font-size: 11px;
  font-weight: var(--fw-light);
  text-align: center;
  line-height: var(--height);
  white-space: nowrap;
  text-overflow: ellipsis;
  color: white;
`;

interface PlayerOutlineProps {
  timeForRound?: number;
  remainingTime?: number;
  role?: PlayerRole;
}

export const PlayerOutline = styled.div.withConfig<PlayerOutlineProps>(
  excludeForwardingProps('role'),
)`
  position: absolute;
  z-index: -1;

  width: 100%;
  height: 100%;
  border-radius: 20%;

  ${({ role }) => css`
    background: ${role === 'defender'
      ? 'var(--c-yellow)'
      : role === 'attacker'
      ? 'var(--c-red)'
      : role === 'nextAttacker'
      ? 'red'
      : 'none'};
  `}

  ${({ timeForRound, remainingTime }) => {
    if (timeForRound && remainingTime)
      return css`
        animation-name: ${squaredTimer};
        animation-duration: ${timeForRound}ms;
        animation-delay: ${remainingTime - timeForRound}ms;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
      `;
    else
      return css`
        transform: scale(0.94);
      `;
  }}
`;

const readyIconAppear = keyframes`
  from {
    opacity: 0.5;
    transform: translate(-50%, 50%) scale(2);
  }
`;

export const ReadyIconWrapper = styled(SVGIcon)`
  position: absolute;
  top: calc(0px - 17px);
  left: calc(50% + 2.5px);
  transform: translate(-50%, 50%);

  color: var(--c-green);

  animation: ${readyIconAppear} 600ms;

  & > svg {
    stroke: black;
    stroke-width: 10px;
  }
`;
