import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
//import { useDispatch } from 'react-redux'
import { Link} from 'react-router-dom'
import Notification from '../../components/Notification'
//import { addUser } from '../../redux/actions'
//import {fetchUser} from '../../utils/fetchUser'
import { sendEmail } from '../../utils/sendEmail'
import './style.scss'

export default function ForgotPassword(){
  const [email, setEmail] = useState('')
  const [findEmail, setFindEmail] = useState('')
  const [error, setError] = useState('')
  const [color, setColor] = useState(false)
  //const dispatch = useDispatch()
  
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
      body: JSON.stringify({email: email.trim()}),
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
  
  const handleResetLink = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      //forgot password in 
      const linkSentResponse = await sendEmail(
        'http://localhost:3001/api/v1/users/forgotpassword', 
        email.trim(),
      )
      if(linkSentResponse === "Password reset link sent to your email account"){
        //then clear the form 
        setEmail('')
        setColor(true)
        setTimeout(function(){
          setError('')
        }, 5000)
        setError('Password reset link to your email please look at your inbox')
        window.location.replace('/login')  
      }else{
        setError('email is not found, please check your email') 
        setColor(false)
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
        <h3>Forgot password</h3>
        <Link  to='/login'>Back to Login</Link>
      </div>
      <hr className='login__line'></hr>

      <Form className='login__form'  onSubmit={handleResetLink}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Enter email address *</Form.Label>
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
        <div className='login__buttons'>
          <Button variant='primary' type='submit'>Send</Button>
        </div>
      </Form>
    </div>
  )
}