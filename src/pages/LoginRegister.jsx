import React, { useEffect, useState } from "react"
import { Router, useNavigate } from "react-router-dom"
import { useFirebase } from "../firebase"

const LoginRegister = () => {
  const [login, setLogin] = useState(true)
  const [fieldEmpty, setFieldEmpty] = useState(false)
  const [seePassword, setSeePassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const firebase = useFirebase()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [profilePicture, setProfilePicture] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  useEffect(() => {
    window.location.pathname === "/login" ? setLogin(true) : setLogin(false)
  }, [])

  const handleLogin = () => {
    if (email === "" || password === "") {
      setFieldEmpty(true)
      return
    } else {
      setFieldEmpty(false)
    }

    firebase.signInUserUsingEmailAndPassword({ email, password })
    navigate("/")
  }

  const handleRegister = () => {
    if (email === "" || password === "" || name === "" || phoneNumber === "") {
      setFieldEmpty(true)
      return
    } else {
      setFieldEmpty(false)
    }

    firebase.signUpUserUsingEmailAndPassword({
      email,
      password,
      name,
      number: phoneNumber,
      profilePic: profilePicture,
    })
    navigate("/")
  }

  return (
    <div className=" bg-primary min-h-screen flex flex-col text-text justify-center items-center  ">
      <div className="flex flex-col gap-2 w-[300px]  ">
        <div className="flex flex-col gap-2 w-full ">
          <h1 className=" flex flex-col text-2xl font-semibold mb-2 w-full">
            {login ? "Login" : "Register"}
            <span className=" text-sm font-light mt-2 text-red-500">
              {fieldEmpty && " Please fill in all fields"}
            </span>
          </h1>
          {!login && (
            <>
              <div className=" w-full flex justify-center items-center gap-2">
                <img
                  src={
                    profilePicture
                      ? URL.createObjectURL(profilePicture)
                      : "https://api.multiavatar.com/unknown.svg"
                  }
                  alt="profile"
                  className=" h-10 w-10 rounded-full object-cover"
                />
                <input
                  type="file"
                  className={
                    " pl-6 w-full file:border-none box file:text-sm font-light file:font-bold text-sm file:text-[#ffffff] file:bg-black file:rounded-full file:px-4 file:py-2 file:cursor-pointer file:mr-6 flex-shrink "
                  }
                  // placeholder="Profile Picture"
                  onChange={(e) => setProfilePicture(e?.target?.files[0])}
                />
              </div>
              <div className=" w-full ">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  required={true}
                  onChange={(e) => setName(e.target.value)}
                  className=" w-full outline-none placeholder:font-semibold h-full rounded-[30px] border border-border px-8 py-2"
                />
              </div>
              <div className=" w-full ">
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className=" w-full outline-none placeholder:font-semibold h-full rounded-[30px] border border-border px-8 py-2"
                />
              </div>
            </>
          )}
          <div className=" w-full ">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" w-full outline-none placeholder:font-semibold h-full rounded-[30px] border border-border px-8 py-2"
            />
          </div>
          <div className=" w-full relative flex flex-row justify-center items-center gap-2 ">
            <input
              type={seePassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" w-full outline-none placeholder:font-semibold h-full rounded-[30px] border border-border px-8 py-2"
            />
            <span
              onClick={() => setSeePassword(!seePassword)}
              className="text-blue-500 text-sm cursor-pointer w-4 absolute right-4 hover:text-blue-700"
            >
              {!seePassword ? (
                <img
                  srcSet="https://img.icons8.com/?size=512&amp;id=30M9wv1iFkcH&amp;format=png 2x, https://img.icons8.com/?size=512&amp;id=30M9wv1iFkcH&amp;format=png 1x"
                  src={
                    "https://img.icons8.com/?size=512&amp;id=30M9wv1iFkcH&amp;format=png 2x"
                  }
                  alt="Eye icon"
                  width="256"
                  height="256"
                />
              ) : (
                <img
                  srcSet="https://img.icons8.com/?size=512&amp;id=MXjc4q4Ix0cD&amp;format=png 2x, https://img.icons8.com/?size=512&amp;id=MXjc4q4Ix0cD&amp;format=png 1x"
                  src="https://img.icons8.com/?size=512&amp;id=MXjc4q4Ix0cD&amp;format=png 2x"
                  alt="Invisible icon"
                  width="256"
                  height="256"
                />
              )}
            </span>
          </div>
        </div>

        <div className="flex flex-row justify-center items-center gap-2 w-full">
          <span className=" text-sm font-light ">
            {login ? "Don't have an account?" : "Already have an account?"}
          </span>
          <span
            onClick={() => setLogin(!login)}
            className=" font-bold text-sm cursor-pointer hover:opacity-50 duration-200"
          >
            {login ? " Register" : " Login"}
          </span>
        </div>

        <button
          onClick={login ? handleLogin : handleRegister}
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
          ) : login ? (
            "Login"
          ) : (
            "Register"
          )}
        </button>
      </div>
    </div>
  )
}

export default LoginRegister
