import { Card } from "react-bootstrap"
import Carousel from "../Carousel"
import ProductType from '../../types/product'

import './style.scss'
import { Link } from "react-router-dom"

 type PropTypes = { 
   product : ProductType ,
   likeColor?: string,
   handleAdd?: () => void,
   handleDetail?:() => void,
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
handleDetail,
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
        
        <Carousel className="carousel" image={image} height='30vh' />
        
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            Price {price} € 
          </Card.Text>
          <div className="product__icons__div">
            <i className="fa fa-star" aria-hidden="true">{' '}{rating}</i>
            <span
              className="product__detail__icon"  
              role='button' 
              tabIndex={0} 
              onKeyPress={() => alert('me')} 
            >
              <Link to={`/products/${id}`}><i className="fa fa-info"></i></Link>
            </span>
            <span
              className="product__add__icon"  
              role='button' 
              tabIndex={0} 
              onKeyPress={() => alert('me')} 
              onClick={handleAdd}>
              <i className="bi bi-bag-plus"></i>
            </span>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

