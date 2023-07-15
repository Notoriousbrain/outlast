import { onAuthStateChanged } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { auth } from "./config"
import { handleAuthStateChange } from "./utility"
import { createTripAction, registerLoginSignOutUser } from "../redux/actions"

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

  // registration
  const signUpUserUsingEmailAndPassword = async (data) => {
    dispatch(registerLoginSignOutUser("register", profile, data))
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

  // create trip
  const createTrip = async (data) => {
    dispatch(createTripAction(profile, data))
  }

  const dummyData = {
    startingFrom: "starting from location", // creators current location <city, state>
    destination: "final destination", // <city, state>
    limit: 5,
    desc: "Some descripotion",
    suggestions: "suggestion ke liye api chalega, uska res ka array yaa object",
  }

  useEffect(() => {
    const create = async () => {
      setTimeout(() => {
        createTrip(dummyData)
      }, 6000)
    }
    create()
  }, [])

  return (
    <FirebaseContext.Provider
      value={{
        signUpUserUsingEmailAndPassword,
        signInUserUsingEmailAndPassword,
        signOutUser,
        createTrip,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  )
}
