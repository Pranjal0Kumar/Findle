import React , {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Dropzone from '../Components/Dropzone/Dropzone.jsx';
import '../Styles/Home.css'
import HomeImage1 from '../assets/home_page1.jpg'
import HomeImage2 from '../assets/home_image2.jpg'
import HomeImage3 from '../assets/home_page3.jpg'
import HomeImage4 from '../assets/home_image4.jpg'
import HomeImage5 from '../assets/home_image5.jpg'
import HomeImage6 from '../assets/home_image6.jpg'
import Camera_scan from './Camera_scan.jsx';
import Home_scan from '../Pages/Home_scan.jsx'






const Home = () => {
    const navigate = useNavigate();

    const Register_missing = () =>{
        navigate('/register-missing');
    }

      const device_camera = () =>{
        navigate('/device-camera');
      }
      const cctv_scan = () =>{
        navigate('/cctv-scan');
      }
       

    
  return (
    <>
    <section id='home'>
        <nav>
            <div id="logo">Findle</div>
            <div id="nav-opt">
                <i>Home</i>
                <i>Scan</i>
                <i>Camera Acess</i>
                <i>Connect</i>
            </div>
        </nav>
        <div id="main-container">
            <div id="inner-container">
                <h1>Helping you find the <br/><span className='highlight'>Missing Peace</span></h1>
                <button id='home-btn' onClick={Register_missing}>Compliant Lost</button>
            </div>
            <div id="image-container">
                <img src={HomeImage6} alt="" />
            </div>
        </div>

        </section>
        <Home_scan/>

            <section id='camera_home'>
            <div className="camera-home-container">
                <h1>
                  Want us to keep tracking your wanted location to scan for missing person?
                </h1>
                <p>
                  If you want us to keep tracking your wanted location to scan for missing person, please click the button below.
                  </p>
                  <div className="camera_home_btn">
                    <button id="device-camera-btn" onClick={device_camera}>Device's Camera</button>
                  <button is='cctv-scan-btn' onClick={cctv_scan}>CCTV Scan</button>
                  </div>
                
            </div>
        </section>
        
    </>
    
  )
}

export default Home