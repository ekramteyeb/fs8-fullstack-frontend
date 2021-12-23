import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
//import { useDispatch } from 'react-redux'
import { Link} from 'react-router-dom'
import Notification from '../../components/Notification'
//import { addUser } from '../../redux/actions'
//import {fetchUser} from '../../utils/fetchUser'
import { sendEmail } from '../../utils/sendEmail'

import './style.scss'

export default function Verification(){
  const [code, setCode] = useState('')
  //const [checkCode, setCheckCode] = useState('')
  const [error, setError] = useState('')
  const [color, setColor] = useState(false)
  //const dispatch = useDispatch()
  
  const clearNotify = () => {
    setTimeout(()=>{ setError('')}, 4000)
  }
  /*  // check the email 
  const checkCode = async (code: string) => {
    const response =  await fetch('http://localhost:3001/api/v1/users/checkCode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({code: code}),
    })
    const codeResponse = await response.json()
    if(codeResponse.statusCode){
      setCheckCode(codeResponse.message)
      setTimeout(() => setCheckCode(''), 2000)
    }else{
      setCheckCode('')
    }
    return codeResponse
  } */
  
  const handleCodeVerify = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      //forgot password in 
      const response = await sendEmail(
        'http://localhost:3001/api/v1/users/verifycode', 
        code,
      )
      //destruct id , token 
      // const {id, token}  = returnUser
      console.log(response, 'code verification response')
      if(response === "code correct"){
        //then clear the form 
        setColor(true)
        setCode('')
        setTimeout(function(){
          setError('')
          window.location.replace('/resetpassword') 
        }, 1000)
        setError('Verification code is correct please reset your password') 
      }else{
        setError('Verification code is not correct') 
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
        <h3>Verify your code </h3>
        <Link  to='/login'>Back to Login</Link>
      </div>
      <hr className='login__line'></hr>

      <Form className='login__form'  onSubmit={handleCodeVerify}>
        <Form.Group className='mb-3' controlId='formBasicCode'>
          <Form.Label>Enter the verification code here *</Form.Label>
          <Form.Control 
            type='text' 
            onChange={(e) => setCode(e.target.value)} 
            required 
            placeholder='Enter code' />
        </Form.Group>
        {' '}
        
        <div className='login__buttons'>
          <Button variant='primary' type='submit'>Send</Button>
        </div>
      </Form>
      

    </div>
  )
}