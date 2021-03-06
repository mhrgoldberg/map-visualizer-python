import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function User() {
  const [user, setUser] = useState({})
  // Notice we use useParams here instead of getting the params
  // From props.
  const { id } = useParams()

  useEffect(() => {
    if (!id) return
    ;(async () => {
      const response = await fetch(`/api/users/${id}`)
      const user = await response.json()
      setUser(user)
    })()
  }, [id])

  if (!user) return <p>loading...</p>

  return (
    <ul>
      <li>
        <strong>User Id</strong> {id}
      </li>
      <li>
        <strong>Username</strong> {user.username}
      </li>
      <li>
        <strong>Email</strong> {user.email}
      </li>
    </ul>
  )
}
export default User
