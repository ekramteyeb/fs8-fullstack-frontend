import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct } from '../../redux/actions';
import { AppState } from '../../types';

import './style.scss'

function Logout() {
  const clientId : any = '515353806091-61sk3rjrksrenpccphupbd440fu2b8aq.apps.googleusercontent.com'
  const dispatch = useDispatch()
  const products = useSelector((state:AppState) => state.product.inCart)
  const onSuccess = () => {
    alert('Logout made successfully ✌');
    localStorage.setItem('loggedinUser', JSON.stringify({email:'',id:''}))
    products.forEach(p => dispatch(removeProduct(p.product)))
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