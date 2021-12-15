import axios from 'axios'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Link} from 'react-router-dom'
//import axios from 'axios'
//import CustomButton from '../../components/Button'
import GoogleLogin from '../../components/GoogleLogin'
import Notification from '../../components/Notification'
import { addUser } from '../../redux/actions'

import './style.scss'

export default function LogInForm(){
  const [email, setEmail] = useState('')
  const [findEmail, setFindEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [color, setColor] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const clearNotify = () => {
    setTimeout(()=>{ setError('')}, 4000)
  }
  // check the email 
  const checkEmail = async (email: string) => {
    const response =  await fetch('http://localhost:3001/api/v1/users/checkEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email, password: ''}),
    })
    const emailResponse = await response.json()
    if(emailResponse.statusCode){
      setFindEmail(emailResponse.message)
      setTimeout(() => setFindEmail(''), 2000)
    }else{
      setFindEmail('')
    }
    return emailResponse
  
  }
  //fetch the loggedin user 
  const fetchUser = async (id : any, token : string) => {
    try{
      const res = await axios.get(
        `http://localhost:3001/api/v1/users/${id}`,
        {
          headers:{
            Authorization : `Bearer ${token}`,
          }
        }
      )
      const loggedinUser = {...res.data, googleId : '',token : token}
      dispatch(addUser(loggedinUser))
      localStorage.setItem('loggedinUser', JSON.stringify(loggedinUser))
      
    }catch(err : any){
      setError('Something went wrong while fetching user')
      clearNotify()
    }
  }
  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const user = {
      email, 
      password
    }
    try {
      const response =  await fetch('http://localhost:3001/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      const returnUser = await response.json()
      
      if(returnUser.token){
        //when login is success full fetch the user details from db
        fetchUser(returnUser.id, returnUser.token)
        //then clear the form 
        setColor(true)
        setEmail('')
        setPassword('')
        setTimeout(function(){
          setError('')
          navigate('/')
          window.location.reload()
        }, 1000)
        setError('Logged in   successfully') 
      }else{
        setError('Login failed email/password is not valid') 
        clearNotify()
      }
    }catch(err){
      setError('Something went wrong, please try again.')
      clearNotify()
    }
  }
  return (
    <div className='login__form__div'>
      { error ? <Notification message={error} color={color}/> : ''}
      <div className='login__text__div'>
        <h3>Log in</h3>
        <Link  to='/signup'>JOIN AS A MEMEBER</Link>
      </div>
      <hr className='login__line'></hr>

      <Form className='login__form'  onSubmit={handleLogin}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address *</Form.Label>
          <Form.Control type='email' onChange={(e) => setEmail(e.target.value)} onBlur={() => checkEmail(email)} required placeholder='Enter email' />
          <Form.Text className='text-muted'>
            <span className="login__emailFound">{findEmail}</span>
          </Form.Text>
        </Form.Group>
        {' '}
        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password *</Form.Label>
          <Form.Control type='password' onChange={(e) => setPassword(e.target.value)} required placeholder='Password' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicCheckbox'>
          <Form.Check type='checkbox'  label='remember password' />
        </Form.Group>
        <div className='login__buttons'>
          <Button variant='primary' type='submit'>Login</Button>
          <GoogleLogin />
        </div>
      </Form>
    </div>
  )
}