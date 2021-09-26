import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
export default function RouteShow(id) {
  const route = useSelector((state) => state.route[id])

  return <div></div>
}
