import WebApp from '@twa-dev/sdk';
import { io } from 'socket.io-client';

const matchId = new URLSearchParams(location.search).get('tgWebAppStartParam');

const socket = io('https://durakfortg.click', {
  transports: ['websocket'],
  auth: WebApp.initDataUnsafe.user,
  query: { id: matchId },
});

//* Handling

export default socket;
