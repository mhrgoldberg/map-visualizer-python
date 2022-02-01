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
  const res = await fetch('/api/tracks/', { method: 'GET' })
  const data = await res.json()
  if (data.errors) {
    dispatch(setErrors(data.errors))
  } else {
    dispatch(addToUserRoutes(data))
  }
}

export const getRoute = (id) => async (dispatch) => {
  const res = await fetch(`/api/tracks/${id}`, { method: 'GET' })
  const data = await res.json()
  if (data.errors) {
    dispatch(setErrors(data.errors))
  } else {
    dispatch(addToUserRoutes([data]))
  }
}

export const saveRoute = (payload) => async (dispatch) => {
  const res = await fetch('/api/tracks/', {
    method: 'POST',
    body: payload,
  })
  const data = await res.json()
  if (data.errors) {
    dispatch(setErrors(data.errors))
    return false
  } else {
    dispatch(addToUserRoutes(data))
    return true
  }
}

const defaultState = {
  userRoutes: {},
  userRoutesOrdering: [],
}

export function routesReducer(state = defaultState, action) {
  const newState = { ...state }
  switch (action.type) {
    case SET_ROUTE: {
      newState.userRoutes[action.payload.id] = action.payload.userRoutes
      return newState
    }
    case ADD_TO_USER_ROUTES: {
      // filter new data to only new routes
      const newRoutes = {}
      const newRoutesOrdering = action.payload.ordering.filter((id) => {
        if (newState.userRoutes[id]) return false
        newRoutes[id] = action.payload.dict[id]
        return true
      })
      if (!newRoutesOrdering.length) return state

      newState.userRoutes = {
        ...state.userRoutes,
        ...newRoutes,
      }
      newState.userRoutesOrdering = [
        ...state.userRoutesOrdering,
        ...newRoutesOrdering,
      ]
      return newState
    }
    case RESET_USER_ROUTES: {
      newState.userRoutes = {}
      newState.order = []
      return newState
    }
    default:
      return state
  }
}
