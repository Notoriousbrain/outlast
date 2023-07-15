import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const BottomLoginBar = () => {
  const profile = useSelector(state => state.profile)
  console.log(profile)
  const [ display, setDisplay ] = useState(true)
  const navigate = useNavigate()

  return (
    <div

        style={{display: display ? "flex" : "none"}}
        className="flex flex-row h-[64px] items-center p-2 gap-2 md:gap-20 justify-center bg-[#ff9c3f] fixed bottom-0 w-full "
    >
      
        <div
            className="flex relative flex-col pl-10"
        >
            <div
                onClick={() => setDisplay(false)}
                className="absolute top-0 bottom-0 left-0 flex items-center justify-center cursor-pointer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>

            <h1
                className=" font-semibold text-sm md:text-base "
            >
              Don't miss out on the fun!
            </h1>
             <h1
                className=" text-xs md:text-sm"
             >
              Sign up to go on trips with strangers
             </h1>
        </div>
        <div
            className="flex flex-row text-xs md:text-sm items-center justify-center gap-2"
        >
            <h1
                onClick={() => navigate("/login")}
                className="text-center font-bold px-4 py-2 rounded-full border border-border hover:opacity-50 duration-200 cursor-pointer"
            >
                Login
            </h1>
            <h1
                onClick={() => navigate("/signup")}
                className="text-center font-bold px-4 py-2 rounded-full border border-border hover:opacity-50 duration-200 cursor-pointer"
            >
                SignUp
            </h1>
        </div>
    </div>
  )
}

export default BottomLoginBar