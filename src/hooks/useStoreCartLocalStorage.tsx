
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { AppState } from "../types"

const useStoreCart =  () : void => {
//store state in local storage
  const state = useSelector((state: AppState) => state)

  useEffect(() => {
    localStorage.setItem('inCartState', JSON.stringify(state.product.inCart))
  }, [state.product.inCart, state.user])
  
}
export default useStoreCart 