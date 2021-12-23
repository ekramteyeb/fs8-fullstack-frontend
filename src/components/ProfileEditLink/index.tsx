import { NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppState } from "../../types";


import './style.scss'

export default function ProfileEditLink(){
  const user = useSelector((state:AppState) => state.user.loggedIn)
 
  return (
    <NavDropdown
        
      title={
        //<p className="nav__title">{`Hi ${user.firstName ? user.firstName : 'User'}`}</p>
        <div className="nav__title">{`Welcome ${user.firstName ? user.firstName : 'User'} `}<i className="bi bi-person-square"></i></div>
      } 
      id="offcanvasNavbarDropdown">
      <NavDropdown.Item 
        className="theme green"
        as="button"
      >
        <Link to="/editprofile">Edit profile</Link> 
      </NavDropdown.Item>
      {user.isAdmin ? 
        <>
          <NavDropdown.Divider />
          <NavDropdown.Item 
            className="theme blue" 
            as="button"
          >
            <Link to="/admin">Admin</Link> 
          </NavDropdown.Item>
        </>
        :
        ''
      }
    </NavDropdown> 
  )
}