import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from "./Header.jsx"
import Home from './Home.jsx'
import Orange from './Orange.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Orange' element={<Orange/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
