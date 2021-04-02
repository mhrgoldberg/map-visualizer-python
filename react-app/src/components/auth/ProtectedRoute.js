import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useCurrentUser } from '../../hooks/user'

export default function ProtectedRoute(props) {
  const authenticated = !!useCurrentUser()
  if (!authenticated) {
    return <Redirect to="/" />
  }
  return <Route {...props} />
}
