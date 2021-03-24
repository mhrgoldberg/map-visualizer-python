import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useAuthErrors } from '../../hooks/errors'
import { signUp } from '../../store/auth'
import { FormField } from '../utility'
import ErrorsList from '../utility/errors'

const SignUpForm = ({ authenticated }) => {
  const errors = useAuthErrors()
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const onSignUp = async (e) => {
    e.preventDefault()
    if (password === repeatPassword) {
      dispatch(signUp(username, email, password))
    }
  }

  const updateUsername = (e) => {
    setUsername(e.target.value)
  }

  const updateEmail = (e) => {
    setEmail(e.target.value)
  }

  const updatePassword = (e) => {
    setPassword(e.target.value)
  }

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value)
  }

  if (authenticated) {
    return <Redirect to="/" />
  }
  return (
    <>
      <ErrorsList errors={errors} />
      <form onSubmit={onSignUp}>
        <FormField
          label="User Name"
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
          required={true}
        />
        <FormField
          label="Email"
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
          required={true}
        />
        <FormField
          label="Password"
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
          required={true}
        />
        <FormField
          label="Confirm Password"
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        />
        <button type="submit">Sign Up</button>
      </form>
    </>
  )
}

export default SignUpForm
