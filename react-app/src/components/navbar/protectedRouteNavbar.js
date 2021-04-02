import React from 'react'
import styled from 'styled-components'
import LogoutButton from '../auth/LogoutButton'
import NavListItem from './navListItem'

export default function ProtectedRouteNavbar() {
  return (
    <Nav>
      <NavListItem></NavListItem>
      <ul>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </Nav>
  )
}

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
