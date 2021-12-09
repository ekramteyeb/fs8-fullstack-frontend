import { Button, Card } from "react-bootstrap"
import CustomButton from "../Button"
import Carousel from "../Carousel"

import './style.scss'
type ProbTypes = { product : {
  name: string,
  category:string,
  productCode:string,
  image:string,
  price:number,
  productionYear:string,
  rating:number, 
  modelType: string,
  warranty: number, 
  techInfo:string[]
}}
export default function Product({product:{name, category, productCode, image, price, productionYear, rating, warranty, modelType, techInfo }}:ProbTypes){
  return (
    <div className='product__div'>
      <Card className='product__card'>
        {/* <Card.Img variant="top" src={image} ></Card.Img> */}
        <small className='product__code'>#{productCode}</small>
        <Carousel className="carousel" image={image} height='45vh' />
        <hr></hr>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            price  : {price} €<br/>
            year model : {productionYear}<br/>
            model type  : {modelType} <br/>
            warranty  : {warranty} years <br/>
          </Card.Text>
          <div className="card__details">
            <hr></hr>
            customer rating : {rating} <br/>
            category : {category}<br/>
            Technical info 
            <ul>
              {techInfo.map((info:string) => <li key={info}>{info}</li>)}
            </ul>
            <hr></hr>
            <CustomButton color="info" text="Details" onClick={()=> alert('amcliked')}/>{' '}
            <Button variant="success">add to cart</Button>
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

