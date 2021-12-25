import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { AppState } from "../../../types"
import { Table } from "react-bootstrap"
import CustomButton from "../../../components/Button"
import { BASE_URL } from "../../../resources"

export const Orders = () => {

  const [orders, setOrders] = useState([])
  const url = `${BASE_URL}/orders`
  const user = useSelector((state:AppState) => state.user.loggedIn)

  useEffect(() => {
    axios.get(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    }).then(response => {
      setOrders(response.data)
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
            <th>Items</th>
          </tr>
        </thead>
        <tbody>
          { orders?.map((order: any) => 
            <tr key={order.id}>
              <td>{order.user?.firstName}</td>
              <td>{order.total}</td>
              <td>{order.status}</td>
              <td>{order.started}</td>
              <td>{order.endDate}</td>
              <td>{order.items?.length}</td>
              <td><CustomButton color="danger" width={70} text="cancel"/></td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}
