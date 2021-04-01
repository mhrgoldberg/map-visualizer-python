import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useCurrentUser } from '../../hooks/user'

const ProtectedRoute = (props) => {
  const authenticated = !!useCurrentUser()
  if (!authenticated) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
