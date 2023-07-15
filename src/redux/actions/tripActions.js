import * as actionType from "./actionTypes"

// creating a trip
export const createTripAction = (dispatch, profile, data) => ({
  type: actionType.CREATE_TRIP,
  dispatch,
  profile,
  data,
})

// get all trips
export const getAllTripsAction = (data) => ({
  type: actionType.GET_ALL_TRIPS,
  data,
})

// update user data
export const updateTripDataAction = (profile, tripId, data) => ({
  type: actionType.UPDATE_TRIP_DATA,
  profile,
  tripId,
  data,
})

// join trip
export const joinTripAction = (dispatch, profile, trip) => ({
  type: actionType.JOIN_TRIP,
  dispatch,
  profile,
  trip,
})
