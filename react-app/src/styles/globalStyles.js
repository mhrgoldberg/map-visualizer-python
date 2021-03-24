import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.primaryDark};
    color: ${({ theme }) => theme.primaryLight};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 62.5%;
    text-rendering: optimizeLegibility;
    line-height: 1.5;
  }
  /* forms */
  form {
    width: 20rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  label {
    font-size: 1.2rem;
    line-height: 2;
    padding: 1rem;  
  }
  input {
    height: 1.5rem;
    width: 10rem;
    padding: 0.5rem;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.primaryLight};
    background: ${({ theme }) => theme.secondaryDark};
    border: none;
    border-radius: .3rem;
  }
  /* lists */
  ul {
    list-style: none;
  }
  /* Link */
  a {
    font-size: 1rem;
    color: ${({ theme }) => theme.primaryButton};
    line-height: 2;
  }
  a:hover {
    color: ${({ theme }) => theme.secondaryButton};
  }
  /* Text */
  p {
    font-size: 0.8rem;
    line-height: 1.8;
  }

  /* Button */

  button {
    font-size: 1.0rem;
    background: transparent;
    border-radius: .3rem;
    border: 0.2rem solid ${({ theme }) => theme.primaryButton};
    color: ${({ theme }) => theme.primaryButton};
    margin: 0.7rem;
    padding: 0.25em 1em;
    width: 100%;
    height: 3rem;
  }

  button:hover {
    cursor: pointer;
    border: 2px solid ${({ theme }) => theme.primaryDark};
    color: ${({ theme }) => theme.primaryDark};
    background: ${({ theme }) => theme.primaryButton};
  }
  `
