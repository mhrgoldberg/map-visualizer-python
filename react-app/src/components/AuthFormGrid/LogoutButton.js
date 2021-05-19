import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/auth'
import styled from 'styled-components'

export default function LogOutButton() {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    dispatch(logout())
  }

  return <LogoutButton onClick={onLogout}>Logout</LogoutButton>
}

const LogoutButton = styled.button`
  font-size: 1.6rem;
  grid-column: 3;
`
