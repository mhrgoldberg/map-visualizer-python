import React from 'react'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import { FormContainer } from '../../styles/formStyles'
import ProtectedRoute from './ProtectedRoute'

function AuthForm({ form }) {
  return (
    <FormContainer>
      <div className="form-header">
        <h1>{form}</h1>
      </div>
      {form === 'Login' && <LoginForm />}
      {form === 'Sign Up' && <SignUpForm />}
    </FormContainer>
  )
}

export { AuthForm, ProtectedRoute }
