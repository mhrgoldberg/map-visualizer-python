import React from 'react'
import styled from 'styled-components'
import ProtectedRouteNavbar from './protectedRouteNavbar'
import UnauthorizedRoutesNavbar from './unauthorizedRoutesNavbar'
import { NavLink } from 'react-router-dom'
import { useCurrentUser } from '../../hooks/user'
export default function NavBar() {
  const authenticated = !!useCurrentUser()
  return (
    <Header>
      <div className="navContainer">
        <NavLink to="/" exact={true} className="logo" activeClassName="active">
          <h5 className="nav1">MapVisualizer</h5>
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
    grid-template-columns: min-content 1fr minmax(15rem, min-content);
    grid-gap: 1rem;
    padding: 0 2rem;
    justify-items: space-between;
    align-content: center;
    align-items: baseline;
    width: 90%;
    max-width: 120rem;
    height: 6rem;

    /* font-size: 2rem;
    line-height: 1; */
  }
`
