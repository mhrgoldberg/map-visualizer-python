import React from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import NavLinkItem from './NavLinkItem'

export default function UnauthorizedRoutesNavbar() {
  const location = useLocation()
  return (
    <Nav>
      {location.pathname !== '/login' && (
        <NavLinkItem to="/login">Login</NavLinkItem>
      )}
      {location.pathname !== '/sign-up' && (
        <NavLinkItem to="/sign-up">Sign Up</NavLinkItem>
      )}
    </Nav>
  )
}

const Nav = styled.nav`
  grid-column: 3;
  display: flex;
  width: 12rem;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;
  a {
    font-size: 1.6rem;
    line-height: 1.5;
  }
`
