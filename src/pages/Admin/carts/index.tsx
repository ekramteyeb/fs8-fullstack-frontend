import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { AppState } from "../../../types"
import { Table } from "react-bootstrap"
import CustomButton from "../../../components/Button"
import { BASE_URL } from "../../../resources"

export const Carts = () => {

  const [carts, setCarts] = useState([])
  const url = `${BASE_URL}/carts`
  const user = useSelector((state:AppState) => state.user.loggedIn)

  useEffect(() => {
    axios.get(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    }).then(response => {
      setCarts(response.data)
    }).catch(error => {
      console.log(error);
    })
  },[user.token,url])

  return(
    <div className="user__container">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Items amount</th>
          </tr>
        </thead>
        <tbody>
          { carts?.map((oarder: any) => 
            <tr key={oarder.id}>
              <td>{oarder.user?.firstName}</td>
              <td>{oarder.total}</td>
              <td>{oarder.status}</td>
              <td>{oarder.started}</td>
              <td>{oarder.endDate}</td>
              <td>{oarder.items?.length}</td>
              <td><CustomButton color="danger" width={70} text="cancel"/></td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}
