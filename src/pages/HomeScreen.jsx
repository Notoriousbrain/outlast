import React from "react"
import NavBar from "../components/Navbar/NavBar"
import SuggestionCarousel from "../components/Suggestion/SuggestionCarousel"
import SearchBar from "../components/SearchTrips/SearchBar"
import BottomLoginBar from "../components/Modals/BottomLoginBar"
import { useSelector } from "react-redux"

const HomeScreen = () => {
  const { profile } = useSelector((state) => state?.userData)

  return (
    <div className=" bg-primary min-h-screen flex flex-col text-text ">
      <NavBar profile={profile} />
      <SuggestionCarousel />
      <SearchBar />
      {!profile && <BottomLoginBar />}
    </div>
  )
}

export default HomeScreen
