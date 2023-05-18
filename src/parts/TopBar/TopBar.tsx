import { memo } from 'react';
import { StyledTopBar, RuleIcons, RuleIconWrapper, Bet } from './TopBar.styled';
import {
  GiCardExchange as PassingIcon,
  GiBandit as CheatingIcon,
  GiShakingHands as FairPlayIcon,
  GiContract as TrowAllIcon,
  GiCardJoker as ClassicGameIcon,
} from 'react-icons/gi';
import {
  FaPeopleArrows as ThrowIcon,
  FaBalanceScale as DrawIcon,
  FaForward as RapidGameIcon,
} from 'react-icons/fa';
import { Rules } from 'types/state';

interface Props {
  rules: Rules;
  money: boolean;
  bet: number;
}

const TopBar = memo(function TopBar({ rules, money, bet }: Props) {
  // 💎 - virtual gems, 💵 - dollars
  const moneyEmoji = money ? '💵' : '💎';

  return (
    <StyledTopBar>
      <RuleIcons>
        {rules.passing && (
          <RuleIconWrapper>
            <PassingIcon />
          </RuleIconWrapper>
        )}

        {rules.throwOnlyNeighbors ? (
          <RuleIconWrapper>
            <ThrowIcon />
          </RuleIconWrapper>
        ) : (
          <RuleIconWrapper>
            <TrowAllIcon />
          </RuleIconWrapper>
        )}

        {rules.cheating ? (
          <RuleIconWrapper>
            <CheatingIcon />
          </RuleIconWrapper>
        ) : (
          <RuleIconWrapper>
            <FairPlayIcon />
          </RuleIconWrapper>
        )}

        {rules.draws ? (
          <RuleIconWrapper>
            <DrawIcon />
          </RuleIconWrapper>
        ) : (
          <RuleIconWrapper>
            <ClassicGameIcon />
          </RuleIconWrapper>
        )}

        {rules.rapid && (
          <RuleIconWrapper>
            <RapidGameIcon />
          </RuleIconWrapper>
        )}
      </RuleIcons>

      <Bet>
        <span>{bet}</span>
        <span>{moneyEmoji}</span>
      </Bet>
    </StyledTopBar>
  );
});

export default TopBar;
