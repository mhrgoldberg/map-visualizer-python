import React from 'react'
import { NavLink } from 'react-router-dom'

export default function UnauthorizedRoutesNavbar() {
  return (
    <ul>
      <li>
        <NavLink to="/" exact={true} activeClassName="active">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/login" exact={true} activeClassName="active">
          Login
        </NavLink>
      </li>
      <li>
        <NavLink to="/sign-up" exact={true} activeClassName="active">
          Sign Up
        </NavLink>
      </li>
    </ul>
  )
}
