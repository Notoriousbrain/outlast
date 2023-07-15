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
        className="flex flex-col justify-center carousel relative "
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
                className="bg-[#ffffffaa] absolute left-16 rounded-full h-10 w-10 text-text hover:opacity-50 cursor-pointer duration-200 "
                onClick={handleprev}
            >
                {'<'}
            </button>
            <button
                className="bg-[#ffffffaa] rounded-full absolute right-16 h-10 w-10 text-text hover:opacity-50 cursor-pointer duration-200 "
                onClick={handlenext}
            >
                {'>'}
            </button>
            <div
                className=" absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-primary to-transparent "
            />
            <div
                className=" absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-primary to-transparent "
            />

    </div>
  )
}

const Card = ({ img, title, subtitle }) => {

    return (
    <div
        className="flex flex-col rounded-[30px] border border-border p-4 justify-center hover:opacity-50 cursor-pointer duration-200 "
    >
        <div
            className=' relative h-[200px] w-[300px] flex justify-center items-center rounded-[28px] overflow-hidden '
        >
        <img
            className=" object-cover rounded-[10px] hover:blur-[1px] cursor-pointer duration-200 "
            src={img}
        />
        <h1
            className=" absolute bg-[#efefef33] backdrop-blur-[2px] p-1 px-3 rounded-full left-2 bottom-2 text-white font-semibold text-lg "
        >
            {title}
        </h1>
        </div>
        <h1
            className=" text-lightText ml-3 mt-3 text-base  "
        >
            {subtitle}
        </h1>
    </div>
    )
}

export default SuggestionCarousel