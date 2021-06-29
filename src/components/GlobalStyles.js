import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
* {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box
}
body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
}
`;
