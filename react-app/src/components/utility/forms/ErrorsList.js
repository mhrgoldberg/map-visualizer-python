import React from 'react'
import styled from 'styled-components'

export default function ErrorsList({ errors, displayKeys }) {
  const displayErrors = Object.entries(errors).filter(
    ([key, _]) => key in displayKeys
  )

  return (
    <Ul className="errorsList">
      {displayErrors.map((error, i) => (
        <li key={i}>{error[1]}</li>
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
