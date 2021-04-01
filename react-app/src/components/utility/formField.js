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
  required = false
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
      {/* {error?.length && !state.updated && <p>{error}</p>} */}
    </FormDiv>
  )
}

const FormDiv = styled.div`
  height: fit-content;
  width: calc(100% - 2rem);
  display: grid;
  grid-template-rows: auto;
  padding: 0.5rem 1rem;
  label {
    width: 100%;
    font-size: 2.2rem;
    color: ${({ theme }) => theme.primary.light};
  }
  /* errors */
  p {
    color: ${({ theme }) => theme.primary.red};
    font-size: 1.2rem;
    margin: 0.8rem;
    padding: 0;
    line-height: 1;
  }
  .formFieldError {
    border-bottom: 0.2rem solid ${({ theme }) => theme.primary.red} !important;
    ::placeholder {
      color: ${({ theme }) => theme.primary.red};
    }
  }

  /* input */
  input {
    height: 1.6rem;
    width: 100%;
    padding: 1rem 0.1rem;
    font-size: 1.8rem;
    color: ${({ theme }) => theme.primary.light};
    background: transparent;
    border: none;
    border-bottom: 0.2rem solid ${({ theme }) => theme.primary.cyan};
  }

  input::placeholder {
    color: ${({ theme }) => theme.primary.gray};
  }

  input:focus {
    outline: none;
    color: ${({ theme }) => theme.secondary.cyan};
    border-bottom: 0.2rem solid ${({ theme }) => theme.secondary.cyan};
  }

  /* input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    .inputBgOpaque:-webkit-autofill {
      box-shadow: 0 0 0 100px black inset;
      -webkit-box-shadow: 0 0 0 100px black inset;
    }
  } */
`
