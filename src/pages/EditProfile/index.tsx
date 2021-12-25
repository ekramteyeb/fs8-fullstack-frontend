import { useState } from "react";
import {  Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../../components/Button";
import Notification from '../../components/Notification'
import { addUser } from "../../redux/actions";
import { BASE_URL } from "../../resources";
import { AppState } from "../../types";

import './style.scss'

const initialuserState = {
  userName : '',
  firstName:'',
  email:'',
  password:'',
  street:'',
  postalCode:'',
  country:'',
}
export default function EditProfile(){
  
  const state = useSelector((state:AppState) => state)
  const loggedinUser = state.user.loggedIn
  const dispatch = useDispatch()
  const [suser , setSuser] = useState(initialuserState)
  const [findPassword, setFindPassword] = useState('')
  const [result, setResult] = useState('')
  const [color, setColor] = useState(false)

  const handleChange = (e: any) => {
    const {name , value} = e.target
    setSuser({...suser, [name]: value})
  }
  // check the password 
  const checkPassword = async (id: string, password: string) => {
    const response =  await fetch(`${BASE_URL}/users/checkPassword`, {
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
      userName: suser.userName ? suser.userName : loggedinUser.userName,
      firstName : suser.firstName ? suser.firstName : loggedinUser.firstName,
      email: suser.email ? suser.email : loggedinUser.email, 
      password: suser.password,
      address : {
        street: suser.street ? suser.street : loggedinUser.address?.street,
        postalCode: suser.postalCode ? suser.postalCode : loggedinUser.address?.postalCode,
        country: suser.country ? suser.country : loggedinUser?.address?.country
      }
    }
  
    try {
      const response : any =  await fetch(`${BASE_URL}/users/${loggedinUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(user),
      })
      
      const returnUser = await response.json()
      const googleId = loggedinUser.googleId
      dispatch(addUser({...returnUser, token : token}))
      const loggedin = {...returnUser, token : token, googleId: googleId}
      localStorage.setItem('loggedinUser', JSON.stringify(loggedin))
      setColor(true)
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
            name="userName" 
            onChange={handleChange}  
            value={suser.userName} 
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
            name="firstName"
            onChange={handleChange}  
            value={suser.firstName} 
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
            name="email"
            onChange={handleChange} 
            required 
            value={suser.email} 
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
                suser.email === '' ?
                  '' :  
                  loggedinUser.email !== suser.email ?
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
                  name="password"
                  required
                  onChange={handleChange} 
                  onBlur={() => checkPassword(loggedinUser.id, suser.password)}
                  value={suser.password} 
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
              name="street"
              onChange={handleChange}  
              value={ suser.street } 
              placeholder={
                loggedinUser?.address?.street ? 
                  loggedinUser?.address?.street : 
                  "Street"
              } 
            />
            <Form.Control 
              type="text"
              name="postalCode"
              onChange={handleChange} 
              value={ suser.postalCode} 
              placeholder={
                loggedinUser?.address?.postalCode ? 
                  loggedinUser?.address?.postalCode : 
                  "Postal Code"
              } 
            />
            <Form.Control 
              type="text"
              name="country"
              onChange={handleChange} 
              value={suser.country} 
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