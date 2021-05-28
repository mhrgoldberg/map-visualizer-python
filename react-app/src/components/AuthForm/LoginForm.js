import React from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../store/auth'
import { forms, useErrors, useFormState, useCurrentUser } from '../utility'

export default function LoginForm() {
  const dispatch = useDispatch()
  const authenticated = !!useCurrentUser()
  const [errors, useClearErrorsOnUnmount] = useErrors()
  useClearErrorsOnUnmount()

  // Form State
  const [form, { updateField, setUpdatedStatusFalse, formatSubmit }] =
    useFormState({
      email: '',
      password: '',
    })

  const onLogin = (e) => {
    e.preventDefault()
    dispatch(login(formatSubmit(), setUpdatedStatusFalse))
  }

  // render
  if (authenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <form onSubmit={onLogin}>
      <forms.InputField
        name="email"
        type="text"
        label="Email"
        state={form.email}
        placeholder={'example@example.com'}
        onChange={updateField}
        required={true}
        // error={errors?.password}
      />
      <forms.InputField
        name="password"
        type="password"
        label="Password"
        state={form.password}
        onChange={updateField}
        placeholder="Shh, secrets go here"
        required={true}
        error={errors?.password}
      />
      <button type="submit">Login</button>
    </form>
  )
}
