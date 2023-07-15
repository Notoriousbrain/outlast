import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const ENV = import.meta.env

const config = {
  apiKey: ENV.VITE_APIKEY,
  authDomain: ENV.VITE_AUTHDOMAIN,
  projectId: ENV.VITE_PROJECTID,
  storageBucket: ENV.VITE_STORAGEBUCKET,
  messagingSenderId: ENV.VITE_MESSAGINGSENDERID,
  appId: ENV.VITE_APPID,
}

export const app = initializeApp(config)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
