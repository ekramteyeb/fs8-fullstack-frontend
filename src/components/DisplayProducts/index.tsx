import {useDispatch, useSelector} from 'react-redux'
import { addFavorite, addCart } from '../../redux/actions'
import { AppState } from '../../types'
import Product from '../Product'

import './style.scss'

type PropTypes = {
    products: any[]

}
export default function DisplayProducts({products}: PropTypes){
  const dispatch = useDispatch()
  const state = useSelector((state:AppState) => state)
  const favorite = state.product.favorite
  return (
    <div className="containers">
      {
        products.length > 0 ? 
          products.map((product:any) => 
            <Product 
              key={product.id} 
              product={product} 
              handleAdd={() => dispatch(addCart(product))}
              handleLike={()=> dispatch(addFavorite(product))}
              likeColor={favorite.find(p => p.product.id === product.id) ? 'purple' : ''}
            />
          ) : 
          'There is no product to display'
      }
    </div>
  )
}