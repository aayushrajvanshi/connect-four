import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: "Poppins", sans-serif;
  }
  
  * {
    box-sizing: border-box;
    user-select: none;
  }
`;

export default GlobalStyles;
