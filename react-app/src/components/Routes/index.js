import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getAllRoutes } from '../../store/routes'

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
        // const url = createURL(route.polyline)
        return (
          <li key={route.id}>
            <img src={route.img_url} alt="" />
            <div className="route-li-container">
              <div className="data">
                <h3>{route.title}</h3>
                <p className="sport-type">Sport Type: {route.sport_type}</p>
                <p className="distance">Distance: {route.distance}</p>
                <p className="ascent">Ascent: {route.ascent}</p>
              </div>
            </div>
          </li>
        )
      })}
    </Ul>
  )
}

const Ul = styled.ul`
  width: 100%;
  border: 0.3rem solid var(--primary-cyan);
  border-top: none;
  /* border-radius: 0.5rem; */
  h3 {
    justify-self: center;
  }
  img {
    border-right: 0.3rem solid var(--primary-cyan);
    /* border-right: none; */
  }
  :last-child {
    border-bottom: none;
  }
  li {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 0.3rem solid var(--primary-cyan);
    background: var(--secondary-dark);
  }
  .route-li-container {
    padding: 1rem;
    width: 100%;
    display: flex;
    justify-content: start;
  }
`
