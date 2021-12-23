import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Table } from "react-bootstrap"
import { AppState } from "../../../types"
import { User } from "../../../types/user"
import CustomButton from "../../../components/Button"

import './style.scss'

export const Users = () => {
  const [users, setUsers] = useState([])
  const url = 'http://localhost:3001/api/v1/users'
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
  },[user.token])

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
          { users?.map((u: User) => 
            <tr key={u.id}>
              <td>
                <img className="user__avatar" 
                  src={u.avatar} 
                  alt={'user pictur'}
                />
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