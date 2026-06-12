import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from "./Header.jsx"
import Home from './Home.jsx'
import Orange from './Orange.jsx'
import Internet from './Internet.jsx'
import Contact from './Contact.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Orange' element={<Orange/>} />
          <Route path='/Achat-pass' element={<Internet/>} />
          <Route path='/Contact' element={<Contact/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
