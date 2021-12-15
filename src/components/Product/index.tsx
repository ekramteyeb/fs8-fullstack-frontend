import { Card } from "react-bootstrap"
//import CustomButton from "../Button"
import Carousel from "../Carousel"
import ProductType from '../../types/product'

import './style.scss'
import { Link } from "react-router-dom"
 type PropTypes = { 
   product : ProductType ,
   handleAdd?: () => void,
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
    <Link to={`/products/${id}`}><div className='product__div'>
      <Card className='product__card' >
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
        <Carousel className="carousel" image={image} height='25vh' />
        
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            Price {price} € <br/>
            {rating} <i className="fa fa-star" aria-hidden="true"></i>
            
          </Card.Text>
          <div className="card__details">
            {/* <hr></hr>
            model type  : {modelType} <br/>
            warranty  : {warranty} years <br/>
            category : {category}<br/>
             Technical info 
            <ul>
              {techInfo.map((info:string) => <li key={info}>{info}</li>)}
            </ul> */}
            {/* <div className="cardButtons__div">
              <Link to={`/products/${id}`}><CustomButton color="info" text="Detail" /></Link>{' '}
              <CustomButton color="success" onClick={handleAdd} width={80} text="cart"/>
            </div> */}
          </div>
          
        </Card.Body>
      </Card>
    </div>
    </Link>
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

