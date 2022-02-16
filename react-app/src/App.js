import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import styled from 'styled-components'
import Aside from './components/Aside'
import { AuthForm, ProtectedRoute } from './components/AuthForm'
import Dashboard from './components/Dashboard'
import NavBar from './components/Navbar'
import NewForm from './components/NewForm'
import UsersList from './components/Profile/UsersList'
import RouteShow from './components/Routes/RouteShow'
import { authenticate } from './store/auth'

function App() {
  const dispatch = useDispatch()

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    ;(async () => {
      await dispatch(authenticate())
      setLoaded(true)
    })()
  }, [dispatch])

  if (!loaded) {
    return <p>loading...</p>
  }

  return (
    <BrowserRouter>
      <NavBar />
      <MainContent>
        {/* Auth Routes */}
        <Route path="/login" exact={true}>
          <AuthForm form="Login" />
        </Route>
        <Route path="/sign-up" exact={true}>
          <AuthForm form="Sign Up" />
        </Route>
        <Route path="/" exact={true}>
          <AuthForm form="Login" />
        </Route>

        {/* Aside */}
        <Aside />

        {/* Protected Routes */}
        <ProtectedRoute path="/new" exact={true}>
          <NewForm />
        </ProtectedRoute>
        <ProtectedRoute path="/routes" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/routes/:id" exact={true}>
          <RouteShow />
        </ProtectedRoute>
        <ProtectedRoute path="/workouts" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/workouts/:id" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true}>
          <Dashboard />
        </ProtectedRoute>
      </MainContent>
    </BrowserRouter>
  )
}

const MainContent = styled.div`
  display: flex;
`

export default App
