
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiCart } from 'react-icons/bi'
import Cart from "../../components/Cart";
import Navigation from "../../components/Navigation";
import SearchComponent from "../../components/Search"
import Theme from "../../components/Theme";
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
  const handleChange = (e:any) => {
    alert(e.target.value)
  }
  return (
    
    <header className='header'>
      <div className="top__banner__div">
        <Navigation /> <Link className="link" to="/"><h1 className="logo">Daki e-commerce</h1></Link>
      </div>
        
      <SearchComponent
        handleChange={handleChange}
        placeholder="search product"
      />
      <Theme />
      { 
        loggedUser.email !== '' ?
          <div className='header__edit'>
            <Link to='/editprofile'>{
              `Hi ${loggedUser.firstName ? 
                loggedUser.firstName :
                'User'} 
            `
            }
            </Link><small className='header__edit__hide'>edit profile</small> 
          </div>: 
          ''
          
      }
      <Cart
        items={0}
        element = {<i className="fa fa-heart"></i>}
      />
      <Cart
        items={cart}
        element = {<BiCart size="35" />}
      />
    </header>
  
    
  )
}