import React from 'react'
import styled from 'styled-components'
import { NavLink, useLocation } from 'react-router-dom'

export default function UnauthorizedRoutesNavbar() {
  const location = useLocation()
  return (
    <Nav>
      {location.pathname !== '/login' && (
        <span className="nav3">
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </span>
      )}
      {location.pathname !== '/sign-up' && (
        <span className="nav3">
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </span>
      )}
    </Nav>
  )
}

const Nav = styled.nav`
  grid-column: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;
  a {
    font-size: 1.6rem;
    line-height: 1.5;
  }
`
