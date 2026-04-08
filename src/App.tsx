import { ErrorBoundary } from "./components/ErrorBoundary";
import { Posts } from "./pages/Posts";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      'Helvetica Neue', Arial, sans-serif;
    background: #f1f3f5;
    color: #212529;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export const App = () => (
  <>
    <GlobalStyle />
    <ErrorBoundary>
      <Posts />
    </ErrorBoundary>
  </>
);
