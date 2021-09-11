import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import FileUpload from './FileUpload'
import { saveRoute } from '../../store/routes'
import { forms, useErrors, useFormState } from '../utility'

export default function RouteForm() {
  const dispatch = useDispatch()

  // form state
  const [
    form,
    { updateField, updateFieldByName, setUpdatedStatusFalse, formatSubmit },
  ] = useFormState({
    title: '',
    // primary_sport: '',
    file: null,
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
    <FormContainer>
      <form onSubmit={onSubmit}>
        <forms.InputField
          label="Title"
          type="text"
          name="title"
          onChange={updateField}
          state={form.title}
          required={true}
          placeholder="Where are you trekking, mate?"
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
        <FileUpload updateFieldByName={updateFieldByName} />
        <button type="submit">Create Route</button>
      </form>
    </FormContainer>
  )
}

const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
`
