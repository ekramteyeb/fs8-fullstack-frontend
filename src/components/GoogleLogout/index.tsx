import React from 'react';
import { GoogleLogout } from 'react-google-login';

import './style.scss'

function Logout() {
  const clientId : any = '515353806091-61sk3rjrksrenpccphupbd440fu2b8aq.apps.googleusercontent.com'
  const onSuccess = () => {
    console.log('Logout made successfully');
    alert('Logout made successfully ✌');
    localStorage.setItem('loggedinUser', JSON.stringify({email:'',id:''}))
    localStorage.setItem('toktok', JSON.stringify(''))
    window.location.replace('/')

  };

  return (
    <div className='logout'>
      <GoogleLogout
        clientId={clientId}
        buttonText='Logout'
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;