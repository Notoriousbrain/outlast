import { combineReducers } from "redux"
import { userData } from "./userReducers"
import { tripData } from "./tripReducers"
import loader from "./loaderReducer"

export default combineReducers({ userData, tripData, loader })
