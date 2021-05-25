import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signUp } from '../../store/auth'
import { forms, useErrors } from '../utility'

export default function SignUpForm() {
  const dispatch = useDispatch()

  // Redux error handling
  const [errors, useClearErrorsOnUnmount] = useErrors()
  useClearErrorsOnUnmount()

  // Form State
  const [form, setForm] = useState({
    title: { value: '', updated: false },
    data: { value: '', updated: false },
  })
  forms.updateFieldGenerator(form, setForm)

  const onSubmit = async (e) => {
    e.preventDefault()
    setForm({
      title: { value: form.title.value, updated: false },
      data: { value: form.data.value, updated: false },
    })

    dispatch(signUp(data))
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <forms.InputField
          label="Title"
          type="text"
          name="title"
          onChange={updateField}
          state={form.title}
          required={true}
          placeholder="letters, numbers, no space"
          error={errors?.title}
        />
        <forms.SelectField
          label="RouteType"
          options={forms.selectOptions.PRIMARY_SPORTS}
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
