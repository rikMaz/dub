import {createGlobalStyle} from "styled-components";

export default createGlobalStyle`
:root {
   --red-dark: #9f0d2f;
   --beige: #FDF1DC;
  
   --size-xs: 4px;
   --size-s: 8px;
   --size-m: 12px;
   --size-l: 16px;
   --size-xl: 24px;
   --size-xxl: 32px;
   
   --border-round: 50px;
  }
  
  * {
    box-sizing: border-box;
  }
  
  html, body {
    margin: 0;
    font-family: "Futura";
  }
  
  body {
    background-color: #333;
  }
   
  input, textarea {
    font-size: 1em;
    font-family: inherit;
  }
`;