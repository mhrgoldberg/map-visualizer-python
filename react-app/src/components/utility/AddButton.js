import React, { PureComponent } from 'react'
import styled from 'styled-components'

export default class AddButton extends PureComponent {
  render() {
    return (
      <Div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-plus-circle"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
      </Div>
    )
  }
}

const Div = styled.div`
  height: 7rem;
  width: 5rem;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  svg {
    position: absolute;
    top: 4.5rem;
  }
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
