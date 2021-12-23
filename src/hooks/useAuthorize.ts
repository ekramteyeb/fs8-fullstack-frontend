import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../types'

const useStoreC = (): void => {
  //store state in local storage
  const inCartState = useSelector((state: AppState) => state.product.inCart)

  useEffect(() => {
    localStorage.setItem('inCartState', JSON.stringify(inCartState))
  }, [inCartState])
}
export default useStoreC
