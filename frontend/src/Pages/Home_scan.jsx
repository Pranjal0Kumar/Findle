import React from 'react'
import '../Styles/Home_scan.css'
import HomeImage6 from '../assets/home_image6.jpg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home_scan = () => {
    const Navigate = useNavigate();

    const scanMissing = () =>{
        Navigate('/scan-missing')
    }
  return (
    <>
    <section id='scan'>
        <div id="scan-main-container">
            <div id="scan-inner-container">
                <h1>Found someone's <br/><span className='highlight'>Missing Peace?</span></h1>
                <button id='scan-home-btn' onClick={scanMissing}>Inform Now</button>
            </div>
        </div>
        </section>
    </>
  )
}

export default Home_scan