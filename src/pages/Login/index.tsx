import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link} from 'react-router-dom'
import GoogleLogin from '../../components/GoogleLogin'
import Notification from '../../components/Notification'
import { addUser } from '../../redux/actions'
import { BASE_URL } from '../../resources'
import {fetchUser} from '../../utils/fetchUser'
import { loginorSignup } from '../../utils/loginorSignup'

import './style.scss'

export default function LogInForm(){
  const [email, setEmail] = useState('')
  const [findEmail, setFindEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [color, setColor] = useState(false)
  const dispatch = useDispatch()
  
  const clearNotify = () => {
    setTimeout(()=>{ setError('')}, 4000)
  }
  // check the email 
  const checkEmail = async (email: string) => {
    try{
      const response =  await fetch(
        `${BASE_URL}/users/checkEmail`, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: email}),
        })
      
      const emailResponse = await response.json()
      if(emailResponse.statusCode){
        setFindEmail(emailResponse.message)
        setTimeout(() => setFindEmail(''), 2000)
      }else{
        setFindEmail('')
      }
      return emailResponse
    }catch(error){
      setError('Something went error while cheking email')
      setTimeout(() => setError(''), 2000)
      
    }
  }
  
  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      //login in 
      const returnUser = await loginorSignup(
        `${BASE_URL}/users/login`, 
        email, 
        password
      )
      //destruct id , token 
      const {id, token}  = returnUser
      if(token){
        //when login is success full fetch the user details from db
        const user = await fetchUser(id, token)
        console.log('user from login fetch', user)
        if(user){
          const loggedinUser = {...user, googleId : '',token : token}
          dispatch(addUser(loggedinUser))
          localStorage.setItem('loggedinUser', JSON.stringify(loggedinUser))
        }else{
          setError('Something went wrong, please try again.')
          clearNotify()
        }
        //then clear the form 
        setColor(true)
        setEmail('')
        setPassword('')
        setTimeout(function(){
          setError('')
          window.location.replace('/') 
        }, 5000)
        setError('Logged in   successfully') 
      }else{
        setError('Login failed email/password is not valid') 
        clearNotify()
      }
    }catch(err){
      setError('Email/password not correct, please try again.')
      clearNotify()
    }
  }
  return (
    <div className='login__formm__div'>
      { error ? <Notification message={error} color={color}/> : ''}
      <div className='login__text__div'>
        <h3>Log in</h3>
        <Link  to='/signup'>JOIN AS A MEMEBER</Link>
      </div>
      <hr className='login__line'></hr>

      <Form className='login__form'  onSubmit={handleLogin}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address *</Form.Label>
          <Form.Control 
            type='email' 
            onChange={(e) => setEmail(e.target.value)} 
            onBlur={() => checkEmail(email)} 
            required 
            placeholder='Enter email' />
          <Form.Text className='text-muted'>
            <span className="login__emailFound">{findEmail}</span>
          </Form.Text>
        </Form.Group>
        {' '}
        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password *</Form.Label>
          <Form.Control 
            type='password' 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            placeholder='Password' 
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicCheckbox'>
          <Form.Check type='checkbox'  label='remember password' />
        </Form.Group>
        <div className='login__buttons'>
          <Button variant='primary' type='submit'>Login</Button>
          <GoogleLogin />
        </div>
      </Form>
      <br/>
      <Link to="/forgot"> Forgot password?</Link>

    </div>
  )
}