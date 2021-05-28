import React from 'react'
import { useDispatch } from 'react-redux'
import FileUpload from './FileUpload'
import { saveRoute } from '../../store/routes'
import { forms, useErrors, useFormState } from '../utility'

export default function SignUpForm() {
  const dispatch = useDispatch()

  // form state
  const [form, { updateField, setUpdatedStatusFalse, formatSubmit }] =
    useFormState({
      title: '',
      data: {},
    })

  // Redux error handling
  const [errors, useClearErrorsOnUnmount] = useErrors()
  useClearErrorsOnUnmount()

  // On Submit
  const onSubmit = async (e) => {
    e.preventDefault()
    setUpdatedStatusFalse()
    dispatch(saveRoute(formatSubmit()))
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
        {/* <forms.SelectField
          label="RouteType"
          options={forms.selectOptions.PRIMARY_SPORTS}
          name="primarySport"
          state={form.primarySport}
          placeholder="How do you like to play?"
          onChange={updateField}
          error={errors?.primary_sport}
        /> */}
        <FileUpload />

        <button type="submit">Create Route</button>
      </form>
    </>
  )
}
