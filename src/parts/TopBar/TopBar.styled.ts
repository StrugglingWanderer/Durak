import styled from 'styled-components';
import { SVGIcon } from 'styled';

export const StyledTopBar = styled.div`
  display: flex;

  &:before {
    content: '';
    flex: 0 1 calc(100% / 3);
  }

  & > :last-child {
    flex: 0 1 calc(100% / 3);
  }
`;

export const RuleIcons = styled.ul`
  flex: 0 1 calc(100% / 3);
  margin: min(1.2vw, 15px);
  display: flex;
  column-gap: min(3vw, 30px);
  list-style: none;
`;

export const RuleIconWrapper = styled(SVGIcon).attrs({ as: 'li' })`
  width: min(7.2vw, 22px);
  height: min(7.2vw, 22px);
`;

export const Bet = styled.div`
  padding-right: 2px;
  text-align: right;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: clamp(20px, 5vw, 30px);
  line-height: 1;

  & :nth-child(2) {
    margin-top: -4px;
  }
`;
