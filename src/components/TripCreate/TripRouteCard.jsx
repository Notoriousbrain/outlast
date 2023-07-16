import React from 'react'
import { useState, useEffect, useMemo } from 'react'

import { useJsApiLoader, GoogleMap, StandaloneSearchBox, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { geocodeByPlaceId } from 'react-places-autocomplete';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import usePlacesAutocomplete, { getDetails } from "use-places-autocomplete";


const TripRouteCard = ({ setStart, setEnd }) => {

  const [libraries] = useState(['places']);
  const [map, setMap] = useState(null)

  const [origin, setOrigin] = useState(null)
  const [selectPlace, setSelectPlace] = useState(null)

  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')

  // create directions

  const direc = () => {
    if (!origin || !selectPlace || !map) return
    setStart(origin)
    setEnd(selectPlace)
    const directionsService = new window.google.maps.DirectionsService();
    if (origin && selectPlace) {
      directionsService.route(
        {
          origin: origin.address,
          destination: selectPlace.address,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirectionsResponse(result)
            setDistance(result.routes[0].legs[0].distance.text)
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }

  useEffect(() => {
    direc()
  }, [origin, selectPlace])



  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  })

  return (
    <div
      className=" border border-border rounded-[30px] flex flex-col justify-center items-center w-full h-[300px] "
    >
      {isLoaded && (
        <>
          <div
            className="flex flex-col justify-center items-center overflow-hidden rounded-[30px] w-full h-full "
          >
            <GoogleMap
              mapContainerStyle={{ height: "101%", width: "100%" }}
              zoom={6}
              center={selectPlace ? { lat: selectPlace.lat, lng: selectPlace.lng } : { lat: 20.5937, lng: 78.9629 }}
              options={{
                zoomControl: true,

                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
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
              {origin && <Marker position={{ lat: origin.lat, lng: origin.lng }} />}
              {selectPlace && <Marker position={{ lat: selectPlace.lat, lng: selectPlace.lng }}
              />}
              {directionsResponse && <DirectionsRenderer
                directions={directionsResponse}
                options={{
                  directions: directionsResponse,
                  suppressMarkers: true,
                  polylineOptions: {
                    strokeColor: "#ff9c3f",
                    strokeOpacity: 0.8,
                    strokeWeight: 5,
                  },
                }}
              />}
            </GoogleMap>
          </div>
          <div
            className="flex flex-row gap-2 p-2 justify-center w-full items-center "
          >
            <PlacesAutocomplete
              setSelectPlace={setOrigin}
            />
            <span>
              to
            </span>
            <PlacesAutocomplete
              setSelectPlace={setSelectPlace}
            />

          </div>
        </>
      )}
    </div>
  )
}


const PlacesAutocomplete = ({ setSelectPlace }) => {

  const {
    ready, value, suggestions: { status, data }, setValue, clearSuggestions,
  } = usePlacesAutocomplete()



  const handleSelect = async (address) => {
    setValue(address, false)
    clearSuggestions()

    try {
      const results = await getGeocode({ address })
      const { lat, lng } = await getLatLng(results[0])
      setSelectPlace({ lat, lng, address })
    } catch (error) {
      console.log("😱 Error: ", error)
    }
  }

  const handleInputChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <div
      className="flex flex-col relative gap-2 justify-center items-center w-full "
    >
      <input
        className="border border-border rounded-[30px] text-sm px-4 py-2 w-full "
        value={value}
        onChange={handleInputChange}
        disabled={!ready}
        placeholder="Search for an address"
      />

      <ul
        hidden={status !== "OK"}
        className=" border absolute bg-white top-[100%] mt-4 border-border rounded-[20px] overflow-y-auto p-1 w-full"
      >
        {status === "OK" && data.map(({ place_id, description }) => (
          <li
            className="cursor-pointer hover:opacity-60 text-xs md:text-sm hover:text-text border-b border-border p-1 "
            key={description} onClick={() => handleSelect(description)}>
            {description}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TripRouteCard