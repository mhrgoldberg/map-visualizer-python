import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getAllRoutes } from '../../store/routes'
import RouteCard from './RouteCard'

export default function RoutesIndex() {
  const dispatch = useDispatch()
  const routes = useSelector((state) => state.routes)
  useEffect(() => {
    ;(async () => {
      await dispatch(getAllRoutes())
    })()
  }, [dispatch])
  return (
    <Ul>
      {routes.userRoutesOrdering.map((id) => {
        const route = routes.userRoutes[id]
        return <RouteCard route={route} key={route.id} />
      })}
    </Ul>
  )
}

const Ul = styled.ul`
  width: 100%;
  border: 0.3rem solid var(--primary-dark);
  border-top: none;
  margin-top: 0.5rem;
  /* border-radius: 3rem; */
  /* Overflow */
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`
