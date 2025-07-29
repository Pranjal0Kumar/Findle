import React, { useRef, useEffect, useState } from 'react';
import '../Styles/Camera_scan.css'
import Webcam from "react-webcam";
import { io } from "socket.io-client";
import axios from 'axios'
const now = new Date();
const formattedDate = now.toLocaleString(); // e.g., "28/07/2025, 8:22:13 pm"


const socket = io('http://localhost:5001', {
  transports: ['websocket', 'polling'],
});

export default function LiveScanner() {
  const webcamRef = useRef(null);
  const [result,setResult] = useState(null)
  const[scanning,setScanning] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      captureAndSendFrame();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

const captureAndSendFrame = () => {
  if (webcamRef.current) {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      socket.emit('frame', { image: imageSrc });
    } else {
      console.log("getScreenshot returned null");
    }
  } else {
    console.log("Webcam ref is null");
  }
};

  useEffect(() => {
    socket.on('scan_result', (data) => {
      
      if (data.match) {
        setResult(data);
        
        
axios.post('http://127.0.0.1:5001/mail', {
  to: data.email,
  body: `Hi ${data.name}, your scan matched with our records and was found by your device's camera at ${formattedDate}`,
  name: data.name
}, {
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(res => console.log('Email sent!'))
.catch(err => console.error('Failed:', err));
        setScanning('Scanned')
      }
    });
  }, []);

  return (
    <div id='camera_video'>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: "user" }}
        autoPlay
        muted
        playsInline
      />
      <div id="results">
        <h1>Name : {result ? result.name : "Scanning..."}</h1>
        <h3>Gender : {result ? result.gender : "Scanning..."}</h3>
        <h3>Age : {result ? result.age : "Scanning..."}</h3>
        <h3>Mobile : {result ? result.mobile : "Scanning..."}</h3>
        <h3>Email : {result ? result.email : "Scanning..."}</h3>
      </div>
    </div>
  );
}
