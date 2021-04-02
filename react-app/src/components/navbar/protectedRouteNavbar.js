import React from 'react'
import styled from 'styled-components'
import LogoutButton from '../auth/LogoutButton'
import NavListItem from './navListItem'

export default function ProtectedRouteNavbar() {
  return (
    <Nav>
      <NavListItem></NavListItem>
      <li>
        <LogoutButton />
      </li>
    </Nav>
  )
}

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
