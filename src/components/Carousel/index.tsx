import { Carousel } from 'react-bootstrap'

import './index.scss'

type PropType = {
  image : string, 
  height?: string
  className?:string
}
export default function Carousell({image, height, className}:PropType) {
  
  return (
    <Carousel variant="dark" className={className} >
      <Carousel.Item className="carouselItem">
        <img
          className="d-block w-100 myimg"
          style={{maxHeight:height}}
          src={image}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carouselItem">
        <img
          className="d-block w-100 myimg"
          style={{maxHeight:height}}
          src={image}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carouselItem">
        <img
          className="d-block w-100 myimg"
          style={{maxHeight:height}}
          src={image}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>

  )
}
