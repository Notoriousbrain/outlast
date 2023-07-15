import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomeScreen from "./pages/HomeScreen"
import LoginRegister from "./pages/LoginRegister"
import NavBar from "./components/Navbar/NavBar"
import TripCreate from "./pages/TripCreate"

const App = () => {

  return (
      <Router>
          {/* <NavBar /> */}
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/signup" element={<LoginRegister />} />
          <Route path="/create-trip" element={<TripCreate />} />
        </Routes>
      </Router>
  )
}

export default App
