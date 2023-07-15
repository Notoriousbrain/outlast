import * as actionType from "./actionTypes"

// Getting single user data after login or registration
export const getSingleUser = (data) => {
  return {
    type: actionType.GET_SINGLE_USER,
    data,
  }
}

// Register, signout and Login user
export const registerLoginSignOutUser = (method, profile, data) => ({
  type: actionType.REGISTER_LOGIN_SIGNOUT_USER,
  method,
  profile,
  data,
})

// update user data
export const updateUserDataAction = (dispatch, profile, data) => ({
  type: actionType.UPDATE_USER_DATA,
  dispatch,
  profile,
  data,
})
