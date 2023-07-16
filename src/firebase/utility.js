import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import imageCompression from "browser-image-compression"
import { auth, db, storage } from "./config"
import { toast } from "react-toastify"
import { errorHandler } from "./authErrors"
import { getSingleUser } from "../redux/actions"

export async function handleAuthStateChange(data, dispatch, setUser) {
  try {
    if (data) {
      const docSnap = await getSingleDoc("users", data.uid)
      if (docSnap?.data()) {
        dispatch(getSingleUser(docSnap?.data()))
        setUser(docSnap?.data())
      } else {
        dispatch(getSingleUser(null))
      }
    } else {
      dispatch(getSingleUser(null))
      setUser(null)
    }
  } catch (error) {
    return errorHandler(error)
  }
}

// returns instance of a single document
export async function getSingleDoc(coll, id) {
  try {
    const docRef = doc(db, coll, id)
    const docSnap = await getDoc(docRef)
    return docSnap
  } catch (error) {
    errorHandler(error)
  }
}

// returns snap array of any operation in a document
export async function getSnapOfDocs(coll, key, operation, value) {
  try {
    const ref = collection(db, coll)
    const q = query(ref, where(key, operation, value))
    const snap = await getDocs(q)
    return snap
  } catch (error) {
    errorHandler(error)
  }
}

// returns url for a provided image file
export async function handleUploadImage(file, location) {
  try {
    const compressImage = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      maxIteration: 10,
      fileType: "image/*",
    })
    const imgRef = ref(storage, location)
    const upload = await uploadBytes(imgRef, compressImage)
    const res = await getDownloadURL(upload?.ref)
    return res
  } catch (error) {
    errorHandler(error)
  }
}

// handle user registration
export async function handleRegistration(dispatch, profile, data) {
  try {
    if (profile) {
      return toast.info(
        "You are already signed in, try logging out before signing up a new user"
      )
    }
    const snap = await getSnapOfDocs("users", "email", "==", data?.email)
    if (!snap.empty) {
      return toast.info(
        "Your account is already registered, please try logging in."
      )
    }
    const res = await createUserWithEmailAndPassword(
      auth,
      data?.email,
      data?.password
    )
    let profilePicUrl = ""
    if (data?.profilePic && data?.profilePic !== "") {
      profilePicUrl = await handleUploadImage(
        data?.profilePic,
        `users/profilePics/${Date.now()}-${data?.profilePic?.name}`
      )
    } else {
      profilePicUrl = `https://api.multiavatar.com/${data?.name}.svg`
    }
    await setDoc(doc(db, "users", res.user.uid), {
      email: data?.email,
      name: data?.name,
      number: data?.number,
      avatar: profilePicUrl,
      loginAt: Date.now(),
      uid: res.user.uid,
      tripIds: [],
    })

    const newUserData = await getSingleDoc("users", res?.user?.uid)
    console.log(newUserData, "new user data")
    dispatch(getSingleUser(newUserData.data()))
    return
  } catch (error) {
    return errorHandler(error)
  }
}

// handle user sign in
export async function handleSignIn(profile, data) {
  try {
    if (profile) {
      return toast.info("You are already signed in, try logging out first")
    }
    const snap = await getSnapOfDocs("users", "email", "==", data?.email)
    if (snap.empty) {
      return toast.warn(
        "Your account is not registered, please register yourself."
      )
    }
    await signInWithEmailAndPassword(auth, data?.email, data?.password)
    return
  } catch (error) {
    return errorHandler(error)
  }
}

// handle user sign out
export async function hanldeSignOut(profile) {
  try {
    if (!profile) {
      return toast.warn("You are already signed out")
    } else {
      await signOut(auth)
    }
    if (profile !== "forced signout") toast.success("Signed out successfully.")
    return
  } catch (error) {
    return errorHandler(error)
  }
}

