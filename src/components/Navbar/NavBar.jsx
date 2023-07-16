import React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ProfileModal from "../Profile/ProfileModal"

const NavBar = ({ profile }) => {
  const navigate = useNavigate()
  const [profileModal, setProfileModal] = useState(false)
  const [mode, setMode] = useState("")

  const handleOpenModel = (thisMode) => {
    setMode(thisMode)
    setProfileModal(!profileModal)
  }

  return (
    <div className={" flex p-2 md:p-4 text-text "}>
      {/* profile modal */}
      {profileModal && (
        <ProfileModal
          mode={mode}
          profile={profile}
          setProfileModal={setProfileModal}
        />
      )}

      <div className="flex justify-between flex-row border p-1 md:p-4 border-border h-full w-full flex-1 items-center rounded-full  ">
        {/* logo */}

        <div className="flex flex-row items-center">
          <h1
            onClick={() => navigate("/")}
            className=" text-xl md:text-2xl font-bold ml-2 md:ml-4 duration-200 hover:blur-[1px] cursor-pointer"
          >
            OutLast
          </h1>
        </div>

        {/* search */}

        {/* profile */}
        <div className="flex flex-row gap-2 md:gap-4 items-center">
          <h1
            onClick={() => navigate("/about-us")}
            className=" border border-lightBorder p-2 md:hover:px-6  rounded-full px-4 font-bold duration-200 hover:blur-[1px] cursor-pointer hidden md:block"
          >
            About
          </h1>
          <h1
            onClick={() =>
              profile ? navigate("/create-trip") : navigate("/login")
            }
            className=" border border-lightBorder p-2 md:hover:px-6  rounded-full px-4 font-bold duration-200 hover:blur-[1px] cursor-pointer"
          >
            Create Trip
          </h1>
          <h1
            onClick={() =>
              profile ? handleOpenModel("update") : navigate("/login")
            }
            className=" border border-lightBorder p-2 md:hover:px-6  rounded-full px-4 font-bold duration-200 hover:blur-[1px] cursor-pointer"
          >
            {profile ? profile.name : "Login"}
          </h1>

          <img
            onClick={() =>
              profile ? handleOpenModel("signout") : navigate("/login")
            }
            className="h-10 w-10 rounded-full object-cover hover:blur-[1px] cursor-pointer duration-200 "
            src={
              profile?.avatar
                ? profile?.avatar
                : "https://api.multiavatar.com/unknown.svg"
            }
            alt="profile"
          />
        </div>
      </div>
    </div>
  );
}

export default NavBar
