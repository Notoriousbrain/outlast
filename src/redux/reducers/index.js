import { combineReducers } from "redux"
import { userData } from "./userReducers"
import loader from "./loaderReducer"

export default combineReducers({ userData, loader })
