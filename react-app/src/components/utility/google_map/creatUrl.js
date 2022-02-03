export default function createURL(polyline) {
  const url =
    'https://maps.googleapis.com/maps/api/staticmap?&path=color:0x5bc0be%7Cenc:'
  const options = `&size=250x250&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
  return url + polyline + options
}
