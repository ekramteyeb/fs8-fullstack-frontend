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
  const [street, setStreet] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')
  const [result, setResult] = useState('')
  const [color, setColor] = useState(false)
  
  //const dispatch = useDispatch()
  //fetch the loggedin user 
  /* useEffect(() => {

    const fetchUser = async (id : any, token:string) => {
      try{
        const user = await fetch(`http://localhost:3001/api/v1/users/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })
    
        const loggedinUser = await user.json()

        if(loggedinUser){
        
          return(loggedinUser)
        } 
      }catch(error){
        console.log(error,'fething user problem')
      }
      
    }
    
  })
  
 */


  const handledEditProfile = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    const tokenString : any = localStorage.getItem('toktok')
    const token  = JSON.parse(tokenString)
    console.log(token, 'token')
    const user = {
      id: loggedinUser.id,
      userName: userName ? userName : loggedinUser.username,
      firstName : firstName ? firstName : loggedinUser.firstName,
      email: email ? email : loggedinUser.email, 
      password: password,
      address : {
        street: street ? street : loggedinUser.address?.street,
        postalCode: postalCode ? postalCode : loggedinUser.address?.postalCode,
        country: country ? country : loggedinUser?.address?.country
      }
    }
    console.log(user, 'to edit person ')
    try {
      const response =  await fetch(`http://localhost:3001/api/v1/users/${loggedinUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(user),
      })
      const returnUser = await response.json()
      console.log('Login success', returnUser.id)
      dispatch(addUser(returnUser))
      localStorage.setItem('loggedinUser', JSON.stringify(returnUser))
      setColor(true)
      setEmail('')
      setPassword('')
      setTimeout(()=>{ setResult('')}, 4000)
      setResult('Login  successfully' + returnUser) 
      window.location.replace('/')
    }catch(err){
      setColor(false)
      setTimeout(()=>{ setResult('')}, 4000)
      setResult('Something went wrong, pleas try again.' + err)
      console.error('Error', err)
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
          <Form.Control type="text" onChange={(e) => setUserName(e.target.value)}  value={loggedinUser.username} placeholder={loggedinUser?.email ? loggedinUser?.firstName : "User name"} />
          <Form.Text className="text-muted">
          Any name to be rememebered with.
          </Form.Text>
        </Form.Group>
        {' '}
        <Form.Group className="mb-3" controlId="formBasicFullName">
          <Form.Label>Full Name </Form.Label>
          <Form.Control type="text" onChange={(e) => setFirstName(e.target.value)}  value={loggedinUser.firstName} placeholder="name" />
          
        </Form.Group>
        {' '}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address *</Form.Label>
          <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} required value={email} placeholder={loggedinUser?.email ? loggedinUser?.email : "Enter email"} />
          <Form.Text className="text-muted">
          We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        {' '}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password *</Form.Label>
          <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
        </Form.Group>
        {''}
        <Form.Group className="mb-3 address" controlId="formBasicAddress">
          <Form.Label>Address </Form.Label>
          <div>
            <Form.Control type="text" onChange={(e) => setStreet(e.target.value)}  value={ street } placeholder={loggedinUser?.address?.street ? loggedinUser?.address?.street : "Street"} />
            <Form.Control type="text" onChange={(e) => setPostalCode(e.target.value)} value={ postalCode} placeholder={loggedinUser?.address?.postalCode ? loggedinUser?.address?.postalCode : "Postal Code"} />
            <Form.Control type="text" onChange={(e) => setCountry(e.target.value)} value={country} placeholder={loggedinUser?.address?.country ? loggedinUser?.address?.country : "Country"} />
          </div>
        </Form.Group>
        <CustomButton color="outline-success" width={200} type="submit" text="submit"/>
        
      </Form>
    </div>
  )
}