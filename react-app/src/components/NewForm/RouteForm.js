import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router'

import { saveRoute } from '../../store/routes'
import {
  InputField,
  SelectField,
  FileUpload,
  selectOptions,
  useErrors,
  useFormState,
} from '../utility'

export default function RouteForm() {
  const dispatch = useDispatch()

  // form state
  const [
    form,
    { updateField, updateFieldByName, setUpdatedStatusFalse, formatSubmit },
  ] = useFormState({
    title: '',
    sport: '',
    file: null,
  })
  const [responseStatus, setResponseStatus] = useState(false)

  // Redux error handling
  const [errors, useClearErrorsOnUnmount] = useErrors()
  useClearErrorsOnUnmount()

  const onSubmit = async (e) => {
    e.preventDefault()
    setUpdatedStatusFalse()
    const response = await dispatch(saveRoute(formatSubmit()))
    setResponseStatus(response)
  }

  if (responseStatus) {
    return <Redirect to="/" />
  } else {
    return (
      <>
        <form onSubmit={onSubmit}>
          <InputField
            label="Title"
            type="text"
            name="title"
            onChange={updateField}
            state={form.title}
            required={true}
            placeholder="Where are you trekking, mate?"
            error={errors?.title}
          />
          <SelectField
            label="Route Type"
            options={selectOptions.PRIMARY_SPORTS}
            name="sport"
            state={form.sport}
            placeholder="What is your weapon of attack?"
            onChange={updateField}
            error={errors?.sport}
          />
          <FileUpload
            updateFieldByName={updateFieldByName}
            error={errors?.file}
          />
          <button type="submit">Create Route</button>
        </form>
      </>
    )
  }
}
