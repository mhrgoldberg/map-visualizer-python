import React from 'react'
import ProtectedRouteNavbar from './protectedRouteNavbar'
import UnauthorizedRoutesNavbar from './unauthorizedRoutesNavbar'

const NavBar = ({ authenticated }) => {
  return (
    <nav>
      {authenticated ? <ProtectedRouteNavbar /> : <UnauthorizedRoutesNavbar />}
    </nav>
  )
}

export default NavBar
