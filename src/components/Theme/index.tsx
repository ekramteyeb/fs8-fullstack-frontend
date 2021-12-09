import { NavDropdown } from "react-bootstrap";

import './style.scss'
export default function Theme(){
  return (
    <NavDropdown title="Change Theme" id="offcanvasNavbarDropdown">
      <NavDropdown.Item className="theme green" href="#green3">green</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item className="theme blue" href="#blue4">
                  shero
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item className="theme purple" href="#purple5">
                  purple
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item className="theme cyan" href="#cyan6">
                  cyan
      </NavDropdown.Item>
    </NavDropdown> 
  )
}