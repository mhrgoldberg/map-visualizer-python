import React from 'react'
import styled from 'styled-components'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import ProtectedRoute from './ProtectedRoute'

function AuthForm({ form }) {
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
  /* layout (Container Grid)*/
  display: grid;
  grid-gap: 1rem;
  grid-template-rows: 10rem minmax(20rem, 1fr) 10rem;
  justify-items: center;
  width: 100%;
  max-width: 120rem;
  min-height: 50rem;
  margin: auto;

  .header {
    /* container grid placement */
    grid-column: 1;
    grid-row: 1;
    /* layout */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  form {
    /* layout (Form Grid)*/
    grid-column: 1;
    grid-row: 2;
  }
`
export { AuthForm, ProtectedRoute }
