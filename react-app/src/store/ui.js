const TOGGLE_ASIDE = 'ui/TOGGLE_ASIDE'

const toggleAside = () => ({
  type: TOGGLE_ASIDE,
})

const defaultState = {
  aside: true,
}

function uiReducer(state = defaultState, action) {
  switch (action.type) {
    case TOGGLE_ASIDE:
      return {
        ...initialState,
        aside: !initialState.aside,
      }
    default:
      return initialState
  }
}
