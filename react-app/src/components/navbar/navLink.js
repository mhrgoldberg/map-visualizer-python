import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavLinkItem({ to, content }) {
  return (
    <NavLink to={to} exact={true} activeClassName="active">
      {content}
    </NavLink>
  )
}
