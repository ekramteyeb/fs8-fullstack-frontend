import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Notification from '../../components/Notification'
import GoogleLogin from '../../components/GoogleLogin'
import { BASE_URL } from "../../resources";

import './style.scss'

export default function SignupForm(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [result, setResult] = useState('')
  const [color, setColor] = useState(false)

  const Signup = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const user = {
      email, 
      password
    }
    try {
      const response =  await fetch(`${BASE_URL}/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      const returnUser  = await response.json()
      if(returnUser.status !== 'error'){
        setResult(returnUser.message) 
        setColor(true)
        setEmail('')
        setPassword('')
      }else{
        setResult(returnUser.message) 
        setColor(false)
      }
      setTimeout(()=>{ setResult('')}, 4000)
    }catch(err){
      setColor(false)
      setTimeout(()=>{ setResult('')}, 4000)
      setResult('Something went wrong, pleas try again.')
      console.error('Error', err)
    }
  }  
  return (
    <div className="signup__form__div">
      { result ? 
        <Notification 
          message={result} 
          color={color}
        /> : ''
      }
      <div className="signup__text__div">
        <h3>Sign up</h3>
        <Link  to="/login">Login</Link>
      </div>
      <hr className="signup__line"></hr>
      
      <Form className="signup__form" id="signup" onSubmit={Signup}>
        <Form.Group className="mb-3" controlId="formBasicEmail1">
          <Form.Label>Email address *</Form.Label>
          <Form.Control 
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            value={email} 
            placeholder="Enter email" 
          />
          <Form.Text className="text-muted">
          We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        {' '}
        <Form.Group className="mb-3" controlId="formBasicPassword1">
          <Form.Label>Password *</Form.Label>
          <Form.Control 
            type="password" 
            onChange={(e) => 
              setPassword(e.target.value)
            } 
            required 
            value={password} 
            placeholder="Password" 
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox1">
          <Form.Check type="checkbox"  label="remember password" />
        </Form.Group>
        <div className='login__buttons'>
          <Button variant="primary" type="submit">
        Sign up
          </Button>
          <GoogleLogin />
        </div>
      </Form>
    </div>
  )
}