import React from 'react'
import { useState, useEffect } from 'react'

import {
  LoadScript,
  GoogleMap,
  StandaloneSearchBox,
  Autocomplete,
} from "@react-google-maps/api";
import PlacesAutocomplete, { geocodeByPlaceId } from 'react-places-autocomplete';

const TripRouteCard = ({ editable }) => {

  const [libraries] = useState(['places']);
  const [map, setMap] = useState(null)
  const [selectPlace , setSelectPlace] = useState(null)

  //   const { isLoaded } = useJsApiLoader({
  //     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  //     libraries
  // })

  return (
    <div
      className=" border border-border rounded-[30px] overflow-hidden "
    >
      <div
        className="flex flex-col gap-2 justify-center items-center overflow-hidden h-[400px] w-[500px] "
      >

        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={libraries}>
          <GoogleMap
            mapContainerStyle={{ height: "101%", width: "100%" }}
            zoom={6}
            center={{ lat: 22, lng: 72 }}
            options={{
              zoomControl: true,

              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: false,
              center: { lat: 22, lng: 72 },
              zoom: 6,
              restriction: {
                latLngBounds: {
                  north: 37.084107,
                  south: 7.635,
                  west: 68.7,
                  east: 97.4,
                },
                strictBounds: true,
              },
            }}

          onLoad={(map) => {
            setMap(map)
          }}
          >
          </GoogleMap>
          <Autocomplete
            onLoad={(Autocomplete) => {
              console.log(Autocomplete)
            }}
            options={{
              componentRestrictions: { country: "in" }

            }}
          >
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => console.log(e.target.value)}
              // onKeyUp={(e) => console.log(e.target.value)}
              // onClick={(e) => console.log(e.target.value)}
              className=" border border-border rounded-[20px] p-2 w-full "
            />
          </Autocomplete>
        </LoadScript>
      </div>
      <div
        className="flex flex-col gap-2 justify-center items-center "
      >

      </div>
    </div>
  )
}

export default TripRouteCard