import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    background: ${theme.mainColor};
  }
`;

export default GlobalStyle;
