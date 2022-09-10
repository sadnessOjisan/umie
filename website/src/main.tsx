import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import init, {dummy_for_test_calling_wasm} from './pkg/wasm'

const firebaseConfig = {
  apiKey: "AIzaSyBamdEeb3h3eq0NlsqH-TGnMiMabv4L2-E",
  authDomain: "umie-prj.firebaseapp.com",
  projectId: "umie-prj",
  storageBucket: "umie-prj.appspot.com",
  messagingSenderId: "475480462609",
  appId: "1:475480462609:web:56e828b10272b142c7a8b0",
  measurementId: "G-NMHBTCMCSK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

await init()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {dummy_for_test_calling_wasm()}
    <App />
  </React.StrictMode>
)
