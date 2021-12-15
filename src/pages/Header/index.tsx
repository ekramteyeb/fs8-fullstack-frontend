
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiCart } from 'react-icons/bi'
import Cart from "../../components/Cart";
import Navigation from "../../components/Navigation";
//import SearchComponent from "../../components/Search"
import ProfileEditLink from "../../components/ProfileEditLink";
import { AppState } from "../../types";

import './style.scss'

export default function Header (){

  const state = useSelector((state:AppState) => state)
  const loggedUser = state.user.loggedIn
  const cartFromDb : number | any  = 
  (loggedUser.email !== '' && loggedUser.cart !== undefined )
    ? loggedUser?.cart.length : 
    0
  const cartFromLocal  = state.product.inCart.length
  const cart = cartFromDb + cartFromLocal
 
  console.log(loggedUser, 'from header')
  /* const handleChange = (e:any) => {
    alert(e.target.value)
  } */
  return (
    
    <header className='header'>
      <div className="top__banner__div">
        <Navigation /> 
        <Link className="link" to="/">
          <h1 className="logo">Daki e-commerce</h1>
        </Link>
      </div>
      { 
        loggedUser.email !== '' ?
          <div className='header__picture'>
            <Link to='/editprofile'>
              { loggedUser.avatar ? <img className='header__picture' src={loggedUser.avatar} alt="user avatar"/> : ''}
            </Link> 
          </div>: 
          ''
      }
      {loggedUser.email ? <ProfileEditLink /> : ''}
      <Cart
        items={0}
        element = {<i className="fa fa-heart favoritecounter"></i>}
      />
      <Cart
        items={cart}
        element = {<BiCart size="25" />}
      />
    </header>
  )
}