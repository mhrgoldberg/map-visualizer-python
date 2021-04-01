const SET_ERRORS = 'errors/setErrors'
const CLEAR_ERRORS = 'errors/clearErrors'

export const setErrors = (errorsObj) => ({
  type: SET_ERRORS,
  payload: errorsObj
})
export const clearErrors = () => ({ type: CLEAR_ERRORS })

const initState = {}
export function errorReducer(state = initState, action) {
  switch (action.type) {
    case SET_ERRORS: {
      return { ...action.payload }
    }
    case CLEAR_ERRORS: {
      return initState
    }
    default:
      return state
  }
}
