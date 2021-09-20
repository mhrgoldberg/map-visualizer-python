import React from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signUp } from '../../store/auth'
import { setErrors } from '../../store/errors'
import { forms, useCurrentUser, useErrors, useFormState } from '../utility'

export default function SignUpForm() {
  const dispatch = useDispatch()

  // formState
  const [form, { updateField, setUpdatedStatusFalse, formatSubmit }] =
    useFormState({
      email: '',
      username: '',
      gender: '',
      age: '',
      primary_sport: '',
      password: '',
      repeat_password: '',
    })

  // Redux error handling
  const [errors, useClearErrorsOnUnmount] = useErrors()
  useClearErrorsOnUnmount()

  // On Submit
  const onSignUp = async (e) => {
    e.preventDefault()
    if (form.password.value === form.repeat_password.value) {
      await dispatch(
        signUp(formatSubmit(['repeat_password']), setUpdatedStatusFalse)
      )
      // setUpdatedStatusFalse()
    } else {
      setUpdatedStatusFalse()
      dispatch(setErrors({ password: ['Password fields do not match.'] }))
    }
  }

  const authenticated = !!useCurrentUser()

  if (authenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <form onSubmit={onSignUp}>
      <forms.InputField
        label="User Name"
        type="text"
        name="username"
        onChange={updateField}
        state={form.username}
        required={true}
        placeholder="letters, numbers, no space"
        error={errors?.username}
      />
      <forms.InputField
        label="Email"
        type="email"
        name="email"
        placeholder={'example@example.com'}
        onChange={updateField}
        state={form.email}
        required={true}
        error={errors?.email}
      />
      <forms.InputField
        label="Password"
        type="password"
        name="password"
        placeholder="Shh, secrets go here"
        onChange={updateField}
        state={form.password}
        required={true}
        error={errors?.password}
      />
      <forms.InputField
        label="Confirm Password"
        type="password"
        name="repeat_password"
        placeholder="Make sure it matches"
        onChange={updateField}
        state={form.repeat_password}
        required={true}
        error={errors?.password}
      />
      <forms.InputField
        label="Age"
        type="number"
        name="age"
        placeholder="it's just a number :D (optional)"
        onChange={updateField}
        state={form.age}
        error={errors?.age}
      />
      <forms.SelectField
        label="Gender"
        options={forms.selectOptions.GENDERS}
        name="gender"
        state={form.gender}
        placeholder="Gender of preference (optional)"
        onChange={updateField}
        error={errors?.gender}
      />
      <forms.SelectField
        label="Primary Sport"
        options={forms.selectOptions.PRIMARY_SPORTS}
        name="primary_sport"
        state={form.primary_sport}
        placeholder="How do you like to play? (optional)"
        onChange={updateField}
        error={errors?.primary_sport}
      />
      <button type="submit">Sign Up</button>
    </form>
  )
}
