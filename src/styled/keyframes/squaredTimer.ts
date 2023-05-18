import { keyframes } from 'styled-components';

const squaredTimer = keyframes`
  0% {
    clip-path: polygon(
      50% 0,
      50% 50%,
      50% 0,
      100% 0,
      100% 100%,
      0 100%,
      0 0
    );
  }

  12.5% {
    clip-path: polygon(50% 0, 50% 50%, 100% 0, 100% 0, 100% 100%, 0 100%, 0 0);
  }

  37.5% {
    clip-path: polygon(
      50% 0,
      50% 50%,
      100% 100%,
      100% 100%,
      100% 100%,
      0 100%,
      0 0
    );
  }

  62.5% {
    clip-path: polygon(50% 0, 50% 50%, 0 100%, 0 100%, 0 100%, 0 100%, 0 0);
  }

  87.5% {
    clip-path: polygon(50% 0, 50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
  }
  
  100% {
    clip-path: polygon(50% 0, 50% 50%, 50% 0, 50% 0, 50% 0, 50% 0, 50% 0);
  }
`;

export default squaredTimer;
