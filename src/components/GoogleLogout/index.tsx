import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct } from '../../redux/actions';
import { AppState } from '../../types';
import { Service } from '../../utils/service';

import './style.scss'

function Logout() {
  const service = new Service()
  const dispatch = useDispatch()
  const products = useSelector((state:AppState) => state.product.inCart)

  const onSuccess = () => {
    alert('Logout made successfully ✌');
    localStorage.setItem('loggedinUser', JSON.stringify({email:'',id:''}))
    products.forEach(p => 
      dispatch(removeProduct(p.product))
    )
    window.location.replace('/')
  };

  return (
    <div className='logout'>
      <GoogleLogout
        clientId={service.getClientId}
        buttonText='Logout'
        onLogoutSuccess={onSuccess}
      >
      </GoogleLogout>
    </div>
  );
}

export default Logout;