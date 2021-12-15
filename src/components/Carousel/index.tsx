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
        {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item className="carouselItem">
        <img
          className="d-block w-100 myimg"
          style={{maxHeight:height}}
          //data-src="holder.js/800x100?text=Second slide&bg=282c34"
          src={image}
          alt="Second slide"
        />{/* 
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item className="carouselItem">
        <img
          className="d-block w-100 myimg"
          style={{maxHeight:height}}
          //src="holder.js/800x400?text=Third slide&bg=20232a"
          src={image}
          alt="Third slide"
        />
        {/* <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>

  )
}
