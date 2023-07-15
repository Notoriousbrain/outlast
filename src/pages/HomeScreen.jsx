import React from 'react'
import NavBar from '../components/Navbar/NavBar'
import SuggestionCarousel from '../components/Suggestion/SuggestionCarousel'

const HomeScreen = () => {
  return (
    <div
      className=" bg-primary min-h-screen text-text  "
    >
      <NavBar />
      <SuggestionCarousel />
    </div>
  )
}

export default HomeScreen