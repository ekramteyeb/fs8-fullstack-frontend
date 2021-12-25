import { useSelector } from 'react-redux'
import { BASE_URL } from '../resources'
import { AppState} from '../types'
import { ProductState } from '../types/product'

const usePutProduct = async (id:string, product:ProductState)  => {
  
  const state = useSelector((state: AppState) => state)
  try {
    
    const response =  await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.user.loggedIn.token}`
      },
      body: JSON.stringify(product),
    })
    return response
  }catch(error){
    return error
  }

}
export default usePutProduct
