import {
  Container,
  Offcanvas,
  Nav,
  Navbar
} from 'react-bootstrap'
import { useSelector, useDispatch} from 'react-redux'
import CustomButton from '../../components/Button'
import { removeProduct, removeUser } from '../../redux/actions'
import { AppState } from '../../types'
import GoogleLogout from '../../components/GoogleLogout'

import './style.scss'

export default function Navigation() {

  const state = useSelector((state:AppState) => state)
  const user = state.user.loggedIn
  const dispatch = useDispatch()
  const products = state.product.inCart
  

  return (
    <Navbar bg={''}  variant="dark" style={{marginLeft:6}} className="navbar" collapseOnSelect expand={false} >
      <Container fluid >
        <Navbar.Toggle aria-controls="offcanvasNavbar"  />
        <Navbar.Offcanvas 
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              My Account
              <hr></hr>
              <Nav 
                className="justify-content-end flex-grow-1 pe-3" 
                style={{
                  display: user.email ?
                    'none' : 
                    'block'
                }}
              >
                <Nav.Link href="/login" >
                  <CustomButton
                    className="theme__btn purplebtn"
                    color="primary"
                    text='Sign In'
                  />
                </Nav.Link>
                <Nav.Link href="/signin" >
                  <CustomButton
                    className="theme__btn purplebtn"
                    color="primary"
                    text='Sign In -mui'
                  />
                </Nav.Link>
              </Nav>
              <Nav 
                className="justify-content-end flex-grow-1 pe-3" 
                style={{
                  display: user.email ?
                    'block' :
                    'none'
                }} 
              >
                <Nav.Link href="#" >
                  {(user['googleId'] !== undefined && user['googleId'] !== '') ?  <GoogleLogout /> : 
                    <CustomButton
                      className="theme__btn purplebtn"
                      color="outline-info"
                      text='SignOut'
                      onClick={function(){
                        if(window.confirm('logout ?')){
                          dispatch(removeUser(state.user.loggedIn))
                          localStorage.setItem('loggedinUser', JSON.stringify('') );
                          products.forEach(p => 
                            dispatch(removeProduct(p.product))
                          )
                          window.location.replace('/')
                        }
                      }}
                    />
                  }
                </Nav.Link>
              </Nav>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <hr></hr>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <div className="navlink__div">
                <Nav.Link className="navlink" href="#themeCyan">
                  <span
                    className="theme__btn purplebtn"
                  >
                  Mobiles
                  </span>
                  <div className="vl"></div> <span>{'>'}</span>
                
                </Nav.Link>
              </div>
              <div className="navlink__div">
                <Nav.Link className="navlink" href="#themeBlue">
                  <span
                    className="theme__btn"
                  >
                  Tv:s
                  </span>
                  <div className="vl"></div> <span>{'>'}</span>
                </Nav.Link>
              </div>
              <div className="navlink__div">
                <Nav.Link  className="navlink" href="#themeGreen">
                  <span
                    className="theme__btn"
                  >
                  Computers
                  </span>
                  <div className="vl"></div> <span>{'>'}</span>
                </Nav.Link>
              </div>
              <div className="navlink__div">
                <Nav.Link className="navlink"href="#themeRed">
                  <span
                    className="theme__btn"
                  >
                  Tablets
                  </span>{' '}
                  <div className="vl"></div> <span>{'>'}</span>
                </Nav.Link>
              </div>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}
