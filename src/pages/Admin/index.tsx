import { useState } from "react"
import { Container, Nav } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import Product from "../../components/ProductAdmin"
import { AppState } from "../../types"
import { Users } from "./users"
import { Orders } from "./orders"
import CustomButton from "../../components/Button"
import CreateProduct  from "./product/createProduct"
import Notification from "../../components/Notification"
import { deleteProduct } from "../../utils/manageProduct"
import { removeProduct } from "../../redux/actions"

import './style.scss'

export const Products = ({products } : any) => {
  return(
    <>
      {
        products.map((p:any) => <Product key={p.id} product={p}/> )
      }
    </>
  )
}
export const Carts = () => {
  return(
    <>
      {
        <h3>This is cart page coming soon .....</h3>
      }
    </>
  )
}
export default function AdminPage(){

  const state = useSelector((state: AppState) => state)
  const products = state.product.allProducts
  const token : string | any = state.user.loggedIn.token
  const [switche , setSwitch] = useState('')
  const [message , setMessage] = useState('')
  const [color , setColor] = useState(false)
  const dispatch = useDispatch()
  
  const handleDelete = async (id: any) => {
    const confirm = window.confirm('are you sure to delete the product ?')
    if(confirm) {
      const response = await deleteProduct(id, token)
      if(response.status === 204){
        setMessage('Delete is successfull')
        dispatch(removeProduct(id))
        setColor(true)
        setTimeout(function(){
          setMessage('')
          window.location.replace('/admin')},
        2000)
      } 
      else{
        setMessage('Delete is not successfull')
        setColor(false)
      }
    }
  }
  const deliver = (casee:string) : any => {
    switch(casee){
    case 'orders' : 
      return <Orders />
    case 'users' : 
      return <Users />
    case 'carts' : 
      return <Carts />
    case 'addproduct' : 
      return <CreateProduct/>
    default: 
      return (
        products.sort(function(a,b){
          if(a.createdAt > b.createdAt) return -1
          if(a.createdAt < b.createdAt) return 1
          return 0}
        ).map(product => 
          <Product key={product.id} 
            product={product} 
            handleEdit={
              () => setSwitch('addproduct')
            }
            handleDelete={() => handleDelete(product.id)}
            
          />
        )
      )
    
    }
  }
  return (
    <>
      <Container fluid className="admin__page__div">
        <div className="admin__menu">
          {message ? <Notification message={message} color={color} /> : '' }
          <small>{products.length} products</small>
          <Nav className="admin__nav" variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
              <Nav.Link 
                onClick={() => setSwitch('products')}
                href="#">
                 Products
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                onClick={() => setSwitch('users')} 
                href="#" >
                Users
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                onClick={() => setSwitch('orders')} 
                href="#">
               Orders
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => setSwitch('carts')} 
                href="#">
               Carts
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Admin Dasheboard
              </h3>
            </Nav.Item>
            <Nav.Item>
              <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <CustomButton 
                  text="add product"
                  onClick={() => setSwitch('addproduct')}
                />
              </h3>
            </Nav.Item>
          </Nav>
        </div>
        <div className="admin__main">
          {
            deliver(switche)
          }
        </div>
      </Container>
    </>
  )
}