import { createContext, useContext } from "react"

// firebase context
const FirebaseContext = createContext(null)
export const useFirebase = () => useContext(FirebaseContext)

// react component for firebase providation
export const FirebaseProvider = (props) => {
  return (
    <FirebaseContext.Provider value={{}}>
      {props.children}
    </FirebaseContext.Provider>
  )
}
