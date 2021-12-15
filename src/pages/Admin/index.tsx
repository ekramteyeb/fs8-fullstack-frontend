import { useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import Product from "../../components/ProductAdmin";
import { AppState } from "../../types";


import './style.scss'
import { Users } from "./users";
import { Orders } from "./orders";


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
  const [switche , setSwith] = useState('')

  const deliver = (casee:string) : any => {
    switch(casee){
    case 'orders' : 
      return <Orders />
    case 'users' : 
      return <Users />
    case 'carts' : 
      return <Carts />
    default: 
      return<Products products={products} />
    }
  }
  

  return (
    <>
      <Container fluid className="admin__page__div">
        <div className="admin__menu">
          <Nav className="admin__nav" variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
              <Nav.Link onClick={() => setSwith('products')} href="#">Products</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => setSwith('users')} href="#" /* eventKey="/admin/users" */>Users</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => setSwith('orders')} href="#" /* eventKey="/admin/orders" */>
               Orders
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => setSwith('carts')} href="#">
               Carts
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Admin Dasheboard
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