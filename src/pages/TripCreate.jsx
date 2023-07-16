import React from 'react'
import NavBar from '../components/Navbar/NavBar'
import TripRouteCard from '../components/TripCreate/TripRouteCard'
import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import TripDetails from '../components/TripCreate/TripDetails'
import { useNavigate } from 'react-router-dom'
import NearByCard from '../components/TripCreate/NearByCard'
import { useSelector } from 'react-redux'


const TripCreate = () => {

    const { profile } = useSelector((state) => state?.userData)

    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [groupSize, setGroupSize] = useState(1)
    const [nearby, setNearby] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const handleCreateTrip = () => {

        // create trip-------------------
        // navigate to trip or home page
    }

    const cancelTrip = () => {
        navigate('/')
    }


    useEffect(() => {
        console.log(start, end)
    }, [start, end])

    return (
        <div
            className=" bg-primary min-h-screen overflow-x-hidden w-full flex flex-col text-text "
        >
            <NavBar
                profile={profile}
            />
            <div
                className="flex flex-col flex-grow gap-2 p-4 pt-0 "
            >
                <h1
                    className=" text-2xl font-bold"
                >
                    Creating Trip 🚃
                </h1>
                <div
                    className=' flex flex-row w-full gap-2 '
                >

                    <TripDetails
                        setName={setName}
                        setDescription={setDescription}

                    />
                    <TripRouteCard
                        start={start}
                        end={end}
                        setStart={setStart}
                        setEnd={setEnd}
                    />
                </div>
                <div
                    className="flex flex-row w-full gap-2 "
                >
                    <NearByCard
                        setNearBy={setNearby}
                    nearBy={nearby}
                        destination={end}
                    />

                    {/* date and group size */}

                    <div
                        className="flex flex-col gap-2 "
                    >
                        {/* <h1
                        className=" text-sm md:text-base font-semibold ml-4 "
                    >
                        Date
                    </h1> */}
                        <input
                            type="date"
                            placeholder="Date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className=" border border-border rounded-[30px] text-sm px-4 py-4 font-semibold "
                        />
                        <div
                            className=" flex flex-col lg:flex-row gap-2 lg:items-center h-fit "
                        >
                            <h1
                                className=" text-sm md:text-base font-semibold "
                            >
                                Group Size
                            </h1>
                            <div
                                className="flex lg:flex-row flex-wrap gap-2 w-full h-fit "
                            >
                                {
                                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                                        <div
                                            key={index}
                                            className={"flex flex-row items-center justify-center w-8 h-8 hover:opacity-60 cursor-pointer duration-200 border border-border rounded-full "
                                                + (groupSize === item ? 'bg-[#ff924e] font-semibold border-0 ' : 'bg-primary')
                                            }
                                            onClick={() => setGroupSize(item)}
                                        >
                                            {item}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                </div>
                    <div
                        className="flex flex-row gap-2 h-fit w-full items-center justify-center "
                    >
                        <button
                            onClick={() => {cancelTrip()}}
                            className=" border border-border rounded-[30px] text-xs md:text-sm font-semibold px-4 py-2 hover:opacity-50 duration-200 "
                        >
                            Cancel
                        </button>

                        <button
                            onClick={() => handleCreateTrip()}
                            className=" bg-[#7aff7a] rounded-[30px] text-xs md:text-sm font-semibold px-4 py-2 hover:opacity-50 duration-200 "
                        >
                            Create Trip
                        </button>
                    </div>
            </div>
        </div>
    )
}

export default TripCreate
