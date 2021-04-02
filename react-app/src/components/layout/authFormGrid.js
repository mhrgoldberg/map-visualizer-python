import React from 'react'
import styled from 'styled-components'
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../auth/SignUpForm'

export default function AuthFormGrid({ form }) {
  return (
    <Container>
      <div className="header">
        <h1>{form}</h1>
      </div>
      {form === 'Login' && <LoginForm />}
      {form === 'Sign Up' && <SignUpForm />}
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr minmax(40rem, 1fr) 1fr;
  grid-template-rows: 10rem minmax(20rem, 1fr) 10rem;
  justify-items: center;
  max-width: 150rem;
  max-height: 100rem;
  min-height: 50rem;
  margin: auto;
  .header {
    grid-column: 2;
    grid-row: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  form {
    grid-column: 2;
    grid-row: 2;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    place-items: center center;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: fit-content;
    }

    button {
      font-size: 2.2rem;
      font-weight: 500;
      width: calc(100% - 2rem);
    }
  }
`