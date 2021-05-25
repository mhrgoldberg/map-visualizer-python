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
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-plus-square"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
      </Div>
    )
  }
}

const Div = styled.div`
  width: 5rem;
  padding: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;

  svg:hover {
    color: var(--primary-cyan);
  }

  @media only screen and (max-width: 550px) {
    svg {
      width: 2.8rem;
    }
  }
`
