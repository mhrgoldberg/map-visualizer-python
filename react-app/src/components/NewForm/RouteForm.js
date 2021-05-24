import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useErrors } from '../../hooks/errors'
import { signUp } from '../../store/auth'
import { FormUtility } from '../utility'

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
        <FormUtility.InputField
          label="User Name"
          type="text"
          name="username"
          onChange={updateField}
          state={form.username}
          required={true}
          placeholder="letters, numbers, no space"
          error={errors?.username}
        />

        <button type="submit">Sign Up</button>
      </form>
    </>
  )
}
