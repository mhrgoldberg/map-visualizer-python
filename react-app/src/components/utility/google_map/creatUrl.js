export default function createURL(polyline) {
  const url =
    'https://maps.googleapis.com/maps/api/staticmap?&path=color:0xfd4c01%7Cenc:'
  const options = `&size=250x250&key=${window.googleAPIKey}`
  return url + polyline + options
}
