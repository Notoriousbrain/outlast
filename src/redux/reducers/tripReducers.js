import * as actionType from "../actions/actionTypes"

export const tripData = (state = {}, action) => {
  switch (action.type) {
    case actionType.GET_ALL_TRIPS:
      return {
        ...state,
        allTrips: action?.data,
      }
    default:
      return state
  }
}