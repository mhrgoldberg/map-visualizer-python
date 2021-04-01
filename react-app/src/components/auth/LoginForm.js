import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { login } from '../../store/auth'
import { useErrors } from '../../hooks/errors'
import { FormField } from '../utility'
import ErrorsList from '../utility/errors'

const LoginForm = ({ authenticated }) => {
  const dispatch = useDispatch()
  const [errors, useClearErrorsOnUnmount] = useErrors()
  useClearErrorsOnUnmount()

  // Form State
  const [form, setForm] = useState({
    email: { value: '', updated: false },
    password: { value: '', updated: false }
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
      password: { value: '', updated: false }
    })
    dispatch(login(form.email.value, form.password.value))
  }
  // render
  if (authenticated) {
    return <Redirect to="/" />
  }

  return (
    <Form onSubmit={onLogin}>
      <FormField
        name="email"
        type="text"
        label="Email"
        state={form.email}
        placeholder={'example@example.com'}
        onChange={updateField}
        required={true}
        error={errors?.password}
      />
      <FormField
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
    </Form>
  )
}

const Form = styled.form`
  height: fit-content;
`

export default LoginForm
