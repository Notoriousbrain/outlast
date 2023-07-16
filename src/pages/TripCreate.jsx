import React from 'react'
import NavBar from '../components/Navbar/NavBar'
import TripRouteCard from '../components/TripView/TripRouteCard'
import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'


const TripCreate = () => {

  return (
    <div
        className=" bg-primary min-h-screen flex flex-col text-text "
    >
        <NavBar />
        <div
            className="flex flex-col flex-grow p-4 "
        >
            <div
                className=' flex flex-row gap-2 '
            >
                <TripRouteCard
                    // editable={}
                />
            </div>
        </div>
    </div>
  )
}

export default TripCreate
