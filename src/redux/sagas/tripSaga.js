import { put, takeEvery } from "redux-saga/effects"
import * as actionType from "../actions/actionTypes"
import * as actionCreators from "../actions"
import { toast } from "react-toastify"
import {
  handleCreateTrip, handleUpdateTripData,
} from "../../firebase/utility"

// Create trip saga
export function* createTripSagaCall(action) {
  try {
    yield put(actionCreators.toggleFirebaseLoader(true))
    yield handleCreateTrip(action?.dispatch, action?.profile, action?.data)
    yield put(actionCreators.toggleFirebaseLoader(false))
  } catch (error) {
    yield put(actionCreators.toggleFirebaseLoader(false))
    toast.error(error)
  }
}

// Update user data saga
export function* updateTripDataSagaCall(action) {
  try {
    yield put(actionCreators.toggleFirebaseLoader(true))
    yield handleUpdateTripData(action?.profile, action?.tripId, action?.data)
    yield put(actionCreators.toggleFirebaseLoader(false))
  } catch (error) {
    yield put(actionCreators.toggleFirebaseLoader(false))
    toast.error(error)
  }
}