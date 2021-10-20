import React from 'react'
import styled from 'styled-components'
import { icons, useCurrentUser } from '../utility'
import NavLinkItem from './NavLinkItem'
import ProtectedRouteNavbar from './ProtectedNavbar'
import UnauthorizedRoutesNavbar from './UnauthorizedNavbar'

export default function NavBar() {
  const authenticated = !!useCurrentUser()
  return (
    <Header>
      <div className="navContainer">
        <NavLinkItem to="/" transparent={true}>
          <span>
            <icons.Logo />
            <h5>MapVisualizer</h5>
          </span>
        </NavLinkItem>
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
  height: var(--nav-height);
  display: flex;

  /* background-color: var(--secondary-dark); */
  border-bottom: 0.2rem solid var(--secondary-dark);
  justify-content: center;
  align-items: center;
  a:hover {
    h5 {
      color: var(--primary-cyan);
    }
  }

  h5 {
    margin: 0;
  }

  span {
    grid-column: 1;
    display: flex;
    align-items: center;
    width: 23rem;
  }
  .navContainer {
    display: grid;
    grid-template-columns: min-content 1fr min-content;
    grid-gap: 1rem;
    padding: 0 2rem;
    justify-items: space-between;
    align-content: center;
    align-items: center;
    width: 100%;
    max-width: 120rem;
    height: var(--nav-height);
  }
`
