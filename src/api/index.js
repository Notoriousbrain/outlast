import axios from 'axios';

const getPlacesData = async () => {

    const URL =
      "https://travel-advisor.p.rapidapi.com/attractions/list-in-boundary";

    const options = {
      params: {
        tr_longitude: "109.262909",
        tr_latitude: "12.346705",
        bl_longitude: "109.095887",
        bl_latitude: "12.113245",
      },
      headers: {
        "X-RapidAPI-Key": "45ddf3087bmsh746a2c5a13176f6p1435dejsn356ae34239ba",
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      },
    };

    try{
         const { data: { data } } = await axios.get(URL, options);
         console.log(data);
         return data;
    } catch (error) {
        console.error(error);
    }
}

export { getPlacesData }