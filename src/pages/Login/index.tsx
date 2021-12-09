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
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [color, setColor] = useState(false)
  
  const navigation = useNavigate()
  const dispatch = useDispatch()

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
     
      console.log(res, 'response from server while normal login ')
      const loggedinUser = {...res.data, googleId : '',token : token}
      dispatch(addUser(loggedinUser))
      console.log('loggedinUser in State', loggedinUser)
      localStorage.setItem('loggedinUser', JSON.stringify(loggedinUser))
      
    }catch(err : any){
      setError('Something went wrong while fetching user')
    }
  }
  const Login = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const user = {
      email, 
      password
    }
    try {
      const response =  await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      const returnUser = await response.json()

      //when login is success full fetch the user details from db
      fetchUser(returnUser.id, returnUser.token)

      //then clear the form 
      console.log('Login success', returnUser.id)
      setColor(true)
      setEmail('')
      setPassword('')
      setTimeout(function(){
        setError('')
        navigation('/')
        window.location.reload()
      }, 1000)
      setError('Login  successfully') 
    }catch(err){
      setColor(false)
      setTimeout(()=>{ setError('')}, 1000)
      setError('Something went wrong, pleas try again.' + err)
      console.error('Error', err)
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

      <Form className='login__form'  onSubmit={Login}>
        
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address *</Form.Label>
          <Form.Control type='email' onChange={(e) => setEmail(e.target.value)} required placeholder='Enter email' />
          <Form.Text className='text-muted'>
          We'll never share your email with anyone else.
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