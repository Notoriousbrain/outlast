import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomeScreen from "./pages/HomeScreen"
import LoginRegister from "./pages/LoginRegister"
import NavBar from "./components/Navbar/NavBar"
import TripCreate from "./pages/TripCreate"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useSelector } from "react-redux"
import Loader from "./constants/Loader"
import TripView from "./pages/TripView"

const App = () => {
  const { siteLoader, firebaseLoader } = useSelector((state) => state.loader)

  return (
    <>
      <ToastContainer
        hideProgressBar
        theme="colored"
        newestOnTop
        draggable={false}
        toastStyle={{ color: "#333333" }}
      />
      {siteLoader || firebaseLoader ? (
        <Loader />
      ) : (
        <Router>
          {/* <NavBar /> */}
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginRegister />} />
            <Route path="/signup" element={<LoginRegister />} />
            <Route path="/create-trip" element={<TripCreate />} />
            <Route path="/trip/:id" element={<TripView />} />
          </Routes>
        </Router>
      )}
    </>
  )
}

export default App
