import React from "react"
import LOADER from "../assets/loader.svg"

const Loader = () => {
  return (
    <div className="fixed inset-0 z-10 h-screen bg-my-light dark:bg-my-dark flex items-center justify-center flex-col">
      <img
        src={LOADER}
        alt="loader"
        className="w-[100px]  h-[100px] object-contain"
      />
      <p className="mt-[20px] font-hel text-4xl text-violet-600 font-bold text-center">
        Vibing...
      </p>
    </div>
  )
}

export default Loader
