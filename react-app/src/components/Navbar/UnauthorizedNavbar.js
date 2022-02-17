import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import NavLinkItem from './NavLinkItem'

export default function UnauthorizedNavbar() {
  const path = useLocation().pathname
  return (
    <Nav>
      {path !== '/login' && path !== '/' && (
        <NavLinkItem to="/login">Login</NavLinkItem>
      )}
      {path !== '/sign-up' && <NavLinkItem to="/sign-up">Sign Up</NavLinkItem>}
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
