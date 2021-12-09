import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { GoogleLogin } from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import { refreshTokenSetup } from '../../utils/refreshTokenSetup'
import { addUser } from '../../redux/actions'

import './style.scss'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const clientId : any = '515353806091-61sk3rjrksrenpccphupbd440fu2b8aq.apps.googleusercontent.com'
  
  const onSuccess = async (response: any) => {
    console.log('Login Success: currentUser:', response);
    let res = await axios.post(
      'http://localhost:3001/google',
      {id_token:response.tokenObj.id_token}
    )
    refreshTokenSetup(response);
    //set the state
    const loggedinUser = {...res.data.user, googleId : response.googleId, token : response.tokenObj.id_token}
    dispatch(addUser(loggedinUser))
    console.log('loggedinUser in State', loggedinUser)
    localStorage.setItem('loggedinUser', JSON.stringify(loggedinUser))
    window.location.replace('/')
    setTimeout(() => navigate('/'), 2000)
    
  }

  const onFailure = (res:any) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login.Please try again`
    );
  };

  return (
    <div className='login'>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login using your google acount"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;