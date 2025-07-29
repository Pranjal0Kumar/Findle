import React from 'react'
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Register_missing from './Pages/Register_missing.jsx'
import Home_scan from './Pages/Home_scan.jsx'
import Scan from './Pages/Scan.jsx'
import Device_Scan from '../src/Pages/Camera_scan.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register-missing' element={<Register_missing/>}/>
        <Route path='/scan-missing' element={<Scan/>}/>
        <Route path='/device-camera' element={<Device_Scan/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App