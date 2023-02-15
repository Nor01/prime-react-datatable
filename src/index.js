import React from "react";
import ReactDOM from "react-dom/client"
import App from "./App";
import '../node_modules/primereact/resources/themes/lara-light-indigo/theme.css'
import '../node_modules/primereact/resources/primereact.min.css'
import '../node_modules/primeicons/primeicons.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<App />)