import React from 'react'
import styled from 'styled-components'
import LogoutButton from '../auth/LogoutButton'
import NavListItem from './navListItem'

export default function ProtectedRouteNavbar() {
  return (
    <Ul>
      <NavListItem></NavListItem>
      <li>
        <LogoutButton />
      </li>
    </Ul>
  )
}

const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
