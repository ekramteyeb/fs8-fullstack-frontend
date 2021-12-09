import { useSelector, useDispatch } from "react-redux"
import { Container, Form, ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
import CustomButton from "../../components/Button"
import { addProduct, removeProduct } from "../../redux/actions"
import { AppState } from "../../types"
import Image from "../../components/Image"

import './style.scss'

export default function Products() {
  const products = useSelector((state : AppState) => state.product.inCart)
  const freeShippingAmout = 850
  const totalPrice = products.reduce((a, b) => a + (b.quantity * b.product.price), 0)
  const shippingCost = (products.length === 0) ? 0 : (totalPrice > freeShippingAmout) ? 0 : 10
  const dispatch = useDispatch()

  return (
    <Container className='cart__items'>
      <div className='cart__items__top'>
        <h5>Your Shopping cart : {products.length} items</h5> 
        <Link to='/'>
          <CustomButton 
            text='Continue Shopping' 
            color='info'
          />
        </Link>
      </div>
      <ListGroup >
        {products.map(product => 
          <ListGroup.Item className='product__list' key={product.product.id}>
            <Image src={product.product.image} width='150px' alt={product.product.name}/>
            <div>{product.product.name}</div>
            <div>
              {`${ (product.quantity * product.product.price).toLocaleString()} €`}
            </div>
            <div>
              {` x  ${product.quantity} `
              }
              <button 
                className='product__list__btn'
                onClick={()=> 
                  dispatch(addProduct(product.product)
                  )}>
                +
              </button>
              <button 
                className='product__list__btn'
                onClick={function(){
                  product.quantity > 1 ? 
                    dispatch(removeProduct(product.product)) : 
                    (() => window.confirm('Remove product from cart?') ? dispatch(removeProduct(product.product)): '')()
                } 
                }>
                -
              </button>
            </div>
          </ListGroup.Item>
        )}
      </ListGroup>
      <div className='product__list__price'>
        <hr></hr>
        <span>
          <p>Total items price </p>
          <p>€ {totalPrice.toLocaleString()}
          </p>
        </span> 
        <span>
          <p>Shipping cost</p>
          <p>€ {shippingCost.toLocaleString()}
          </p>
        </span> 
        <span>
          <p>Total incl. VAT</p>
          <p>€ {(totalPrice + shippingCost).toLocaleString()}
          </p>
        </span> 
        <hr></hr>
      </div>
      <div className='product__list__delivery'>
        <h5>Choose delivery Method</h5>
        <hr></hr>
        <Form>
          {['radio'].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <div>
                <Form.Check
                  inline
                  label="Parcel Post"
                  value="parcelpost"
                  name="group1"
                  type={'radio'}
                  id={`inline-${type}-1`}
                />
                <small>
                  {shippingCost} €. Delivery time is about 2-4 working days
                </small>
                {(freeShippingAmout - totalPrice) > 0 ? 
                  <p className='product__freeShipping' >
                    <small>
                      {freeShippingAmout - totalPrice} € left for free Shipment
                    </small>
                  </p> : 
                  ''
                }                
              </div>
              <hr></hr>
              <div>
                <Form.Check
                  inline
                  value="homedelivery"
                  label="Home package"
                  name="group1"
                  type={'radio'}
                  id={`inline-${type}-2`}
                />
                <small>
                  14 €. Delivered to your door. You will be contacted to arrange delivery time.
                </small>
              </div>
            </div>
          ))}
        </Form>
        <hr></hr>
        <div className='product__list__user'>
          <h5>Your information</h5>
          <hr></hr>
          <div>
            <p>user name : your name </p>
            <p>address : your address </p>
            <p>telephone : your telephone number</p>
            <p>.....coming soon , under construction </p>
          </div>
          <hr></hr>
        </div>
        <div className='product__list__payments'>
          <h5>Payments</h5>
          <hr></hr>
          <Form.Check
            inline
            label="Card or Online Bank Transfer"
            value="banktransfer"
            name="group2"
            type={'radio'}
            id={`inline-${'radio'}-1`}
          />
          <hr></hr>
          <Form.Check
            inline
            label="Pay with Card "
            value="cardpayment"
            name="group2"
            type={'radio'}
            id={`inline-${'radio'}-1`}
          />
          <hr></hr>
          <Form.Check
            inline
            label="Financing "
            value="financing"
            name="group2"
            type={'radio'}
            id={`inline-${'radio'}-1`}
          />
        </div>
        <div>
          <ListGroup className='product__list__summery'>
            <h5>Summery</h5>
            {products.map(product => 
              <ListGroup.Item 
                className='product__list' 
                key={product.product.id}>
                <span>{product.quantity} x {' '}
                  {product.product.name}
                </span>
                <span>
                  {(product.quantity * product.product.price).toLocaleString()} €
                </span>
              </ListGroup.Item>
            )}
            <ListGroup.Item className='product__list bold'>
                Total  
              <span>
                {totalPrice.toLocaleString()} €
              </span> 
            </ListGroup.Item>
            <ListGroup.Item className='product__list bold'>
                VAT  
              <span>
                {(totalPrice * 0.24).toLocaleString()} €
              </span> 
            </ListGroup.Item>
          </ListGroup>
        </div>
        <div>
          <ListGroup className='product__list__buynow'>
            <ListGroup.Item className='product__buynow__item'>
              <h3>Total</h3>
              {totalPrice.toLocaleString()} € <br/><br/>
              <CustomButton 
                text='Buy now' 
                color='danger' 
                width={270} 
                onClick={function()  {
                  (products.length > 0) ?
                    alert(`
                  Congratulations !! Your shopping is successful.
                  Total price,${totalPrice}
                  Number of items, ${products.length}
                  Delivery , ${'home delivery'}
                  Payment method, ${'bank transfer'}

                  ▬▬▬▬▬▬▬▬▬ஜ۩۞۩ஜ▬▬▬▬▬▬▬▬▬
                  THANK YOU ! See you again 
                `) : alert('Your car is empty') }
                }
              />
            </ListGroup.Item>
          </ListGroup>
        </div>
      </div>
    </Container>
  )
}