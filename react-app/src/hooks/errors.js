import { useSelector } from 'react-redux'

export function useAuthErrors() {
  return useSelector((state) => {
    return state.errors.auth
  })
}
