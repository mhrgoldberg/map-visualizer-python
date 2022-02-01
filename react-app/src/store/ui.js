const TOGGLE_ASIDE = 'ui/TOGGLE_ASIDE'

export const toggleAside = () => ({
  type: TOGGLE_ASIDE,
})

const defaultState = {
  aside: true,
}

export function uiReducer(initialState = defaultState, action) {
  switch (action.type) {
    case TOGGLE_ASIDE:
      return {
        aside: !initialState.aside,
      }
    default:
      return initialState
  }
}
