import React from 'react'
import styled from 'styled-components'

export default function SelectField({
  options,
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
    <FormDiv updated={state?.updated}>
      {label && <label>{label}</label>}
      <select
        className={error && !state.updated ? 'formFieldError' : ''}
        name={name}
        onChange={onChange}
        value={state.value}
        required={required}
      >
        <option disabled value="">
          {error && !state.updated ? error : placeholder}
        </option>
        {options.map((value) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
    </FormDiv>
  )
}

const FormDiv = styled.div`
  /* layout */
  height: fit-content;
  width: calc(100% - 2rem);
  display: grid;
  grid-template-rows: auto;

  label {
    width: 100%;
    font-size: 2.2rem;
    color: var(--primary-light);
  }
  .formFieldError {
    border-bottom: 0.2rem solid var(--primary-alert) !important;
    ::placeholder {
      color: var(--primary-alert);
    }
  }
  select {
    color: ${(props) =>
      props.updated ? 'var(--primary-light)' : 'var(--primary-gray)'};
  }
`
