import { Card } from "react-bootstrap"
//import CustomButton from "../Button"
import Carousel from "../Carousel"
import ProductType from '../../types/product'

import './style.scss'
//import { Link } from "react-router-dom"
 type PropTypes = { 
   product : ProductType ,
   likeColor?: string,
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
handleLike,
likeColor
}:PropTypes){
  const style = {
    color:likeColor ? likeColor : 'grey',
  }
  return (
    <div className='product__div'>
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
            <i className="fa fa-heart" style={style} ></i>
          </div>
        </div>
        <Carousel className="carousel" image={image} height='20vh' />
        
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            Price {price} € 
            <span className="product__icons__div">
              <i className="fa fa-star" aria-hidden="true">{' '}{rating}</i>
              <span
                className="product__add__icon"  
                role='button' 
                tabIndex={0} 
                onKeyPress={() => alert('me')} 
                onClick={handleAdd}>
                <i className="bi bi-bag-plus"></i>
              </span>
            </span>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

