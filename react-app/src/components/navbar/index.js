import React from 'react'
import styled from 'styled-components'
import ProtectedRouteNavbar from './protectedRouteNavbar'
import UnauthorizedRoutesNavbar from './unauthorizedRoutesNavbar'
import { NavLink } from 'react-router-dom'
export default function NavBar({ authenticated }) {
  return (
    <Header>
      <div className="navContainer">
        <NavLink to="/" exact={true} className="logo" activeClassName="active">
          <h5 className="nav1">Home</h5>
        </NavLink>
        {authenticated ? (
          <ProtectedRouteNavbar />
        ) : (
          <UnauthorizedRoutesNavbar />
        )}
      </div>
    </Header>
  )
}

const Header = styled.header`
  width: 100%;
  display: flex;
  border-bottom: 0.2rem solid ${({ theme }) => theme.secondary.dark};
  justify-content: center;
  align-items: center;
  .navContainer {
    display: grid;
    grid-template-columns: 10rem 1fr 20rem;
    grid-gap: 1rem;
    place-items: center center;
    width: 100%;
    max-width: 150rem;
    height: 5rem;
  }
`
