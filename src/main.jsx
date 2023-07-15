import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { Provider } from "react-redux"
import store from "./redux/store"
import "./index.css"
import { FirebaseProvider } from "./firebase"

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </Provider>
)
