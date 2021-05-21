import React from 'react'
import styled from 'styled-components'
import LogoutButton from '../AuthFormGrid/LogoutButton'
import { AddButton } from '../utility'
import NavLinkItem from './NavLinkItem'

export default function ProtectedRouteNavbar() {
  return (
    <Nav className="column3">
      <NavLinkItem to="/new">
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
  a:hover {
    border-bottom: 0.2rem solid transparent;
  }
`
