import React from 'react'
import NavBar from '../components/Navbar/NavBar'
import { useSelector } from 'react-redux'


const TripView = () => {
  const { profile } = useSelector((state) => state?.userData)
  

  return (
    <div
        className=" bg-primary min-h-screen overflow-x-hidden w-full flex flex-col text-text "
    >
        <NavBar
            profile={profile}
        />
    </div>
  )
}

export default TripView