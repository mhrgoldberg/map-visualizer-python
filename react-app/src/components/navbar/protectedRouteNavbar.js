import React from 'react'
import styled from 'styled-components'
import LogoutButton from '../auth/LogoutButton'
import NavListItem from './navListItem'

export default function ProtectedRouteNavbar() {
  return (
    <Nav>
      <span className="column3">
        <LogoutButton />
      </span>
    </Nav>
  )
}

const Nav = styled.nav`
  /* width: 100%; */

  grid-column: 3;
`
