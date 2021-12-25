import { useSelector } from 'react-redux'
import { BASE_URL } from '../resources'
import { AppState} from '../types'

const usePostUser = async ()  => {
  const state = useSelector((state: AppState) => state)
  try {
    const {id, } = state.user.loggedIn
    const user = {id, }
    const response =  await fetch(`${BASE_URL}/users/${state.user.loggedIn.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.user.loggedIn.token}`
      },
      body: JSON.stringify(state.user.loggedIn),
    })
    const url = `${BASE_URL}/products${user.id}`
    console.log(url, response)
  }catch(error){
    console.log(error)
  }
  
  /* return [] */
//not completed yet ........
}
export default usePostUser
