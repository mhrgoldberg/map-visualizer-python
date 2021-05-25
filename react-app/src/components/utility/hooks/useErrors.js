import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors } from '../../../store/errors'

export default function useErrors() {
  const dispatch = useDispatch()

  const errors = useSelector((state) => {
    return state.errors
  })

  const useClearErrorsOnUnmount = () => {
    useEffect(() => {
      return () => {
        dispatch(clearErrors())
      }
    }, [])
  }

  return [errors, useClearErrorsOnUnmount]
}
