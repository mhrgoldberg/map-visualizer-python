import React from 'react'
import styled from 'styled-components'

export default function FormField({
  type,
  name,
  onChange,
  value,
  label,
  required = false
}) {
  return (
    <FormDiv>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={label}
        required={required}
      ></input>
    </FormDiv>
  )
}

const FormDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
