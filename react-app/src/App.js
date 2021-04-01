import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AuthFormGrid from './components/layout/authFormGrid'
import NavBar from './components/navbar'
import ProtectedRoute from './components/auth/ProtectedRoute'
import UsersList from './components/UsersList'
import User from './components/User'
import { authenticate } from './store/auth'
import { useCurrentUser } from './hooks/user'

function App() {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)
  const authenticated = !!useCurrentUser()

  useEffect(() => {
    dispatch(authenticate()).then(() => {
      setLoaded(true)
    })
  }, [dispatch])
  if (!loaded) {
    return null
  }

  return (
    <BrowserRouter>
      <NavBar authenticated={authenticated} />
      <Route path="/login" exact={true}>
        <AuthFormGrid authenticated={authenticated} form="Login" />
      </Route>
      <Route path="/sign-up" exact={true}>
        <AuthFormGrid authenticated={authenticated} form="Sign Up" />
      </Route>
      <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
        <UsersList />
      </ProtectedRoute>
      <ProtectedRoute
        path="/users/:userId"
        exact={true}
        authenticated={authenticated}
      >
        <User />
      </ProtectedRoute>
      <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
        <h1>My Home Page</h1>
      </ProtectedRoute>
    </BrowserRouter>
  )
}

export default App
