import {
  StyledOpponents,
  OpponentPlayer,
  DisconnectIconPanel,
  DisconnectIconWrapper,
  DisconnectIcon,
} from './Opponents.styled';
import OpponentHand from './OpponentHand';
import { Opponent } from 'types/state';

const outlinedRoles = ['defender', 'attacker', 'nextAttacker'];

interface Props {
  players: Opponent[];
}

const Opponents = ({ players }: Props) => (
  <StyledOpponents>
    {players.map((player) => {
      const isOutlined = outlinedRoles.includes(player.role);

      return (
        <OpponentPlayer player={player} key={player.id}>
          {player.disconnected && (
            <DisconnectIconPanel outlined={isOutlined}>
              <DisconnectIconWrapper>
                <DisconnectIcon />
              </DisconnectIconWrapper>
            </DisconnectIconPanel>
          )}

          {<OpponentHand cards={player.cards} status={player.status} />}
        </OpponentPlayer>
      );
    })}
  </StyledOpponents>
);

export default Opponents;
