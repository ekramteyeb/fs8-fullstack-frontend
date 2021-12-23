import { useState } from "react";
import {  Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../../components/Button";
import Notification from '../../components/Notification'
import { addUser } from "../../redux/actions";
//import { addUser } from "../../redux/actions";
import { AppState } from "../../types";

import './style.scss'

export default function EditProfile(){
  //get the user from state
  const state = useSelector((state:AppState) => state)
  const loggedinUser = state.user.loggedIn
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [findPassword, setFindPassword] = useState('')
  const [street, setStreet] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')
  const [result, setResult] = useState('')
  const [color, setColor] = useState(false)

  // check the password 
  const checkPassword = async (id: string, password: string) => {
    const response =  await fetch('http://localhost:3001/api/v1/users/checkPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({id, password}),
    })
    const passportResponse = await response.json()
    if(passportResponse.statusCode){
      setFindPassword(passportResponse.message)
      setTimeout(() => setFindPassword(''), 2000)
    }else{
      setFindPassword('')
    }
    return passportResponse
  
  }

  const handledEditProfile = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    const token  = loggedinUser.token
    const user = {
      id: loggedinUser.id,
      userName: userName ? userName : loggedinUser.userName,
      firstName : firstName ? firstName : loggedinUser.firstName,
      email: email ? email : loggedinUser.email, 
      password: password,
      address : {
        street: street ? street : loggedinUser.address?.street,
        postalCode: postalCode ? postalCode : loggedinUser.address?.postalCode,
        country: country ? country : loggedinUser?.address?.country
      }
    }
  
    try {
      const response : any =  await fetch(`http://localhost:3001/api/v1/users/${loggedinUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(user),
      })
      console.log(response, 'response from edit profile')
      console.log('token from edit profile', token)
      const returnUser = await response.json()
      const googleId = loggedinUser.googleId
      console.log('return user or response' , returnUser)
      dispatch(addUser({...returnUser, token : token}))
      const loggedin = {...returnUser, token : token, googleId: googleId}
      localStorage.setItem('loggedinUser', JSON.stringify(loggedin))
      setColor(true)
      setEmail('')
      setPassword('')
      setTimeout(()=>{ setResult('')}, 4000)
      setResult('Login  successfully' + returnUser) 
      window.location.replace('/')
    }catch(err){
      setColor(false)
      setTimeout(()=>{ setResult('')}, 4000)
      setResult('Something went wrong, pleas try again.')
    }
  }
  return (
    <div className="edit__form__div">
      { result ? <Notification message={result} color={color}/> : ''}
      <div className="edit__text__div">
        <h3>Edit profile</h3>
      </div>
      <hr className="edit__line"></hr>

      <Form className="edit__form" onSubmit={handledEditProfile}>
        <Form.Group className="mb-3" controlId="formBasicUserName">
          <Form.Label>User name</Form.Label>
          <Form.Control 
            type="text" 
            onChange={(e) => setUserName(e.target.value)}  
            value={userName} 
            placeholder={
              loggedinUser?.userName ? 
                loggedinUser?.userName :
                "User name"
            } 
          />
          <Form.Text className="text-muted">
          Any name to be rememebered with.
          </Form.Text>
        </Form.Group>
        {' '}
        <Form.Group className="mb-3" controlId="formBasicFullName">
          <Form.Label>Full Name </Form.Label>
          <Form.Control 
            type="text" 
            onChange={(e) => setFirstName(e.target.value)}  
            value={firstName} 
            placeholder={
              loggedinUser?.firstName ? 
                loggedinUser?.firstName :
                "Name"
            } 
          />
        </Form.Group>
        {' '}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address *</Form.Label>
          <Form.Control 
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            value={email} 
            placeholder={
              loggedinUser?.email ? 
                loggedinUser?.email : 
                "Enter email"
            } 
          />
          <Form.Text className="text-muted">
            <span 
              className="edit__checkEmail">
              {
                email === '' ?
                  '' :  
                  loggedinUser.email !== email ?
                    '* email is not yours' :
                    ''
              }
            </span>
          </Form.Text>
        </Form.Group>
        {' '}
        {
          loggedinUser['googleId'] !== undefined && loggedinUser['googleId'] !== '' ?
            '' :
            <div>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password *</Form.Label>
                <Form.Control 
                  type="password" 
                  required
                  onChange={(e) => setPassword(e.target.value)} 
                  onBlur={() => checkPassword(loggedinUser.id, password)}
                  value={password} 
                  placeholder="Password" />
                <Form.Text className='text-muted'>
                  <span className="edit__findPassword">{findPassword}</span>
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
              </Form.Group>
            </div>
        }
        {''}
        <Form.Group className="mb-3 address" controlId="formBasicAddress">
          <Form.Label>Address </Form.Label>
          <div>
            <Form.Control 
              type="text" 
              onChange={(e) => setStreet(e.target.value)}  
              value={ street } 
              placeholder={
                loggedinUser?.address?.street ? 
                  loggedinUser?.address?.street : 
                  "Street"
              } 
            />
            <Form.Control 
              type="text" 
              onChange={(e) => setPostalCode(e.target.value)} 
              value={ postalCode} 
              placeholder={
                loggedinUser?.address?.postalCode ? 
                  loggedinUser?.address?.postalCode : 
                  "Postal Code"
              } 
            />
            <Form.Control 
              type="text" 
              onChange={(e) => setCountry(e.target.value)} 
              value={country} 
              placeholder={
                loggedinUser?.address?.country ? 
                  loggedinUser?.address?.country :
                  "Country"} 
            />
          </div>
        </Form.Group>
        <CustomButton 
          color="outline-success"
          width={200} 
          type="submit" 
          text="submit"/>
      </Form>
    </div>
  )
}