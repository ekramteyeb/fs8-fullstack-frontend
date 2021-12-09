import { Button, Card } from "react-bootstrap"
import CustomButton from "../Button"
import Carousel from "../Carousel"
import ProductType from '../../types/product'

import './style.scss'
 type PropTypes = { 
   product : ProductType ,
   handleAdd: () => void,
   handleLike? : () => void
} 
export default function Product({product:{
  id,
  name, 
  category,
  color,
  productCode, 
  price, 
  productionYear, 
  rating, 
  warranty, 
  modelType, 
  techInfo,
  image,
  users
  
},
handleAdd,
handleLike
}:PropTypes){
  return (
    <div className='product__div'>
      <Card className='product__card'>
        <div className='product__top'>
          <small className='product__code'>
            #{productCode}
          </small>
          <div 
            className="product__heart__icon"  
            role='button' 
            tabIndex={0} 
            onKeyPress={() => alert('me')} 
            onClick={handleLike}>
            <i className="fa fa-heart"  ></i>
          </div>
        </div>
        <Carousel className="carousel" image={image} height='45vh' />
        <hr></hr>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            price  : {price} €<br/>
            year model : {productionYear}<br/>
            rating : {rating} <br/>
          </Card.Text>
          <div className="card__details">
            <hr></hr>
            model type  : {modelType} <br/>
            warranty  : {warranty} years <br/>
            category : {category}<br/>
            {/* Technical info 
            <ul>
              {techInfo.map((info:string) => <li key={info}>{info}</li>)}
            </ul> */}
            <hr></hr>
            <CustomButton color="info" text="Details" onClick={()=> alert('amcliked')}/>{' '}
            <Button variant="success" onClick={handleAdd}>add to cart</Button>
          </div>
          
        </Card.Body>
      </Card>
    </div>
      
  )
}

/* <div className='product'>
       <Carousel image={image}/>
      <hr></hr>
      <h3>{name}</h3>
      <p>{category}</p>
      <p>{productCode}</p>
      <p>{price} euro </p>
      <p>Produced in : {productionYear}</p>
      <p>rating {rating }</p>
      <Button variant="info">{name}</Button>
    </div> */

