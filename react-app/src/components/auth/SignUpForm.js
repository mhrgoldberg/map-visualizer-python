import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useErrors } from '../../hooks/errors'
import { signUp } from '../../store/auth'
import { setErrors } from '../../store/errors'
import { InputField } from '../utility'
import { useCurrentUser } from '../../hooks/user'
import SelectField from '../utility/SelectField'

export default function SignUpForm() {
  const dispatch = useDispatch()
  const authenticated = !!useCurrentUser()
  const PRIMARY_SPORTS = ['Run', 'Hike', 'Cycle', 'MultiSport', 'Other']
  // Redux error handling
  const [errors, useClearErrorsOnUnmount] = useErrors()
  useClearErrorsOnUnmount()
  // Form State
  const [form, setForm] = useState({
    email: { value: '', updated: false },
    username: { value: '', updated: false },
    primarySport: { value: '', updated: false },
    password: { value: '', updated: false },
    repeatPassword: { value: '', updated: false },
  })

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
      primarySport: { value: '', updated: false },
      password: { value: form.password.value, updated: false },
      repeatPassword: { value: form.repeatPassword.value, updated: false },
    })
    if (form.password.value === form.repeatPassword.value) {
      const data = {
        email: form.email.value,
        username: form.username.value,
        password: form.password.value,
        primary_sport: form.primarySport.value,
      }
      dispatch(signUp(data))
    } else {
      dispatch(setErrors({ password: 'Password fields do not match.' }))
    }
  }

  if (authenticated) {
    return <Redirect to="/dashboard" />
  }
  return (
    <>
      <form onSubmit={onSignUp}>
        <InputField
          label="User Name"
          type="text"
          name="username"
          onChange={updateField}
          state={form.username}
          required={true}
          placeholder="letters, numbers, no space"
          error={errors?.username}
        />
        <InputField
          label="Email"
          type="text"
          name="email"
          placeholder={'example@example.com'}
          onChange={updateField}
          state={form.email}
          required={true}
          error={errors?.email}
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          placeholder="Shh, secrets go here"
          onChange={updateField}
          state={form.password}
          required={true}
          error={errors?.password}
        />
        <InputField
          label="Confirm Password"
          type="password"
          name="repeatPassword"
          placeholder="Make sure it matches"
          onChange={updateField}
          state={form.repeatPassword}
          required={true}
          error={errors?.password}
        />
        <SelectField
          label="Primary Sport"
          options={PRIMARY_SPORTS}
          name="primarySport"
          state={form.primarySport}
          placeholder="How do you like to play?"
          onChange={updateField}
          error={errors?.primary_sport}
        />
        <button type="submit">Sign Up</button>
      </form>
    </>
  )
}
