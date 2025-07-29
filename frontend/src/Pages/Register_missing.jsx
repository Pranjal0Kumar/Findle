import React from 'react'
import '../Styles/Register_missing.css'
import {useNavigate} from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar.jsx'
import Dropzone from '../Components/Dropzone/Dropzone.jsx'
import axios from 'axios';

const Register_missing = () => {
    const navigate = useNavigate();
    const [imageFile, setImageFile] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e) => {

    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('name', e.target.name.value);
    formData.append('age', e.target.age.value);
    formData.append('gender', e.target.gender.value);
    formData.append('last_seen', e.target.last_seen.value);
    formData.append('location', e.target.location.value);
    formData.append('description', e.target.description.value);
    formData.append('image', imageFile);
    formData.append('mobile', e.target.mobile.value);
    formData.append('email', e.target.email.value);



    axios.post('http://127.0.0.1:5001/api/register-missing',formData,{
      headers: {
        'Content-Type': 'multipart/form-data'},
        responseType:'blob'
    })
    .then(response => {
      const blob = response.data
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.download = 'missing_poster.jpg';
      a.href = url;
      a.click();
      window.URL.revokeObjectURL(url);


      setImageFile(false);

      console.log('Missing person registered successfully:', response.data);
      alert('Missing person registered successfully!');

      navigate('/');

    })
  }
  return (
    <>
        {loading?(
          <div className="loading-screen">
            <h2>Processing your request...</h2>
            <div className="loader"></div> {/* Add CSS spinner here */}
          </div>
        ):(
          <>
            <Navbar/>
            <div className="miss-register-form" >
                <h1>Enter The Details Below</h1>
                <form method='POST' onSubmit={handleSubmit}>
                    <input type="text" name='name' placeholder='Enter their name' className='inp-miss' /> 
                    <input type="text" name='age' className='inp-miss' placeholder='Enter their age'/>
                    <select id="gender" name="gender">
                        <option value="" disabled selected>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <input type="datetime" name="last_seen" className='inp-miss' placeholder='Enter When you saw them last'/>
                    <input type="text" name="location" className='inp-miss' placeholder='Enter their last known location'/>
                    <input type="text" name="description" className='inp-miss' placeholder='Enter their description'/>
                    <input type="text" name='mobile' className='inp-miss' placeholder='Enter your mobile'/>
                    <input type="email" name='email'className='inp-miss' placeholder='Enter your Email'/>
                    <div id="form-center">
                    <Dropzone label={'Upload Image'} setImageFile={setImageFile} name={'image'}/>

                    <input type="submit" value="Submit" className='submit-btn'/>
                    </div>

                    
                </form>
            </div>
          </>
        )}
    </>
  )
}

export default Register_missing