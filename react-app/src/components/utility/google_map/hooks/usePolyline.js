import { useEffect, useCallback, useContext } from 'react'
import { FileContext } from '../../../../context/file_context'

export default function usePolyline(map, route) {
  const { state } = useContext(FileContext)
  const latLngs = state.file.trackPoints.latLngs

  const addPolyline = useCallback(createPathCallback(map, latLngs, '#FF0000'), [
    latLngs,
    map,
  ])

  const setBounds = useCallback(setBoundsCallback(map, latLngs), [latLngs, map])

  useEffect(() => {
    if (map) {
      setBounds()
      addPolyline()
    }
  }, [map, addPolyline, setBounds])
}

function createPathCallback(map, latLngs, strokeColor) {
  return () => {
    const workoutPath = new window.google.maps.Polyline({
      path: latLngs,
      geodesic: true,
      strokeColor,
      strokeOpacity: 1.5,
      strokeWeight: 2,
    })
    workoutPath.setMap(map)
  }
}
function setBoundsCallback(map, latLngs) {
  return () => {
    const bounds = new window.google.maps.LatLngBounds()
    latLngs.forEach((trackPoint) => bounds.extend(trackPoint))
    map.setCenter(bounds.getCenter())
    map.fitBounds(bounds)
  }
}
