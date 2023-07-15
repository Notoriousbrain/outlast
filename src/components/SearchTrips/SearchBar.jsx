import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
  const todaydate = new Date().toISOString().slice(0, 10)
  const [showResults, setShowResults] = useState(true)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  const [search, setSearch] = useState("")
  const [date, setDate] = useState(todaydate)
  const [results, setResults] = useState([])


  useEffect(() => {
    setShowResults(!search && false)
  }, [search])

  const handleSearchInput = () => {
    if(!search) return
    setLoading(true)
    setShowResults(true)
    const formData = new FormData()
    formData.append("search", search)
    formData.append("date", date)
    console.log(formData.get("date"))

    // fetch results

    setLoading(false)
  }

  const HandleCreateTrip = () => {
   
    // create trip
    navigate("/create-trip", {state: {date: date}})
  }

  return (
    <div

      onKeyDown={(e) => e.key === "Enter" && handleSearchInput()}
      className=" overflow-hidden flex flex-col items-center justify-center p-4"
    >
      <div
        className=' flex flex-row w-full md:w-[750px] gap-2 items-center overflow-hidden h-[60px] justify-center '
      >

        {/* select date */}
        <div
          className="flex justify-center items-center border h-full border-border rounded-[30px] px-4 py-2 "
        >
          <input
            type="date"
            placeholder="Date"
            value={date}

            onChange={(e) => setDate(e.target.value)}
            className=" text-lightText w-10 md:w-fit "
          />
        </div>

        {/* search bar */}
        <div
          className="flex h-full w-full flex-col"
        >
          <input type="text"
            className=" w-full outline-border placeholder:font-semibold h-full rounded-[30px] border border-border px-4 md:px-8 py-2"
            placeholder="Search for trips"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* search button */}
        <button
          onClick={() => handleSearchInput()}
          className=" rounded-[30px] px-4 py-2 font-bold border border-border hover:opacity-50 duration-200 cursor-pointer h-full aspect-square "
        >
          🔍
        </button>
      </div>

      {/* search results */}
      {showResults && search && <SearchResults
        results={results}
        HandleCreateTrip={HandleCreateTrip}
      />}
    </div>
  )
}

const SearchResults = ({ results, HandleCreateTrip }) => {

  const [loading, setLoading] = useState(results.length === 0 ? true : false)
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])


  return (
    <div
      className="flex flex-col mt-4 p-4 gap-2 md:gap-4 items-center justify-center rounded-[30px] w-full md:w-[750px] border border-lightBorder "
    >
      { !loading &&
      <div
        className="flex gap-1 md:gap-2 items-center justify-center w-full "
      >
        <span
          className=" text-xs md:text-sm "
        >
          Did'nt find any?
        </span>
        <div
          onClick={() => HandleCreateTrip()}
          className="font-semibold cursor-pointer bg-[#7aff7a] p-1 px-2 rounded-full hover:opacity-50 duration-200 text-xs md:text-sm"
        >
          create your own trip
        </div>
      </div>
}

      {/* results */}

      <div>
        {loading ? (
          <div
          className="flex flex-col items-center justify-center gap-2"
          >
          <div
            className="animate-spin rounded-full h-10 w-10 border-t-2 border-l-2  border-border"
          />
          </div>
        ) : results.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center gap-2"
          >
            <h1
              className=" text-sm md:text-base font-semibold"
            >
              No results found
            </h1>
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center gap-2"
          >
            {results.map((result, index) => (console.log(result)))}
          </div>
        )}
      </div>

    </div>
  )
}

export default SearchBar