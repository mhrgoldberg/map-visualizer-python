import { useState } from 'react'

export default function useFormState(inputFields) {
  // fields should be an pojo in this format {<fieldName>:<defaultValue>}
  const [form, setForm] = useState(createInitialState(inputFields))

  function createInitialState(fields) {
    const initialState = {}
    for (let fieldName in fields) {
      initialState[fieldName] = {
        value: fields[fieldName],
        updated: false,
      }
    }
    return initialState
  }

  function updateField(e) {
    const newState = { ...form }
    const newField = newState[e.target.name]
    if (!newField.updated) {
      newField.updated = true
    }
    newField.value = e.target.value
    setForm(newState)
  }

  function setUpdatedStatusFalse() {
    const newForm = {}
    for (let fieldName in form) {
      newForm[fieldName] = {
        value: form[fieldName].value,
        updated: false,
      }
    }
    setForm(newForm)
  }

  function formatSubmit(exclude = []) {
    // pass in exclude array of any fields to exclude from submit data
    const submitData = new FormData()
    for (let fieldName in form) {
      if (!exclude.includes(fieldName)) {
        submitData.append(
          fieldName,
          form[fieldName].value === '' ? null : form[fieldName].value
        )
      }
    }
    return submitData
  }

  return [form, { setUpdatedStatusFalse, formatSubmit, updateField }]
}
