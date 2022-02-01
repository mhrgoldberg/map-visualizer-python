export default function createURL(polyline) {
  const url =
    'https://maps.googleapis.com/maps/api/staticmap?&path=color:0xfd4c01%7Cenc:'
  const options = `&size=250x250&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
  return url + polyline + options
}
