import React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useFirebase } from "../../firebase"

const ProfileModal = ({ profile, setProfileModal, mode }) => {
  const [fieldEmpty, setFieldEmpty] = useState(false)
  const [seePassword, setSeePassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const firebase = useFirebase()

  const [email, setEmail] = useState(profile?.email)
  const [name, setName] = useState(profile?.name)
  const [profilePictureForUrl, setProfilePictureForUrl] = useState(
    profile?.avatar
  )
  const [profilePictureForDisplay, setProfilePictureForDisplay] = useState(
    profile?.avatar
  )
  const [phoneNumber, setPhoneNumber] = useState(profile?.number)

  const [update, setUpdate] = useState(false)

  const handleChangeImage = (file) => {
    setProfilePictureForUrl(file)
    setProfilePictureForDisplay(URL.createObjectURL(file))
  }

  const handleSave = () => {
    if (email === "" || name === "" || phoneNumber === "") {
      setFieldEmpty(true)
      return
    } else {
      setFieldEmpty(false)
    }

    const userData = {
      name,
      number: phoneNumber,
      profilePic: profilePictureForUrl,
    }

    firebase.updateUserData(userData)
    setProfileModal(false)
  }

  const handleSignout = () => {
    firebase.signOutUser()
  }

  return (
    <>
      <div
        onClick={() => setProfileModal(false)}
        className="absolute bg-black/30 top-0 bottom-0 left-0 right-0"
      ></div>
      {mode === "update" ? (
        <div className="flex absolute bg-primary right-4 top-[100px] z-[99] p-4 rounded-[30px] border shadow-lg flex-col gap-2 w-[300px]  ">
          <div className="flex flex-col gap-2 w-full">
            <h1 className=" flex flex-col text-2xl font-semibold mb-2 w-full">
              Profile
              <span className=" text-sm font-light mt-0 text-red-500">
                {fieldEmpty && " Please fill in all fields"}
              </span>
            </h1>
            <div className=" w-full flex justify-center items-center gap-2">
              <img
                src={
                  profile?.avatar
                    ? profilePictureForDisplay
                    : "https://api.multiavatar.com/unknown.svg"
                }
                alt="profile"
                className=" h-10 w-10 rounded-full object-cover"
              />

              {update && (
                <input
                  type="file"
                  className={
                    " pl-6 w-full file:border-none box file:text-sm font-light file:font-bold text-sm file:text-[#ffffff] file:bg-black file:rounded-full file:px-4 file:py-2 file:cursor-pointer file:mr-6 flex-shrink "
                  }
                  // placeholder="Profile Picture"
                  onChange={(e) => handleChangeImage(e?.target?.files[0])}
                />
              )}
            </div>
            <div className=" w-full ">
              <input
                type="text"
                placeholder="Name"
                value={name}
                required={true}
                onChange={(e) =>
                  setName(update ? e.target.value : profile?.name)
                }
                className=" w-full outline-none placeholder:font-semibold h-full rounded-[30px] border border-border px-8 py-2"
              />
            </div>
            <div className=" w-full ">
              <input
                type="number"
                placeholder="Phone Number"
                contentEditable={false}
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(update ? e.target.value : profile?.number)
                }
                className=" w-full outline-none placeholder:font-semibold h-full rounded-[30px] border border-border px-8 py-2"
              />
            </div>
            <div className=" w-full ">
              <input
                type="text"
                placeholder="Email"
                contentEditable={false}
                value={email}
                onChange={(e) => setEmail(profile?.email)}
                className=" w-full outline-none placeholder:font-semibold h-full rounded-[30px] border border-border px-8 py-2"
              />
            </div>
          </div>

          {/* <div className="flex flex-row justify-center items-center gap-2 w-full">
                <span
                    onClick={() => setUpdate(!update)}
                    className=" font-bold text-sm cursor-pointer hover:opacity-50 duration-200"
                >
                    {update ? " save" : " update"}
                </span>
            </div> */}

          <button
            onClick={!update ? () => setUpdate(!update) : handleSave}
            className=" rounded-[30px] hover:blur-[1px] flex justify-center items-center p-2 w-full font-bold border border-border hover:opacity-50 duration-200 cursor-pointer h-full "
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            ) : update ? (
              "save"
            ) : (
              "update"
            )}
          </button>
        </div>
      ) : (
        <div className="absolute bg-primary right-4 top-[100px] z-[99] p-4 rounded-[30px] border shadow-lg w-[250px]  ">
          <button
            onClick={handleSignout}
            className=" rounded-[30px] hover:blur-[1px] flex justify-center items-center p-2 w-full font-bold border border-border hover:opacity-50 duration-200 cursor-pointer text-rose-500 h-full "
          >
            Sign Out
          </button>
        </div>
      )}
    </>
  )
}

export default ProfileModal
