import React from 'react'
import styled from 'styled-components'

export default function ErrorsList({ errors }) {
  errors = Object.values(errors)
  // if (errors.length) {
  return (
    <Ul className="errorsList">
      {errors.map((error, i) => (
        <li key={i}>{error}</li>
      ))}
    </Ul>
  )
  // } else {
  //   return null
  // }
}

const Ul = styled.ul`
  font-size: 1.2rem;
  height: 1.2rem;
  color: var(--primary-red);
  margin-left: 0;
  padding-left: 0;
`
