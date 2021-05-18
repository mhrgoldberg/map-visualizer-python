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
		--primary-gray: #3a506b;
		--primary-pink: #BF5A7C;
		--primary-alert: #E88268;
		--primary-green: #6C9C2F;
		--primary-blue: #5177E8;
		/* Secondary Colors */
		--secondary-dark: #1c2541;
		--secondary-cyan: #6fffe9;
		--secondary-pink: #DB7093; 
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
	}
	a:hover {
		text-decoration: underline;
	}

	/* Text */
	p {
		font-size: 0.8rem;
		line-height: 1.6;
	}

	/* Form input */
	select, input {
		/* layout */
		width: 100%;
		padding: 1rem 0.1rem;
		/* typography */
		font-size: 1.8rem;
		/* style */
		color: var(--primary-light);
		background: transparent;
		border: none;
		border-bottom: 0.2rem solid var(--primary-cyan);
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
		border-radius: .3rem;
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
	`
