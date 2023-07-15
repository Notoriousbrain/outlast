import React from 'react'
import { useEffect, useState } from 'react'

const NavBar = ({ profile }) => {

    const [enable, setEnable] = useState(false)

    useEffect(() => {
        setEnable( window.location.pathname === "/" ? false : true)
    }, [ window.location.pathname])

    return (
        <div
            className={" flex p-4 text-text " 
            + (enable && " flex ")
        }
        >
            <div
                className="flex justify-between flex-row border p-4 border-border h-full w-full flex-1 items-center rounded-full  "
            >
                {/* logo */}

                <div
                    className="flex flex-row items-center"
                >
                    {/* <img
                        className="h-10 w-10 rounded-full object-cover hover:opacity-50 cursor-pointer duration-200 "
                        src="https://api.multiavatar.com/unknown.svg"
                        alt="logo"
                    /> */}
                    <h1
                        className="text-2xl font-bold ml-4 duration-200 hover:blur-[1px] cursor-pointer"
                    >
                        OutLast  
                    </h1>
                </div>

                {/* search */}

                {/* profile */}
                <div
                    className="flex flex-row items-center"
                >
                    <img
                        className="h-10 w-10 rounded-full object-cover hover:blur-[1px] cursor-pointer duration-200 "
                        src={profile ? profile.profilePicture : "https://api.multiavatar.com/unknown.svg"}
                        alt="profile"
                    />
                </div>
            </div>
        </div>
    )
}

export default NavBar