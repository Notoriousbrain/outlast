import { onAuthStateChanged } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { auth, db } from "./config"
import { handleAuthStateChange } from "./utility"
import {
  createTripAction,
  getAllTripsAction,
  joinTripAction,
  registerLoginSignOutUser,
  updateTripDataAction,
  updateUserDataAction,
} from "../redux/actions"
import { collection, onSnapshot } from "firebase/firestore"

// firebase context
const FirebaseContext = createContext(null)
export const useFirebase = () => useContext(FirebaseContext)

// react component for firebase providation
export const FirebaseProvider = (props) => {
  const dispatch = useDispatch()
  const { profile } = useSelector((state) => state?.userData)

  // states
  const [user, setUser] = useState(null)

  // useEffect to catch logins, registrations and logouts
  useEffect(() => {
    onAuthStateChanged(auth, async (data) =>
      handleAuthStateChange(data, dispatch, setUser)
    )
  }, [dispatch])

  // useEffect to catch changes in any trips
  useEffect(() => {
    const tripChanges = onSnapshot(collection(db, "trips"), (coll) => {
      let trips = []
      coll.docs.forEach((doc) => {
        trips.push(doc.data())
      })
      dispatch(getAllTripsAction(trips))
    })

    return () => tripChanges()
  }, [dispatch])

  // registration
  const signUpUserUsingEmailAndPassword = async (data) => {
    dispatch(registerLoginSignOutUser("register", profile, data, dispatch))
  }

  // sign in email/pw
  const signInUserUsingEmailAndPassword = async (data) => {
    dispatch(registerLoginSignOutUser("login", profile, data))
  }

  // signout
  const signOutUser = async () => {
    dispatch(registerLoginSignOutUser("signout", profile))
  }

  // update user data
  const updateUserData = async (data) => {
    dispatch(updateUserDataAction(dispatch, profile, data))
  }

  // create trip
  const createTrip = async (data) => {
    dispatch(createTripAction(dispatch, profile, data))
  }

  // update trip data
  const updateTripData = async (tripId, data) => {
    dispatch(updateTripDataAction(profile, tripId, data))
  }

  // join trip
  const joinTrip = async (trip) => {
    dispatch(joinTripAction(dispatch, profile, trip))
  }

  return (
    <FirebaseContext.Provider
      value={{
        signUpUserUsingEmailAndPassword,
        signInUserUsingEmailAndPassword,
        signOutUser,
        createTrip,
        updateUserData,
        updateTripData,
        joinTrip,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  )
}
