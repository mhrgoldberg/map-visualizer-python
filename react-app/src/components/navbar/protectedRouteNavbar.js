import React from 'react'
import styled from 'styled-components'
import { LogoutButton, AddButton } from '../utility'
import NavLinkItem from './NavLinkItem'

export default function ProtectedRouteNavbar() {
  return (
    <Nav className="column3">
      <NavLinkItem to="/new" transparent={true}>
        <AddButton />
      </NavLinkItem>
      <LogoutButton />
    </Nav>
  )
}

const Nav = styled.nav`
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 3;
`
