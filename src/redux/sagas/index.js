import { takeLatest } from "redux-saga/effects"
import * as actionTypes from "../actions/actionTypes"
import * as userMiddleware from "./userSaga"
import * as tripMiddleware from "./tripSaga"

export default function* mySaga() {
  yield takeLatest(
    actionTypes.GET_SINGLE_USER,
    userMiddleware.mainLoaderSagaCall
  )
  yield takeLatest(
    actionTypes.REGISTER_LOGIN_SIGNOUT_USER,
    userMiddleware.registerLoginSignOutSagaCall
  )
  yield takeLatest(actionTypes.CREATE_TRIP, tripMiddleware.createTripSagaCall)
  yield takeLatest(
    actionTypes.UPDATE_USER_DATA,
    userMiddleware.updateUserDataSagaCall
  )
  yield takeLatest(
    actionTypes.UPDATE_TRIP_DATA,
    tripMiddleware.updateTripDataSagaCall
  )
  yield takeLatest(
    actionTypes.JOIN_TRIP,
    tripMiddleware.joinTripSagaCall
  )
  yield takeLatest(
    actionTypes.COMMENT_ON_TRIP,
    tripMiddleware.commentOnTripSagaCall
  )
}
