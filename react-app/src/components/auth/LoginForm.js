import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../store/auth'
import { useAuthErrors } from '../../hooks/errors'
import { FormField } from '../utility'
import ErrorsList from '../utility/errors'

const LoginForm = ({ authenticated }) => {
  const dispatch = useDispatch()
  const errors = useAuthErrors()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  const updateEmail = (e) => {
    setEmail(e.target.value)
  }

  const updatePassword = (e) => {
    setPassword(e.target.value)
  }

  if (authenticated) {
    return <Redirect to="/" />
  }

  return (
    <form onSubmit={onLogin}>
      <ErrorsList errors={errors} />
      <FormField
        name="email"
        type="text"
        label="Email"
        value={email}
        onChange={updateEmail}
      />
      <FormField
        name="password"
        type="password"
        label="Password"
        value={password}
        onChange={updatePassword}
      />
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm
