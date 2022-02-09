import React from 'react'
import { FormContainer } from '../../styles/formStyles'
import RouteForm from './RouteForm'

export default function NewForm() {
  return (
    <FormContainer>
      <div className="form-header">
        <h1>New Route</h1>
      </div>
      <RouteForm />
    </FormContainer>
  )
}
