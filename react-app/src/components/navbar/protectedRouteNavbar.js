import React from 'react'
import { NavLink } from 'react-router-dom'
import LogoutButton from '../auth/LogoutButton'

export default function ProtectedRouteNavbar() {
  return (
    <ul>
      <li>
        <NavLink to="/users" exact={true} activeClassName="active">
          Users
        </NavLink>
      </li>
      <li>
        <LogoutButton />
      </li>
    </ul>
  )
}
