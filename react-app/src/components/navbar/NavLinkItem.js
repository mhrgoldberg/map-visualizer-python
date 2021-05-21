import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavLinkItem({
  to,
  children,
  exact = true,
  activeClassName = 'active',
}) {
  return (
    <NavLink to={to} exact={exact} activeClassName={activeClassName}>
      {children}
    </NavLink>
  )
}
