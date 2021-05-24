export default function updateFieldGenerator(form, setForm) {
  return function updateField(e) {
    const newState = { ...form }
    const newField = newState[e.target.name]
    if (!newField.updated) {
      newField.updated = true
    }
    newField.value = e.target.value
    setForm(newState)
  }
}
