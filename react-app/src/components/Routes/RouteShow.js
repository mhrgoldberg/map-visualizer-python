import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getRoute } from '../../store/routes'

export default function RouteShow() {
  const { id } = useParams()
  const route = useSelector((state) => state.routes.userRoutes[id])
  const dispatch = useDispatch()

  useEffect(() => {
    if (!route) {
      ;(async () => {
        await dispatch(getRoute(id))
      })()
    }
  }, [dispatch, route, id])
  if (!route) return <p>loading...</p>
  return (
    <div>
      <h1>{route.title}</h1>
      <div className="map-container"></div>
    </div>
  )
}
