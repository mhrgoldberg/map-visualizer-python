import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  @-ms-viewport {
  width: device-width;
  }

  :root {
    /* Primary Colors */
    --primary-dark: #0b132b;
    --primary-light: #8899A6;
    --primary-cyan: #5bc0be;
    --primary-gray: #5d718a;
    --primary-pink: #BF5A7C;
    --primary-alert: #E88268;
    --primary-green: #6C9C2F;
    --primary-blue: #5177E8;
    /* Secondary Colors */
    --secondary-dark: #1c2541;
    --secondary-cyan: #6fffe9;
    --secondary-pink: #DB7093;

    /* sizing */
    --input-border-radius: 0.3rem;
    --nav-height: 7rem;
  }

  /* Body */
  html {
    width: 100%;
    height: 100%;
    font-size: 62.5%;
  }

  body {
    /* style */
    background: var(--primary-dark);
    color: var(--primary-light);
     /* typography */
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

  main {
    margin: auto
  }
  
  /* Lists */
  ul {
    margin: 0;
    padding: 0;
    li {
      list-style: none;
    }
  }

  /* Link */
  a {
    font-size: 1rem;
    color: var(--primary-light);
    line-height: 1.3;
    text-decoration: none;
    border-bottom: 0.2rem solid transparent;
  }
  a:hover {
    border-bottom: 0.2rem solid var(--primary-pink);
    color: var(--primary-cyan);
  }
  
  .transparent_underline {
    :hover {border-bottom: 0.2rem solid transparent;}
  }

  /* Text */
  p {
    font-size: 1.2rem;
    line-height: 1.6;
  }

  /* Form input */
  form {
    /* layout (Form Grid)*/
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 2rem;
    place-items: center center;
    width: 40rem;
    padding: 4rem;
    /* style */
    background-color: var(--secondary-dark);
    border-radius: 1rem;

    button {
      /* layout */
      width: calc(100% - 2rem);
      /* typography */
      font-size: 2.2rem;
      font-weight: 500;
    }
  }
  select, input {
    /* layout */
    /* width: 100%; */
    padding: 1rem 0.5rem;
    /* typography */
    font-size: 1.8rem;
    /* style */
    color: var(--primary-light);
    background: transparent;
    border: none;
    border-bottom: 0.2rem solid var(--primary-cyan);
  }

  select {
    /* -moz-appearance: none;  */
    -webkit-appearance: none;
    border-radius: 0;

    option {
      background: var(--secondary-dark)
    }
    /* appearance: none; */
  }

  select:hover {
    cursor: pointer;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    /* Specifically for Chrome autofill background */
    -webkit-box-shadow: 0 0 0 30px var(--secondary-dark) inset !important;
    box-shadow: none;
  }
  input:-webkit-autofill {
    /* Specifically for Chrome autofill text color */
    -webkit-text-fill-color: var(--primary-light) !important;
  }

  input::placeholder, select::placeholder{
    color: var(--primary-gray);
  }

  input:focus, select:focus{
    outline: none;
    color: var(--secondary-cyan);
    border-bottom: 0.2rem solid var(--secondary-cyan);
  }

    

  /* Button */
  button {
    /* layout */
    margin: 1rem;
    padding: 0.25em 1em;
    width:100%;
    height: 4rem;
    /* typograpy */
    font-size: 2.0rem;
    /* style */
    background: transparent;
    border-radius: var(--input-border-radius);
    border: 0.2rem solid var(--primary-cyan);
    color: var(--primary-cyan);
  }

  button:hover {
    cursor: pointer;
    color: var(--primary-dark);
    background: var(--primary-cyan); 
  }

  ::placeholder{
    color: var(--primary-light);
  }

  /* Headers */
  .form-header{
    grid-column: 1;
    grid-row: 1;
    /* layout */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  h1 {
    margin: .2rem;
    padding: .5rem;
    color: var(--primary-light);
    font-size: 4rem;
  }

  h2 {
    color: var(--primary-light);
    font-size: 3.5rem;
    margin: .2rem;
  }

  h3 {
    color: var(--primary-light);
    font-size: 3.0rem;
    margin: .2rem;
  }
  
  h4 {
    color: var(--primary-light);
    font-size: 2.5rem;
    margin: .2rem;
  }
  h5 {
    color: var(--primary-light);
    font-size: 2.0rem;
    margin: .2rem;
  }
  h6 {
    color: var(--primary-light);
    font-size: 1.0rem;
    margin: .2rem;
  }


  /* Media Queries */
  @media only screen and (max-width: 550px) {
    html {
      font-size: 45%;
    }
  }
  `
