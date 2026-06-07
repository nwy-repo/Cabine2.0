import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from "./Header.jsx"
import Home from './Home.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
