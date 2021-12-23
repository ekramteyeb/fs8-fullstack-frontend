import { useSelector } from 'react-redux'
import { AppState} from '../types'

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
    const url = `http://localhost:3001/api/v1/products${user.id}`
    console.log(url, response)
  }catch(error){
    console.log(error)
  }
  
  /* return [] */
//not completed yet ........
}
export default usePostUser
