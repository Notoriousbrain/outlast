import * as actionType from "../actions/actionTypes"

const initialState = {
  siteLoader: true,
}

const loader = (state = initialState, { type, data }) => {
  switch (type) {
    case actionType.MAIN_LOADER:
      return {
        ...state,
        siteLoader: data,
      }
    case actionType.FIREBASE_LOADER:
      return {
        ...state,
        firebaseLoader: data,
      }
    default:
      return state
  }
}

export default loader
