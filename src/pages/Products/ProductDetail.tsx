import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../types'
import { Button} from 'react-bootstrap'
import Carousel from '../../components/Carousel'
import CustomButton from '../../components/Button'
import { addProduct } from '../../redux/actions'

import './product.scss'

export default function Product() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const state = useSelector((state: AppState) => state)
  const product  = state.product.allProducts.find((p) => p.id === id)
  
  const user = state.user.loggedIn
  if (!product) {
    return <div className="product__details__div">
      <h4>Product details page</h4>
      <p>there is no product to show</p>
     
    </div>
  }
  const printStar = (x: number) => {
    let stars = []
    for(let i = 0; i < x ; i++){
      stars.push(
        <i 
          className="fa fa-star details__fa__icons" 
          aria-hidden="true"
        >
        </i>
      )
    }
    return stars
  }
  return (
    <div className="product__details__div container">
      <div className="left">
        <Carousel 
          className="carousel__details" 
          image={product.image} 
          height='195vh' 
        />
        <hr></hr>

            Customer rating : 
        <div className="product__details__stars">
          {product.rating > 0 ? 
            printStar(product.rating).map((p, index)=> 
              <span key={index}>
                {p}
              </span>
            ) :
            0
          }
        </div> 
      </div>
      
      <div className='product__details__card'>
        
        <h4>{product.name}</h4>
        <hr></hr>
        <div>
            #{product.productCode}<br/>
            price  : {product.price} €<br/>
            year model : {product.productionYear}<br/>
            model type  : {product.modelType} <br/>
            warranty  : {product.warranty} years <br/>
            category : {product.category}<br/>
            color: {product.color}<br/>
            Available : {product.amount}
            Technical info : 
          
          {product.techInfo.map((info:string) =>
            <li key={info}>
              {info}
            </li>
          )
          }
          
         
         
          
          {product.users.length} items sold
          
            
        </div>
        <hr></hr>
        <Link to="/">
          <CustomButton 
            color="info" 
            text="Back" 
          />
        </Link>
        {' '}
        <Button 
          variant="success" 
          onClick={() => 
            dispatch(addProduct(product))
          }
        >
                add to cart
        </Button>
        {' '}
        {
          user.isAdmin ? 
            <Link to="/admin">
              <CustomButton 
                color="warning" 
                text="Back to Admin" 
              />
            </Link> : 
            ''
        }
          
      </div>
    </div>
  )
}

