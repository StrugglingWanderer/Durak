import { useContext } from 'react';
import StateContext, { StateContextLoadedValue } from 'contexts/StateContext';
import { FaSyncAlt as TransferIcon } from 'react-icons/fa';
import {
  StyledBoardCell,
  CardsContainer,
  CardOnBoard,
  TransferIconWrapper,
} from './BoardCell.styled';
import { Card } from 'types/card';

interface Props {
  cellNumber?: number;
  bottomCard?: Card;
  topCard?: Card;
  transferPlaceholder?: boolean;
}

function BoardCell(props: Props) {
  const { cellNumber, bottomCard, topCard, transferPlaceholder } = props;

  const [state] = useContext(StateContext) as StateContextLoadedValue,
    { user, transferCard } = state.game;

  return (
    <StyledBoardCell
      data-cell={transferPlaceholder ? 'transfer' : cellNumber}
      dragOverEffect={user.role === 'defender'}
    >
      <CardsContainer>
        {transferPlaceholder ? (
          <CardOnBoard value={transferCard}>
            {!transferCard && (
              <TransferIconWrapper>
                <TransferIcon />
              </TransferIconWrapper>
            )}
          </CardOnBoard>
        ) : (
          <CardOnBoard value={bottomCard} />
        )}

        {topCard && <CardOnBoard value={topCard} />}
      </CardsContainer>
    </StyledBoardCell>
  );
}

export default BoardCell;
