import React from 'react';
import './App.css';
import Route from "./routes"
import Header from "./components/header"
import { BrowserRouter} from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
        <Header />
        <Route />
    </BrowserRouter>
  )
}

export default App;
