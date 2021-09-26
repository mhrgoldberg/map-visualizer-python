import React from 'react'
import styled from 'styled-components'

export default function ErrorsList({ errors }) {
  return (
    <Ul className="errorsList">
      {Object.entries(errors).map((error, i) => (
        <li key={error[0] + i}>{error[1]}</li>
      ))}
    </Ul>
  )
}

const Ul = styled.ul`
  font-size: 1.2rem;
  /* height: 1.2rem;  */
  color: var(--primary-red);
  margin-left: 0;
  padding-left: 0;
`
