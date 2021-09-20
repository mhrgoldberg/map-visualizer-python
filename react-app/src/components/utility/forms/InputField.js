import React from 'react'
import { FormInputContainer } from '../../../styles/formStyles'

export default function InputField({
  type,
  name,
  onChange,
  state,
  label,
  error,
  placeholder,
  required = false,
}) {
  if (!placeholder) placeholder = label
  return (
    <FormInputContainer>
      {label && <label>{label}</label>}
      <input
        className={error && !state.updated ? 'formFieldError' : ''}
        type={type}
        name={name}
        onChange={onChange}
        value={error && !state.updated ? '' : state.value}
        placeholder={error ? error : placeholder}
        required={required}
      ></input>
    </FormInputContainer>
  )
}
