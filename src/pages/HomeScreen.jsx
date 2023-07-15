import React from 'react'
import NavBar from '../components/Navbar/NavBar'
import SuggestionCarousel from '../components/Suggestion/SuggestionCarousel'
import SearchBar from '../components/SearchTrips/SearchBar'
import BottomLoginBar from '../components/Modals/BottomLoginBar'

const HomeScreen = () => {
  return (
    <div
      className=" bg-primary min-h-screen flex flex-col text-text "
    >
      <NavBar />
      <SuggestionCarousel />
      <SearchBar />
      <BottomLoginBar />

    </div>
  )
}

export default HomeScreen