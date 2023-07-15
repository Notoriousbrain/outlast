import React from 'react'
import { useRef, useState } from 'react'

const SuggestionCarousel = () => {

    const [suggestions, setSuggestions] = useState([1,2,3,4,5,6])

    const carouselRef = useRef(null)

    const handleprev = () => {
        carouselRef.current.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
    }

    const handlenext = () => {
        carouselRef.current.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
    }

  return (
    <div
        className="flex flex-col justify-center carousel md:mt-0 mt-2 relative "
        >
        <div
        ref={carouselRef}
            className="flex flex-row relative gap-4 px-4 snap-x overflow-x-scroll scrollbar-none  "
        >

        {
            suggestions.map((suggestion, index) => (
                <Card
                    key={index}
                    img="https://images.unsplash.com/photo-1689240639845-037ff7f885db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80"
                    title="username"
                    subtitle="subtitle"
                />
            ))
        }
        </div>

            <button
                className="bg-[#ffffffaa] absolute font-bold text-2xl md:left-16 rounded-full border border-border left-8 md:h-10 h-8 w-8 z-20 md:w-10 text-text hover:opacity-50 cursor-pointer duration-200 "
                onClick={handleprev}
            >
                {'<'}
            </button>
            <button
                className="bg-[#ffffffaa] rounded-full font-bold text-2xl absolute right-8 border border-border md:right-16 md:h-10 h-8 w-8 z-20 md:w-10 text-text hover:opacity-50 cursor-pointer duration-200 "
                onClick={handlenext}
            >
                {'>'}
            </button>
            <div
                className=" absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#ffffff] to-transparent "
            />
            <div
                className=" absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#ffffff] to-transparent "
            />

    </div>
  )
}

const Card = ({ img, title, subtitle }) => {

    return (
    <div
        className="flex flex-col rounded-[30px] border border-border p-2 md:p-4 justify-center hover:opacity-50 cursor-pointer duration-200 "
    >
        <div
            className=' relative h-[150px] w-[200px] md:h-[200px] md:w-[300px] flex justify-center items-center rounded-[28px] overflow-hidden '
        >
        <img
            className=" object-cover rounded-[10px] hover:blur-[1px] cursor-pointer duration-200 "
            src={img}
        />
        <h1
            className=" absolute bg-[#efefef33] text-base backdrop-blur-[2px] p-1 px-3 rounded-full left-2 bottom-2 text-white font-semibold md:text-lg "
        >
            {title}
        </h1>
        </div>
        <h1
            className=" text-lightText text-sm ml-3 mt-2 md:text-base  "
        >
            {subtitle}
        </h1>
    </div>
    )
}

export default SuggestionCarousel