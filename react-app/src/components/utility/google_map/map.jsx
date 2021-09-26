import useMap from "./hooks/useMap";
import usePolyline from "./hooks/usePolyline";
import React from "react";

export default function Map({ className, route }) {
  //  component adds div to the DOM for useMap and usePolyline to render map in
  const [ref, map] = useMap(route);
  usePolyline(map, route);
  return <div id="map-container" {...{ ref, className }} />;
}