// handle update user data
export async function handleUpdateUserData(dispatch, profile, data) {
  try {
    if (!profile) {
      return toast.warn("Please login to update your profile")
    }
    let profilePicUrl = ""
    if (data?.profilePic && data?.profilePic !== "") {
      profilePicUrl = await handleUploadImage(
        data?.profilePic,
        `users/profilePics/${Date.now()}-${data?.profilePic?.name}`
      )
    } else {
      profilePicUrl = `https://api.multiavatar.com/${data?.name}.svg`
    }
    const userData = {
      name: data?.name,
      number: data?.number,
      avatar: profilePicUrl,
    }
    const userRef = doc(db, "users", profile?.uid)
    await updateDoc(userRef, userData)
    const newUserData = await getSingleDoc("users", profile?.uid)
    dispatch(getSingleUser(newUserData.data()))
    return
  } catch (error) {
    return errorHandler(error)
  }
}

// handle create trip
export async function handleCreateTrip(dispatch, profile, data) {
  try {
    if (!profile) {
      return toast.warn("Please login to create a trip")
    }
    const tripData = {
      tripName: data?.tripName,
      startingFrom: data?.startingFrom,
      destination: data?.destination,
      nearbyStops: data?.nearbyStops,
      endsOn: data?.endsOn,
      limit: data?.limit,
      desc: data?.desc,
      suggestions: data?.suggestion,
      image: "",
      comments: [],
      participants: [
        {
          name: profile?.name,
          number: profile?.number,
          id: profile?.uid,
          avatar: profile?.avatar,
        },
      ],
    }
    const res = await addDoc(collection(db, "trips"), tripData)
    toast.success("Trip Created Successfully.")
    const userRef = doc(db, "users", profile?.uid)
    await updateDoc(userRef, {
      tripIds:
        profile?.tripIds.length > 0 ? [...profile?.tripIds, res.id] : [res.id],
    })
    const tripRef = doc(db, "trips", res.id)
    await updateDoc(tripRef, {
      tripId: res.id,
    })
    const newUserData = await getSingleDoc("users", profile?.uid)
    dispatch(getSingleUser(newUserData.data()))
    return
  } catch (error) {
    return errorHandler(error)
  }
}

// handle update trip data
export async function handleUpdateTripData(profile, tripId, data) {
  try {
    if (!profile) {
      return toast.warn("Please login to update your profile")
    }
    const tripRef = doc(db, "trips", tripId)
    await updateDoc(tripRef, data)
    return
  } catch (error) {
    return errorHandler(error)
  }
}

// handle join trip
export async function handleJoinTrip(dispatch, profile, trip) {
  try {
    if (!profile) {
      return toast.warn("Please login to update your profile")
    }
    if (trip?.participants[0]?.id === profile?.uid) {
      return toast.warn(
        "You are the owner of this trip, as such you are already a member"
      )
    }

    for (const singleTrip of profile?.tripIds) {
      if (singleTrip === trip?.tripId) {
        return toast.warn("You are already a member")
      }
    }

    const prevParticipants = trip?.participants
    const updatedParticipants = [
      ...prevParticipants,
      {
        name: profile?.name,
        number: profile?.number,
        id: profile?.uid,
        avatar: profile?.avatar,
      },
    ]

    const tripRef = doc(db, "trips", trip?.tripId)
    await updateDoc(tripRef, {
      participants: updatedParticipants,
    })

    const userRef = doc(db, "users", profile?.uid)
    await updateDoc(userRef, {
      tripIds:
        profile?.tripIds.length > 0
          ? [...profile?.tripIds, trip?.tripId]
          : [trip?.tripId],
    })
    const newUserData = await getSingleDoc("users", profile?.uid)
    dispatch(getSingleUser(newUserData.data()))
    return
  } catch (error) {
    return errorHandler(error)
  }
}

// handle comment on trip
export async function handleCommentOnTrip(profile, trip, comment) {
  try {
    if (!profile) {
      return toast.warn("Please login to update your profile")
    }
    const prevComments = trip?.comments
    const updatedComments =
      prevComments?.length > 0
        ? [
            ...prevComments,
            { userId: profile?.uid, userName: profile?.name, comment },
          ]
        : [{ userId: profile?.uid, userName: profile?.name, comment }]

    const tripRef = doc(db, "trips", trip?.tripId)
    await updateDoc(tripRef, {
      comments: updatedComments,
    })
    return
  } catch (error) {
    return errorHandler(error)
  }
}
