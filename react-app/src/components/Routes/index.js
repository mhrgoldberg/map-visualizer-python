import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRoutes } from '../../store/routes'

export default function RoutesIndex() {
  const dispatch = useDispatch()
  const routes = useSelector((state) => state.routes)
  useEffect(() => {
    ;(async () => {
      await dispatch(getAllRoutes())
    })()
  }, [dispatch])
  if (routes.userRoutesOrdering.length) {
    return (
      <ul>
        {routes.userRoutesOrdering.map((id) => {
          const route = routes.userRoutes[id]
          debugger
          return (
            <li key={route.id}>
              <h3>{route.title}</h3>

              <div className="sport-type">{route.sport_type}</div>
              <div className="data"> </div>
            </li>
          )
        })}
      </ul>
    )
  } else {
    return 'loading...'
  }
}
