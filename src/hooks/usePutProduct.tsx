
//import { addProduct, addUser, fetchProducts } from '../redux/actions'
import { useSelector } from 'react-redux'

//import { addproduct } from "../redux/actions";
//import product from "../redux/reducers/product";

import { AppState} from '../types'
//import { User } from '../types/user'

const usePutProduct = async ()  => {
  
  const state = useSelector((state: AppState) => state)
  const id = state.product.inCart[0].product.id
  const product = state.product.inCart[0].product
  console.log(product, 'product for put from usePut hook')
  console.log(id, 'id for product of put from usePut hook')
  
  try {
    
    const response =  await fetch(`http://localhost:3001/api/v1/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.user.loggedIn.token}`
      },
      body: JSON.stringify(state.user.loggedIn),
    })
    /*  const dispatch = useDispatch() */

    //const url = `http://localhost:3001/api/v1/products${user.id}`
    console.log(response)
    
    /* useEffect(() => {
    dispatch(addProduct(state.user.loggedIn.cart))
    
    }, [dispatch]) */
  }catch(error){
    console.log(error)
  }
  
  /* return [] */

}
export default usePutProduct
