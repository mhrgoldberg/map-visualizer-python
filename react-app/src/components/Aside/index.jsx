import { Sling as Hamburger } from 'hamburger-react'
import React, { useState } from 'react'
import styled from 'styled-components'
import RouteList from '../Routes'
import { useCurrentUser } from '../utility'
import Tabs from './Tabs'
const CHOICES = {
  WORKOUT: 'Workout',
  ROUTE: 'Route',
}

export default function Aside() {
  const authenticated = !!useCurrentUser()
  const [viewType, setViewType] = useState(CHOICES.ROUTE)

  if (!authenticated) {
    return null
  }

  return (
    <AsideContainer>
      <span>
        <Tabs viewType={viewType} setViewType={setViewType} CHOICES={CHOICES} />
        <Hamburger />
      </span>
      {viewType === CHOICES.WORKOUT ? null : <RouteList />}
    </AsideContainer>
  )
}

const AsideContainer = styled.aside`
  width: 40rem;
  height: calc(100vh - calc(var(--nav-height)));
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-right: 0.2rem solid var(--secondary-dark);

  span {
    display: inline-box;
    width: 100%;
    border-bottom: 0.3rem solid var(--primary-cyan);
  }

  .hamburger-react {
    color: var(--primary-cyan);
    margin-left: 4rem;
  }
`
