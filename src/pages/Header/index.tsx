import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Cart from "../../components/Cart";
import OffCanvasFavorite from "../../components/Favorite";
import Navigation from "../../components/Navigation";
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
  const products = state.product.favorite

  return (
    
    <header className='header'>
      <div className="top__banner__div">
        <Navigation /> 
        <Link className="link" to="/">
          <h1 className="logo">Daki e-commerce</h1>
        </Link>
      </div>
      
      <div className="header__icons">
        {loggedUser.email ? <ProfileEditLink /> : ''}
        <OffCanvasFavorite data={products}/>
        <Link to="/products">
          <Cart
            items={cart}
            element= {<i className="bi bi-basket"></i>}
          />
        </Link>
      </div>
    </header>
  
  )
}