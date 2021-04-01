import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export default function NavLinkItem({ to, content }) {
  return (
    <NavLink to={to} exact={true} activeClassName="active">
      {content}
    </NavLink>
  )
}

const Li = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`
