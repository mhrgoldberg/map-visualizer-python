import React from 'react'
import RouteForm from './RouteForm'
import { FormContainer } from '../../styles/formStyles'

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
