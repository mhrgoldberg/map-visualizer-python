import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { useErrors } from '../../hooks/errors'
import { signUp } from '../../store/auth'
import { setErrors } from '../../store/errors'
import { FormField } from '../utility'
import { useCurrentUser } from '../../hooks/user'

export default function SignUpForm() {
  const dispatch = useDispatch()
  const authenticated = !!useCurrentUser()
  // Redux error handling
  const [errors, useClearErrorsOnUnmount] = useErrors()
  useClearErrorsOnUnmount()
  // Form State
  const [form, setForm] = useState({
    email: { value: '', updated: false },
    username: { value: '', updated: false },
    password: { value: '', updated: false },
    repeatPassword: { value: '', updated: false }
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

  const onSignUp = async (e) => {
    e.preventDefault()
    setForm({
      email: { value: form.email.value, updated: false },
      username: { value: form.username.value, updated: false },
      password: { value: form.password.value, updated: false },
      repeatPassword: { value: form.repeatPassword.value, updated: false }
    })
    if (form.password.value === form.repeatPassword.value) {
      dispatch(
        signUp(form.username.value, form.email.value, form.password.value)
      )
    } else {
      dispatch(setErrors({ password: 'Password fields do not match.' }))
    }
  }

  if (authenticated) {
    return <Redirect to="/dashboard" />
  }
  return (
    <>
      <Form onSubmit={onSignUp}>
        {/* <ErrorsList errors={errors} /> */}
        <FormField
          label="User Name"
          type="text"
          name="username"
          onChange={updateField}
          state={form.username}
          required={true}
          placeholder="letters, numbers, no space"
          error={errors?.username}
        />
        <FormField
          label="Email"
          type="text"
          name="email"
          placeholder={'example@example.com'}
          onChange={updateField}
          state={form.email}
          required={true}
          error={errors?.email}
        />
        <FormField
          label="Password"
          type="password"
          name="password"
          onChange={updateField}
          placeholder="Shh, secrets go here"
          state={form.password}
          required={true}
          error={errors?.password}
        />
        <FormField
          label="Confirm Password"
          type="password"
          name="repeatPassword"
          placeholder="Make sure it matches"
          onChange={updateField}
          state={form.repeatPassword}
          required={true}
          error={errors?.password}
        />
        <button type="submit">Sign Up</button>
      </Form>
    </>
  )
}

const Form = styled.form`
  height: fit-content;
`
