import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  html {
    width: 100%;
    height: 100%;
    font-size: 62.5%;
  }
  body {
    background: ${({ theme }) => theme.primary.dark};
    color: ${({ theme }) => theme.primary.light};
    font-family: 
      -apple-system, 
      BlinkMacSystemFont, 
      "Segoe UI", 
      Roboto, Helvetica, 
      Arial, 
      sans-serif, 
      "Apple Color Emoji", 
      "Segoe UI Emoji", 
      "Segoe UI Symbol";

    text-rendering: optimizeLegibility;
    line-height: 1.2;
  }
  /* forms */
  form {
    min-width: 40rem;
    max-width: 50rem;
    width: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background: ${({ theme }) => theme.secondary.dark};
    border-radius: 1rem;
  }

  
  
  /* lists */
  ul {
    list-style: none;
  }
  /* Link */
  a {
    font-size: 1rem;
    color: ${({ theme }) => theme.primary.light};
    line-height: 1.3;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  /* Text */
  p {
    font-size: 0.8rem;
    line-height: 1.6;
  }

  /* Button */

  button {
    font-size: 2.0rem;
    background: transparent;
    border-radius: .3rem;
    border: 0.2rem solid ${({ theme }) => theme.primary.cyan};
    color: ${({ theme }) => theme.primary.cyan};
    margin: 1rem;
    padding: 0.25em 1em;
    width:100%;
    height: 4rem;  
    /* transition: background 0.3s ease-in-out;    
    transition: color 0.1s ease-in-out  ;     */
  }

  /* button:focus {
    border: none;
    
  } */

  button:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.primary.dark};
    background: ${({ theme }) => theme.primary.cyan}; 
  }

  ::placeholder{
    color: ${({ theme }) => theme.primary.light};
  }

  h1 {
    color: ${({ theme }) => theme.primary.light};
    font-size: 4rem;
    margin: .2rem;
    padding: .5rem;
  }

  h2 {
    color: ${({ theme }) => theme.primary.light};
    font-size: 3.5rem;
    margin: .2rem;
  }
  h3 {
    color: ${({ theme }) => theme.primary.light};
    font-size: 3.0rem;
    margin: .2rem;
  }
  h4 {
    color: ${({ theme }) => theme.primary.light};
    font-size: 2.5rem;
    margin: .2rem;
  }
  h5 {
    color: ${({ theme }) => theme.primary.light};
    font-size: 2.0rem;
    margin: .2rem;
  }
  h6 {
    color: ${({ theme }) => theme.primary.light};
    font-size: 1.0rem;
    margin: .2rem;
  }



  `
