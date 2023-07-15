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
      if (docSnap?.exists()) {
        dispatch(getSingleUser(docSnap.data()))
        setUser(data)
      } else {
        dispatch(getSingleUser(null))
      }
    } else {
      dispatch(getSingleUser(null))
      setUser(null)
    }
  } catch (error) {
    console.log(error, "error")
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
    const res = await getDownloadURL(upload.ref)
    return res
  } catch (error) {
    errorHandler(error)
  }
}

// handle user registration
export async function handleRegistration(profile, data) {
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
        `users/profilePics/${Date.now()}-${data?.profilePic}`
      )
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
  } catch (error) {
    return errorHandler(error)
  }
}

// handle update user data

// handle create trip
export async function handleCreateTrip(profile, data) {
  try {
    console.log('here tak');
    console.log(profile, 'profile');
    if (!profile) {
      return toast.warn("Please login to create a trip")
    }

    console.log(profile, 'profile');
    console.log(data, 'data');

    const tripData = {
      // createdById: profile?.uid,
      // createdByName: profile?.name,    not required actually
      startingFrom: data?.startingFrom, //
      destination: data?.destination, //
      limit: data?.limit, //
      desc: data?.desc, //
      suggestions: data?.suggestion, //
      comments: [],
      participants: [
        {
          name: profile?.name,
          number: profile?.number,
          id: profile?.id,
          avatar: profile?.avatar,
        },
      ],
    }

    const res = await addDoc(collection(db, "trips"), tripData)
    console.log(res, 'res');
    toast.success("Trip Created Successfully.")

    const userRef = doc(db, "users", profile?.uid)
    await updateDoc(userRef, {
      tripIds: [...profile?.tripIds, res.id],
    })

    const tripRef = doc(db, "trips", res.id)
    await updateDoc(tripRef, {
      tripId: res.id,
    })
    console.log('done');
    return
  } catch (error) {
    return errorHandler(error)
  }
}
