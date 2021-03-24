const SET_AUTH_ERRORS = 'SET_AUTH_ERRORS'

export const setAuthErrors = (errors) => ({ type: SET_AUTH_ERRORS, errors })

const initState = {
  auth: []
}
export function errorReducer(state = initState, action) {
  switch (action.type) {
    case SET_AUTH_ERRORS: {
      const newState = { ...state }
      newState.auth = action.errors
      return newState
    }

    default:
      return state
  }
}
