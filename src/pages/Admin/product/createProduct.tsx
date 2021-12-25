import axios from "axios"
import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { AppState } from "../../../types"
import Notification from '../../../components/Notification'
import { addProduct } from "../../../redux/actions"

import './style.scss'
import { BASE_URL } from "../../../resources"

const initialValues = {
  name:'',
  productCode:'',
  productionYear:'',
  category:'',
  price:0,
  color:'',
  modelType:'',
  techInfo:'',
  amount: 0,
  image:'',
}
export default function CreateProduct(){

  const state = useSelector((state:AppState) => state)
  const user = state.user.loggedIn
  const [values , setValues] = useState(initialValues)
  const [message , setMessage] = useState('')
  const [color , setColor] = useState(false)
  const dispatch = useDispatch()
  
  const handleChange = (e: any) => {
    const {name , value} = e.target
    setValues({...values, [name]: value})
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try{
      const response =  await axios.post(`${BASE_URL}/products`, 
        values, 
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
      if(response){
        setMessage(`Status : ${response.status}, Product Created Successfully`)
        dispatch(addProduct(response.data))
        setTimeout(() => setMessage(''), 2000)
        setColor(true)
        setValues(initialValues)
      }
    }catch(error:any){
      console.log(error.message)
      setTimeout(() => setMessage(''), 2000)
      setMessage(error.message)
      setColor(false)
    }
  }
  return (
    <>
      <h3>Create Product</h3>
      {message ? <Notification color={color} message={message}/> : ''}
      <Form onSubmit={handleSubmit} action="#">
        
        <div className="create__product__form">
          <Form.Group className="mb-3 create"  controlId="formBasicName">
            <Form.Label>Name </Form.Label>
            <Form.Control 
              type="text" 
              onChange={handleChange} 
              name="name"  
              value={values.name} 
              placeholder="Enter name" 
            />
          </Form.Group>
          <Form.Group className="mb-3 create" controlId="formBasicProductCode">
            <Form.Label>Product Code</Form.Label>
            <Form.Control 
              type="text" 
              onChange={handleChange} 
              name="productCode"  
              value={values.productCode}
              placeholder="product code" 
            />
          </Form.Group>
        
          <Form.Group className="mb-3 create" controlId="formBasicProductCode">
            <Form.Label>Category</Form.Label>
            <Form.Select 
              aria-label="Select category" 
              name="category"  
              value={values.category}
              onChange={handleChange}
            >
              <option>Choose category</option>
              <option value="mobile">mobile</option>
              <option value="tv">Television</option>
              <option value="tablet">Tablet</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3 create" controlId="formBasicProductionYear">
            <Form.Label>Production Year</Form.Label>
            <Form.Control 
              type="text" 
              onChange={handleChange} 
              name="productionYear" 
              value={values.productionYear}
              placeholder="year" 
            />
          </Form.Group>

          <Form.Group className="mb-3 create" controlId="formBasicPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control 
              type="number" 
              onChange={handleChange}
              name="price" 
              value={values.price} 
              placeholder="price" 
            />
          </Form.Group>

          <Form.Group className="mb-3 create" controlId="formBasicColor">
            <Form.Label>Color</Form.Label>
            <Form.Control 
              type="text" 
              onChange={handleChange}
              name="color"  
              value={values.color} 
              placeholder="color" 
            />
          </Form.Group>

          <Form.Group className="mb-3 create" controlId="formBasicModel">
            <Form.Label>Model Type</Form.Label>
            <Form.Control 
              type="text" 
              onChange={handleChange}
              name="modelType"  
              value={values.modelType} 
              placeholder="Model" 
            />
          </Form.Group>

          <Form.Group className="mb-3 create" controlId="formBasicInfo">
            <Form.Label>Tech Info</Form.Label>
            <Form.Control 
              type="text" 
              onChange={handleChange} 
              name="techInfo"
              value={values.techInfo}
              placeholder="Tech infos separated by comma,"
            />
          </Form.Group>

          <Form.Group className="mb-3 create" controlId="formBasicAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control 
              type="number" 
              onChange={handleChange} 
              name="amount" 
              value={values.amount} 
              placeholder="Amount" 
            />
          </Form.Group>

          <Form.Group className="mb-3 create__image__url" controlId="formBasicImage">
            <Form.Label>Image url </Form.Label>
            <Form.Control 
              type="url" 
              onChange={handleChange} 
              name="image" 
              value={values.image} 
              placeholder="image url" 
            />
          </Form.Group>

        </div>  
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
     
    </>
  )
}