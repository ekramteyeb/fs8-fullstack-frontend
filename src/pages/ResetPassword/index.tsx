import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link} from 'react-router-dom'
import GoogleLogin from '../../components/GoogleLogin'
import Notification from '../../components/Notification'
import { resetpassword } from '../../utils/resetpassword'

import './style.scss'

export default function ResetPassword(){
  
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [color, setColor] = useState(false)

  const urlme = window.location.href;
  const tokenl = urlme.slice(urlme.indexOf('=') + 1)

  const clearNotify = () => {
    setTimeout(()=>{ setError('')}, 4000)
  }

  const handleResetPassword = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      //send new password 
      const response = await resetpassword(
        'http://localhost:3001/api/v1/users/resetpassword', 
        password, 
        confirmPassword,
        tokenl,
      )
      //destruct id , token 
      if(response === 'Password reset successful'){
       
        setError('Password reset is successfull, please login')
        setColor(true)
        setConfirmPassword('')
        setPassword('')
        setTimeout(function(){
          setError('')
          window.location.replace('/login') 
        }, 4000)
      }else{
        setError('Something went wrong, please try again.')
        setColor(false)
        clearNotify()
      }
    }catch(err){
      setError('the link expired please try again.')
      window.location.replace('/login') 
      clearNotify()
    }
  }
  return (
    <div className='login__form__div'>
      { error ? 
        <Notification 
          message={error} 
          color={color}
        /> 
        : 
        ''
      }
      <div className='login__text__div'>
        <h3>Reset passowrd</h3>
        <Link  to='/login'>Back to Login</Link>
      </div>
      <hr className='login__line'></hr>

      <Form className='login__form'  onSubmit={handleResetPassword}>
        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password *</Form.Label>
          <Form.Control 
            type='password' 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            placeholder='Enter password' />
        </Form.Group>
        {' '}

        <Form.Group className='mb-3' controlId='formBasicConfirmPassword'>
          <Form.Label>Confirm Password *</Form.Label>
          <Form.Control 
            type='password' 
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => 
              password === confirmPassword ? 
                setError('') : 
                setError('password doesnt match')
            }
            required 
            placeholder='Confirm Password' 
          />
          <Form.Text className='text-muted'>
            <span className="login__emailFound">
              {
                password !== confirmPassword ? 
                  error : ''
              }
            </span>
          </Form.Text>
        </Form.Group>
        
        <div className='login__buttons'>
          <Button 
            variant='primary' 
            type='submit'
          >
            Submit
          </Button>
          <GoogleLogin />
        </div>
      </Form>
    </div>
  )
}