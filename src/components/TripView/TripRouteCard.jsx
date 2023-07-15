import React from 'react'
import { useState, useEffect } from 'react'

import { useJsApiLoader, GoogleMap, Autocomplete } from '@react-google-maps/api';

const TripRouteCard = ({ editable }) => {

  const libraries = ["places"]

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries
})

  return (
    <div
      className=" border border-border p-4 rounded-[30px]  "
    >
      <div
        className="flex flex-col gap-2 justify-center items-center rounded-[20px] overflow-hidden h-[400px] w-[500px] "
      >
        {
          isLoaded && ( <>
          <GoogleMap
          mapContainerStyle={{height: "105%", width: "102%"}}
          zoom={6}
          center={{lat: 22, lng: 72}}
          options={{
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
          }}
          // onLoad={(map) => {
          //   console.log(map)
          // }}
        >
        </GoogleMap>
          <Autocomplete
            onLoad={(autocomplete) => {
              console.log(autocomplete)
            }}
            options={{
              // types: ["(cities)", "(regions)"],
              componentRestrictions: {country: "in"}

            }}
          >
            <input
              type="text"
              placeholder="Search"
              // onChange={(e) => console.log(e.target.value)}
              // onKeyUp={(e) => console.log(e.target.value)}
              // onClick={(e) => console.log(e.target.value)}
              className=" border border-border rounded-[20px] p-2 w-full "
            />
          </Autocomplete>
          </>
          )
        }
      </div>
    </div>
  )
}

export default TripRouteCard