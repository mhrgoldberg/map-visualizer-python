import React from 'react'

export default function ErrorsList({ errors }) {
  if (Array.isArray(errors)) {
    return (
      <ul className="errorsList">
        {errors.map((error) => (
          <li>{error}</li>
        ))}
      </ul>
    )
  } else {
    return null
  }
}
