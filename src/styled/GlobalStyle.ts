import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --c-bg: var(--tg-theme-bg-color);
    --c-secondary-bg: var(--tg-theme-secondary-bg-color);
    --c-btn: var(--tg-theme-button-color);
    --c-btn-text: var(--tg-theme-button-text-color);
    --c-text: var(--tg-theme-text-color);
    --c-link: var(--tg-theme-link-color);
    --c-hint: var(--tg-theme-hint-color);

    --c-yellow: #ffcd00;
    --c-white: #ffffff;
    --c-red: #c8102e;
    --c-green: #2eb086;

    --ff-text: 'Roboto', sans-serif;
    --fw-light: 300;
    --fw-normal: 400;
    --fw-medium: 500;
  }

  *,
  ::before,
  ::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    /* overflow: hidden; */
    background: var(--c-secondary-bg);
    font-family: var(--ff-text);
    font-weight: var(--fw-light);
    color: var(--c-text);
    user-select: none;
  }

  ul {
    list-style: none;
  }
`;

export default GlobalStyle;
