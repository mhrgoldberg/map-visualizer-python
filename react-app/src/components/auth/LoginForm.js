import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../store/auth'
import { useErrors } from '../../hooks/errors'
import { InputField } from '../utility'
import { useCurrentUser } from '../../hooks/user'

export default function LoginForm() {
  const dispatch = useDispatch()
  const authenticated = !!useCurrentUser()
  const [errors, useClearErrorsOnUnmount] = useErrors()
  useClearErrorsOnUnmount()

  // Form State
  const [form, setForm] = useState({
    email: { value: '', updated: false },
    password: { value: '', updated: false },
  })

  // Redux error handling
  const updateField = (e) => {
    const newState = { ...form }
    const newField = newState[e.target.name]
    if (!newField.updated) {
      newField.updated = true
    }
    newField.value = e.target.value
    setForm(newState)
  }

  const onLogin = (e) => {
    e.preventDefault()
    setForm({
      email: { value: form.email.value, updated: false },
      password: { value: form.password.value, updated: false },
    })
    dispatch(login(form.email.value, form.password.value))
  }
  // render
  if (authenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <form onSubmit={onLogin}>
      <InputField
        name="email"
        type="text"
        label="Email"
        state={form.email}
        placeholder={'example@example.com'}
        onChange={updateField}
        required={true}
        error={errors?.password}
      />
      <InputField
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
