import { useSelector, useDispatch } from "react-redux"
import { Container, ListGroup } from "react-bootstrap"
import { removeFavorite} from "../../redux/actions"
import { AppState } from "../../types"
import Image from "../../components/Image"

import './style.scss'

export default function FavoriteProduct() {
  const state = useSelector((state : AppState) => state)
  const products = state.product.favorite
  //const user = state.user.loggedIn
  
  const dispatch = useDispatch()

  return (
    <Container className='fcart__items'>
      <ListGroup >
        {products.map(product => 
          <ListGroup.Item className='fproduct__list' key={product.product.id}>
            <Image src={product.product.image} width='50px' alt={product.product.name}/>
            <div>{product.product.name}</div>
            <div>
              {`${ (product.quantity * product.product.price).toLocaleString()} €`}
            </div>
            <div>
              <button 
                className='fproduct__list__btn'
                onClick={function(){
                  product.quantity > 1 ? 
                    dispatch(removeFavorite(product.product)) : 
                    (() => window.confirm('Remove product from list?') ? dispatch(removeFavorite(product.product)): '')()
                } 
                }>
                x
              </button>
            </div>
          </ListGroup.Item>
        )}
      </ListGroup>
    </Container>
  )}