import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomeScreen from "./pages/HomeScreen"
import CreateTrip from "./pages/CreateTrip"
import LoginRegister from "./pages/LoginRegister"
import NavBar from "./components/Navbar/NavBar"

const App = () => {

  return (
      <Router>
          {/* <NavBar /> */}
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/create" element={<CreateTrip />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/signup" element={<LoginRegister />} />
        </Routes>
      </Router>
  )
}

export default App
