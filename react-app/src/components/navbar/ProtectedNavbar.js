import React from 'react'
import styled from 'styled-components'
import { icons } from '../utility'
import NavLinkItem from './NavLinkItem'

export default function ProtectedNavbar() {
  return (
    <Nav className="column3">
      <NavLinkItem to="/new" transparent={true}>
        <icons.AddButton />
      </NavLinkItem>
      <icons.LogoutButton />
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
