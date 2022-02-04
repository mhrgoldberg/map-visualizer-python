import React, { PureComponent } from 'react'
import styled from 'styled-components'

export default class Logo extends PureComponent {
  render() {
    return (
      <Div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-map"
        >
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
          <line x1="8" y1="2" x2="8" y2="18"></line>
          <line x1="16" y1="6" x2="16" y2="22"></line>
        </svg>
      </Div>
    )
  }
}

const Div = styled.div`
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  svg:hover {
    color: var(--primary-cyan);
  }

  @media only screen and (max-width: 550px) {
    padding: 2rem 1rem;
    svg {
      width: 2.5rem;
      top: 4rem;
    }
  }
`
