import logo from './logo.svg';
import './App.css';
import {GoogleLogin} from 'react-google-login'
import axios from 'axios'
import {  useState} from "react";
import { gapi } from "gapi-script";
import './form.css'

function App() {
  const resposeGoogle = res => {
    console.log(res);
    const { code } = res
    axios
      .post('/api/create-tokens', { code })
      .then(res => {
        console.log(res.data);
        setSignedIn(true)
      })
    .catch(error=>console.log(error.message))
  }
  
  const resposeError = error => {
    console.log(error);
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(summary
    // ,description,startDateTime,endDatetime);
    axios.post('/api/create-event', {
      summary,
      description,
      startDateTime,
      endDatetime,
    })
    .then(res => {
        console.log(res.data);
      })
    .catch(error=>console.log(error.message))
  }
  const [summary, setSummary] = useState('')
  const [description, setDescription] = useState('')
  const [startDateTime, setStartDateTime] = useState('')
  const [endDatetime, setendDatetime] = useState('')
  const [signedIn, setSignedIn] = useState(false)

  
  return (
    <div>
      <div className="App">
        <h1>Google calender</h1>
      </div>
      {
        !signedIn? (<div style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}>
        <GoogleLogin 
          clientId='307616713274-4pmphkla4ngs6g686kn8gqph8049svmu.apps.googleusercontent.com'
          buttonText='Sign in'
          onSuccess={resposeGoogle}
          onFailure={resposeError}
          cookiePolicy={'single_host_origin'}
          responseType='code'
          accessType='offline'
          scope='openid email profile https://www.googleapis.com/auth/calendar'
        />
      </div>) : (<div style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}>
        <form onSubmit={handleSubmit}>
          <label htmlFor='summary'>Summary</label>
          <br />
          <input
            type="text"
            id="summary"
            value={summary}
            onChange={e => setSummary(e.target.value)}
          />
          <br />
          
          <label htmlFor='description'>Description</label>
          <br />
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <br />
          
          <label htmlFor='startDateTime'>Start Date Time</label>
          <br />
          <input
            type='datetime-local'
            id="startDateTime"
            value={startDateTime}
            onChange={e => setStartDateTime(e.target.value)}
          />
          <br />
          
          <label htmlFor='endDateTime'>End Date Time</label>
          <br />
          <input
            type='datetime-local'
            id="endDateTime"
            value={endDatetime}
            onChange={e => setendDatetime(e.target.value)}
          />
          <br />
          <button type='submit'>create event</button>
          
        </form>
      </div>)
      }
    </div>
  );
}

export default App;
