import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRoute } from '../../store/routes'

export default function RouteShow(id) {
  const route = useSelector((state) => state.routes.userRoutes[id])

  const dispatch = useDispatch()

  useEffect(() => {
    if (!route) {
      ;(async () => {
        dispatch(getRoute(id))
      })()
    }
  }, [dispatch, route, id])

  return (
    <div>
      <h3>{route.title}</h3>
    </div>
  )
}
