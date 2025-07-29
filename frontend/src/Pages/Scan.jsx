import React ,{useEffect} from 'react'
import '../Styles/Scan.css'
import { useNavigate } from 'react-router-dom';
import Dropzone from '../Components/Dropzone/Dropzone.jsx'
import Navbar from '../Components/Navbar/Navbar.jsx'
import axios from 'axios';


const Scan = () => {
    const navigate = useNavigate();

    const [imageFile, setImageFile] = React.useState(null);
    const [isScanning, setIsScanning] = React.useState(false);
    const [previewUrl, setPreviewUrl] = React.useState(null);
    const [response, setResponse] = React.useState(null);

     const handleScan = async () => {
    if (!imageFile) return;
    setIsScanning(true);

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const res = await axios.post('http://127.0.0.1:5001/api/scan', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setResponse(res.data);

      //alert(res.data?.name ? `Match Found: ${res.data.name}` : 'No match found.');
    } catch (err) {
      alert('Error while scanning.');
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  useEffect(() => {
    if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl); // Cleanup
    }
  }, [imageFile]);

  return (
    <>

        <section id='scan-page'>
            <Navbar/>
            <div id="scan-container">
                <div id="scan-left">
                    <h1>Found someone missing ?</h1>
                    <p>Please upload a clear photograph of the missing individual. Our intelligent system will immediately begin scanning our database using advanced face recognition technology to identify any potential matches. If a match is found, you will receive an instant notification, allowing for prompt action. In the event that no match is detected, the case will be securely added to our ‘Missing’ section, where it will remain visible to the public. This ensures that citizens, volunteers, and organizations browsing our platform can assist in identifying and locating the individual, significantly increasing the chances of a successful recovery</p>
                    
                </div>
                <div id="scan-right">
  {!imageFile ? (
    <Dropzone
      label="Drag and drop an image here"
      name="imageFile"
      setImageFile={setImageFile}
    />
  ) : isScanning ? (
    <>
      <img src={previewUrl} alt="Selected" id="uploaded-image" />
      <div className="scanning-line"></div>
    </>
  ) : response ? (
    response.name ? (
      <div className="scan-result found">
        <h2>✅ Match Found!</h2>
        <p><strong>Name :</strong> {response.name}</p>
        <p><strong>Similarity:</strong> {(response.similarity * 100).toFixed(2)}%</p>
        <p><strong>Age: </strong>{response.age}</p>
        <p><strong>Gender: </strong>{response.gender}</p>
        <p><strong>Last Seen: </strong>{response.last_seen}</p>
        <p><strong>Location: </strong>{response.location}</p>
        <p><strong>Mobile: </strong>{response.mobile}</p>
        <p><strong>Email: </strong>{response.email}</p>
      </div>
    ) : (
      <div className="scan-result not-found">
        <img src={previewUrl} alt="Selected" id="uploaded-image" />
        <h2>❌ No Match Found</h2>
        <p>The person will be added to the Missing section.</p>
      </div>
    )
  ) : (
    <>
      <img src={previewUrl} alt="Selected" id="uploaded-image" />
      <button id="scan-btn" onClick={handleScan} disabled={isScanning}>
        {isScanning ? 'Scanning...' : 'Scan'}
      </button>
    </>
  )}
</div>

            </div>
        </section>

 
    </>
  )
}

export default Scan