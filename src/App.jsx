import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomeScreen from "./pages/HomeScreen"
import CreateTrip from "./pages/CreateTrip"

const App = () => {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/create" element={<CreateTrip />} />
        </Routes>
      </Router>
  )
}

export default App
