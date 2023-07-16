import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'


const NearByCard = ({ destination, setNearBy, nearBy }) => {

    // const [nearBy, setNearBy] = useState([])
    // const [loading, setLoading] = useState(false)
    // const [error, setError] = useState(false)
    const [input, setInput] = useState('')
    console.log(nearBy)


    // const getNearBy = async () => {
    //     setLoading(true)
    //     setError(false)
    //     try {
    //         const options = {
    //             method: 'GET',
    //             url: 'https://places-nearby-a-coordinates.p.rapidapi.com/nearby',
    //             params: {
    //               lat: destination?.lat,
    //               lon: destination?.lng,
    //               categories: 'catering',
    //               radius: '500'
    //             },
    //             headers: {
    //               'X-RapidAPI-Key': '4a3d451c89msh84da4f1074e34b5p12572ejsnd9816bd333f9',
    //               'X-RapidAPI-Host': 'places-nearby-a-coordinates.p.rapidapi.com'
    //             }
    //           };

    //         const response = await axios.request(options)

    //         console.log(response.data)
    //         setNearBy(response.data.results)

    //         setLoading(false)

    //     } catch (error) {
    //         console.log(error)
    //         setError(true)
    //         setLoading(false)
    //     }
    // }

    // useEffect(() => {
    //     if(!destination) return
    //     getNearBy()
    // }, [destination])


    return (
        <div
            className=" bg-primary flex flex-col h-[200px] lg:h-[200px] py-2 px-4 min-w-[200px] lg:min-w-[500px] rounded-[30px] border border-border gap-2 text-text "
        >
            <div>
                <h1
                    className=" text-sm md:text-sm font-semibold"
                >
                    Near By Places - add to trip
                </h1>
            </div>
            <div
                className="flex flex-col overflow-y-auto gap-2 scrollbar-none flex-1 "
            >
                <div
                    className="flex flex-row gap-2 items-center justify-center w-full "
                >
                    <input type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Add a place"
                        className=" border border-border rounded-[30px] text-sm px-4 py-2 font-semibold w-full "
                    />
                    <button
                        onClick={() => {
                            console.log(input)
                            setNearBy([...nearBy, { name: input }])
                            setInput('')
                        }}
                        className=" bg-[#7aff7a] rounded-[30px] text-xs md:text-sm font-semibold px-4 py-2 hover:opacity-50 duration-200 "
                    >
                        Add
                    </button>
                </div>
                <div
                    className="flex flex-col items-center justify-center gap-2"
                >
                    {nearBy?.map((result, index) => (
                        <div
                            key={index}
                            className="flex flex-row justify-between gap-2 w-full "
                        >
                            <h1
                                className=" text-sm md:text-base"
                            >
                                {result.name}
                            </h1>
                            <button
                                onClick={() => {
                                    setNearBy(nearBy.filter((item) => item.name !== result.name))   
                                }}
                                className=" bg-[#ff924e] rounded-[30px] text-xs md:text-sm font-semibold px-2 py-1 hover:opacity-50 duration-200 "
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default NearByCard