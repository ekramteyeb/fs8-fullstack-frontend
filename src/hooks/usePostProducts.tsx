
//import { addProduct, addUser, fetchProducts } from '../redux/actions'
import { useSelector } from 'react-redux'

//import { addproduct } from "../redux/actions";
//import product from "../redux/reducers/product";

import { AppState} from '../types'
//import { User } from '../types/user'

const usePostUser = async ()  => {
  
  const state = useSelector((state: AppState) => state)
  try {
    const {id, } = state.user.loggedIn
    const user = {id, }
    const response =  await fetch(`http://localhost:3001/api/v1/users/${state.user.loggedIn.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.user.loggedIn.token}`
      },
      body: JSON.stringify(state.user.loggedIn),
    })
    /*  const dispatch = useDispatch() */

    const url = `http://localhost:3001/api/v1/products${user.id}`
    console.log(url, response)
    
    /* useEffect(() => {
    dispatch(addProduct(state.user.loggedIn.cart))
    
    }, [dispatch]) */
  }catch(error){
    console.log(error)
  }
  
  /* return [] */

}
export default usePostUser
