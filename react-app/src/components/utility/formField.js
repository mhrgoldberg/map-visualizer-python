import React from 'react'
import styled from 'styled-components'

export default function FormField({
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
  height: fit-content;
  width: calc(100% - 2rem);
  display: grid;
  grid-template-rows: auto;
  /* padding: 0.5rem 1rem; */
  label {
    width: 100%;
    font-size: 2.2rem;
    color: var(--primary-light);
  }
  /* errors */
  p {
    color: var(--primary-alert);
    font-size: 1.2rem;
    margin: 0.8rem;
    padding: 0;
    line-height: 1;
  }
  .formFieldError {
    border-bottom: 0.2rem solid var(--primary-alert) !important;
    ::placeholder {
      color: var(--primary-alert);
    }
  }

  /* input */
  input {
    height: 1.6rem;
    width: 100%;
    padding: 1rem 0.1rem;
    font-size: 1.8rem;
    color: var(--primary-light);
    background: transparent;
    border: none;
    border-bottom: 0.2rem solid var(--primary-cyan);
  }

  input::placeholder {
    color: var(--primary-gray);
  }

  input:focus {
    outline: none;
    color: var(--secondary-cyan);
    border-bottom: 0.2rem solid var(--secondary-cyan);
  }
`
