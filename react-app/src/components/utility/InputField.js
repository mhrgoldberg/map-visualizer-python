import React from 'react'
import styled from 'styled-components'

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
    <FormDiv>
      {label && <label>{label}</label>}
      <input
        className={error && !state.updated ? 'formFieldError' : ''}
        type={type}
        name={name}
        onChange={onChange}
        value={error && !state.updated ? '' : state.value}
        placeholder={error && !state.updated ? error : placeholder}
        required={required}
      ></input>
    </FormDiv>
  )
}

const FormDiv = styled.div`
  /* layout */
  height: fit-content;
  width: calc(100% - 2rem);
  display: grid;
  grid-template-rows: auto;

  .formFieldError {
    border-bottom: 0.2rem solid var(--primary-alert) !important;
    ::placeholder {
      color: var(--primary-alert);
    }
  }

  label {
    width: 100%;
    font-size: 2.2rem;
    color: var(--primary-light);
  }
`
