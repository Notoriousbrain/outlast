import * as actionType from "../actions/actionTypes"

export const userData = (state = {}, action) => {
  switch (action.type) {
    case actionType.GET_SINGLE_USER:
      return {
        ...state,
        profile: action?.data,
      }
    default:
      return state
  }
}
