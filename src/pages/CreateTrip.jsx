import React, { useEffect, useState } from 'react'
import { Autocomplete } from '@react-google-maps/api';
import { getPlacesData } from '../api'

const CreateTeam = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getPlacesData()
    .then((data) => {
      console.log(data);
      setPlaces(data)
    } )
  }, [])
  

  return (
    <div>
      <h1>Cities in India</h1>
      <ul>
       
      </ul>
    </div>
  );
}

export default CreateTeam