import { put, takeEvery } from "redux-saga/effects"
import * as actionType from "../actions/actionTypes"
import * as actionCreators from "../actions"
import { toast } from "react-toastify"
import {
  handleCreateTrip,
  handleRegistration,
  handleSignIn,
  hanldeSignOut,
} from "../../firebase/utility"

// Simple main api loader
export function* mainLoaderSagaCall(action) {
  yield put(actionCreators.toggleMainLoader(false))
}

// Registration, Login and Signout saga
export function* registerLoginSignOutSagaCall(action) {
  try {
    yield put(actionCreators.toggleFirebaseLoader(true))
    if (action?.method === "register") {
      yield handleRegistration(action?.profile, action?.data)
      toast.success("Account registered successfully.")
    } else if (action?.method === "login") {
      yield handleSignIn(action?.profile, action?.data)
      toast.success("Logged in successfully.")
    } else if (action?.method === "signout") {
      yield hanldeSignOut(action?.profile)
    } else {
      return "NO METHOD FOUND"
    }
    yield put(actionCreators.toggleFirebaseLoader(false))
  } catch (error) {
    yield put(actionCreators.toggleFirebaseLoader(false))
    toast.error(error)
  }
}

// Create trip saga
export function* createTripSagaCall(action) {
  try {
    yield put(actionCreators.toggleFirebaseLoader(true))
    yield handleCreateTrip(action?.profile, action?.data)
    yield put(actionCreators.toggleFirebaseLoader(false))
  } catch (error) {
    yield put(actionCreators.toggleFirebaseLoader(false))
    toast.error(error)
  }
}
