import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AuthFormGrid from './components/auth/authFormGrid'
import NavBar from './components/navbar'
import ProtectedRoute from './components/auth/ProtectedRoute'
import UsersList from './components/UsersList'
import User from './components/User'
import { authenticate } from './store/auth'

function App() {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    dispatch(authenticate()).then(() => {
      setLoaded(true)
    })
  }, [dispatch])

  if (!loaded) {
    return <p>loading...</p>
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Route path="/login" exact={true}>
        <AuthFormGrid form="Login" />
      </Route>
      <Route path="/sign-up" exact={true}>
        <AuthFormGrid form="Sign Up" />
      </Route>
      <ProtectedRoute path="/dashboard" exact={true}>
        <UsersList />
      </ProtectedRoute>
      <ProtectedRoute path="/routes" exact={true}>
        <UsersList />
      </ProtectedRoute>
      <ProtectedRoute path="/routes/:id" exact={true}>
        <User />
      </ProtectedRoute>
      <ProtectedRoute path="/workouts" exact={true}>
        <User />
      </ProtectedRoute>
      <ProtectedRoute path="/workouts/:id" exact={true}>
        <User />
      </ProtectedRoute>
      <Route path="/" exact={true}>
        <AuthFormGrid form="Login" />
      </Route>
    </BrowserRouter>
  )
}

export default App
