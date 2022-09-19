import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }

  body {
    background: ${theme.mainColor};
    padding-top: 20vw;
  }
`;

export default GlobalStyle;
