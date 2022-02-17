import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavLinkItem({
  to,
  children,
  exact = true,
  transparent = '',
  activeClassName = 'active',
}) {
  return (
    <NavLink
      to={to}
      exact={exact}
      className={transparent && 'transparent_underline'}
      activeClassName={activeClassName}
    >
      {children}
    </NavLink>
  )
}
