import { useEffect, useState } from 'react'
import { fetchProducts } from '../redux/actions'
import { useDispatch, useSelector } from 'react-redux'

//import { addproduct } from "../redux/actions";
//import product from "../redux/reducers/product";

import { AppState} from '../types'
import Product  from '../types/product'
import { BASE_URL } from '../resources'

const useFetch = (
  search: string,
  isAsending: string,
  category: string
): [Error | unknown, Product[]] => {
  
  const [error, setError] = useState<unknown>('')
  const [filterdProducts, setFilterdProducts] = useState<Product[]>([])
  const data = useSelector((state: AppState) => state.product.allProducts)
  
  const dispatch = useDispatch()

  const url = `${BASE_URL}/products`

  useEffect(() => {
    dispatch(fetchProducts(url))
    setError('')
  }, [dispatch, url])

  useEffect(() => {
    let filterdProducts = data.filter((product: Product) =>
      product.name
        .toLowerCase()
        .concat(product.category.toLowerCase())
        .concat(
          product.color.toLowerCase()
        ) 
        .includes(search.toLowerCase())
    ).filter((product:Product) => 
      category !== '' ? 
        product.category === category :
        product
    )
      .sort((a,b) => 
        isAsending === 'asc' ? 
          a.price - b.price : 
          isAsending === 'desc' ?
            b.price - a.price :
            b.price 
      )
    setFilterdProducts(filterdProducts)
  }, [data, search, category, isAsending])

  return [error, filterdProducts]
}

export default useFetch
