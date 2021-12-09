import {useDispatch} from 'react-redux'
import { addProduct } from '../../redux/actions'
import Product from '../Product'

import './style.scss'

type PropTypes = {
    products: any[]
}
export default function DisplayProducts({products}: PropTypes){
  const dispatch = useDispatch()
  return (
    <div className="containers">
      {
        products.length > 0 ? 
          products.map((product:any) => 
            <Product 
              key={product.id} 
              product={product} 
              handleAdd={() => dispatch(addProduct(product))}
              handleLike={() => alert('me')}
            />
          ) : 
          'There is no product to display'
      }
    </div>
  )
}