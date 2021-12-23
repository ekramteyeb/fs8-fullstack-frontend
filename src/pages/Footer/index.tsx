import { useState } from "react";
import { Form, Button } from "react-bootstrap";

import './style.scss'

export default function Footer(){
  const [email, setEmail] = useState('')
  return(
    <footer className="footer">
      <nav className="footer__nav">
        <ul className="footer__nav__ul">
          <h3>Daki e-commerce</h3>
          <a href="#aboutus"><li>About us</li></a>
          <a href="#customerservice"><li>Customer service</li></a>
          <a href="#privace"><li>Privacy</li></a>
          <a href="#responsibility"><li>Our responsibility</li></a>
          <a href="#jobs"><li>Open jobs</li></a>
          <a href="#press"><li>Press</li></a><br/>
          {''}
          <p>&copy; 2021 Daki e-commerce , Teyeb Hussen with &hearts;</p>
        </ul>
       
      </nav>
      <div className="footer__newsletter">
        <h3>NEWSLETTER</h3>

        <p>Join our newsletter mailing list and stay connected </p>
        <Form className="d-flex search">
          <Form.Control
            type="search"
            placeholder="Enter your email address"
            onChange={(e:any) => setEmail(e.target.value)}
            className="me-2 search__bar"
            aria-label="Search"
          />
          <Button variant="outline-success" 
            onClick={() => alert(email)}>
            Send
          </Button>
        </Form> 
        <div className="footer__social__div">
          <ul className="footer__social">
            <li><a href="#fb" className="fa fa-facebook">{}</a></li>
            <li><a href="#twitter" className="fa fa-twitter">{}</a></li>
            <li><a href="#google" className="fa fa-google">{''}</a></li>
            <li><a href="#linkdin" className="fa fa-linkedin">{''}</a></li>
            <li><a href="#youtube" className="fa fa-youtube">{''}</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}