import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Table } from "react-bootstrap"
import { AppState } from "../../../types"
import { User } from "../../../types/user"
import CustomButton from "../../../components/Button"
import { BASE_URL } from "../../../resources"
/* import {  AiOutlineUser } from 'react-icons/ai' */

import './style.scss'

export const Users = () => {
  const [users, setUsers] = useState([])
  const url = `${BASE_URL}/users`
  const user = useSelector((state:AppState) => state.user.loggedIn)

  useEffect(() => {
    axios.get(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    }).then(response => {
      setUsers(response.data)
    }).catch(function (error) {
      console.log(error);
    })
  },[user.token, url])

  return(
    <div className="user__container">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>First Name</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Member ship</th>
            <th>Shopped</th>
            <th>Ban</th>
          </tr>
        </thead>
        <tbody>
          { users?.map((u: User, index) => 
            <tr key={u.id}>
              <td>
                {
                  u.avatar ? 
               
                    <img className="user__avatar" 
                      src={u.avatar} 
                      alt={'user'}
                    />
                    :
                    <div style={{width:50, height:48, padding:2, backgroundColor: index % 2 === 0 ? '#AB47BB' : '#7E58C2', borderRadius:'0.1em', textAlign:'center',paddingTop:8, color:'white', fontWeight:'bolder', fontSize:22}}>{u.email?.charAt(0).toUpperCase()}</div>
                }
              </td>
              <td>{u.firstName}</td>
              <td>{u.userName}</td>
              <td>{u.email}</td>
              <td>{u.createdAt}</td>
              <td>{u.products?.length}</td>
              <td><CustomButton color="danger" width={60} text="Ban"/></td>
            </tr>
          )}
        </tbody>
      </Table>
      
    </div>
  )
}