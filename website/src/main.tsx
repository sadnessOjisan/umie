import React from "react";
import ReactDOM from "react-dom/client";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import App from "./app";
import "./mercury.min.css";

const firebaseConfig = {
  apiKey: "AIzaSyBamdEeb3h3eq0NlsqH-TGnMiMabv4L2-E",
  authDomain: "umie-prj.firebaseapp.com",
  projectId: "umie-prj",
  storageBucket: "umie-prj.appspot.com",
  messagingSenderId: "475480462609",
  appId: "1:475480462609:web:56e828b10272b142c7a8b0",
  measurementId: "G-NMHBTCMCSK",
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
