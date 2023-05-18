import { useContext } from 'react';
import { useImagePreload } from 'hooks';
import { StateContext } from 'contexts';
import { preloadingImages } from 'assets';
import { Spinner } from 'components';
import { TopBar, Opponents, Deck, Board, UserHand, ActionBar } from 'parts';
import { StyledApp, SpinnerContainer, Table } from './App.styled';

function App() {
  const [state] = useContext(StateContext);
  const isPreloaded = useImagePreload(preloadingImages);

  //* Render
  if (state && isPreloaded) {
    const { game } = state;

    return (
      <StyledApp>
        <TopBar rules={game.rules} money={game.money} bet={game.bet} />
        <Opponents players={game.opponents} />

        <Table>
          <Deck />
          <Board />
        </Table>

        <UserHand cards={game.user.cards} status={game.user.status} />
        <ActionBar />
      </StyledApp>
    );
  }

  return (
    <StyledApp>
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    </StyledApp>
  );
}

export default App;
