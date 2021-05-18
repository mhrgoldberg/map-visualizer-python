import { setErrors } from './errors'

const SET_ROUTE = 'routes/SET_ROUTE'
const ADD_TO_USER_ROUTES = 'routes/ADD_TO_USER_ROUTES'
const RESET_USER_ROUTES = 'routes/RESET_USER_ROUTES'

export const setRoute = (route) => ({ type: SET_ROUTE, payload: route })
export const addToUserRoutes = (route) => ({
  type: ADD_TO_USER_ROUTES,
  payload: route,
})
export const resetUserRoutes = (routes) => ({
  type: RESET_USER_ROUTES,
  payload: routes,
})

export const getAllRoutes = () => async (dispatch) => {
  const res = await fetch('/api/routes', { method: 'GET' })
  const response = await res.json()
  if (response.errors) {
    dispatch(setErrors(response.errors))
  } else {
    dispatch(RESET_USER_ROUTES)
  }
}

export const saveRoute = (payload) => async (dispatch) => {
  const res = await fetch('/api/routes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  const response = await res.json()
  if (response.errors) {
    dispatch(setErrors(response.errors))
  } else {
    dispatch(setRoute(response))
    dispatch(addToUserRoutes(response))
  }
}

const defaultState = {
  userRoutes: {},
}

export function routesReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_ROUTE: {
      const newState = { ...state }
      return newState
    }
    case ADD_TO_USER_ROUTES: {
      const newState = { ...state }
      newState.userRoutes = {
        ...state.userRoutes,
        [action.payload.id]: action.payload,
      }
    }
    case RESET_USER_ROUTES: {
      const newState = { ...state }
      newState.userRoutes = {}
      return newState
    }
    default:
      return state
  }
}
