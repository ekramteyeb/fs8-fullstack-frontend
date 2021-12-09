import { useEffect, useState } from 'react'
import { fetchProducts } from '../redux/actions'
import { useDispatch, useSelector } from 'react-redux'

//import { addproduct } from "../redux/actions";
//import product from "../redux/reducers/product";

import { AppState} from '../types'
import Product  from '../types/product'

const useFetch = (
  search: string,
  sortOrder: boolean,
  sortColumn: string
): [Error | unknown, Product[]] => {
  //const [data, setData] = useState<Product[]>([])
  const [error, setError] = useState<unknown>('')
  const [filterdProducts, setFilterdProducts] = useState<Product[]>([])
  const data = useSelector((state: AppState) => state.product.allProducts)
  
  const dispatch = useDispatch()

  const url = 'http://localhost:3001/api/v1/products'

  useEffect(() => {
    dispatch(fetchProducts(url))
    setError('')
  }, [dispatch])

  useEffect(() => {
    let filterdProducts = data.filter((product: Product) =>
      product.name
        .toLowerCase()
        /* .concat(product.region.toLowerCase())
        .concat(
          product.languages
            .map((lang) => lang.name)
            .toString()
            .toLowerCase()
        ) */
        .includes(search.toLowerCase())
    )
    //console.log(filterdProducts, "filterdProducts ");

    /* // sort array of objects by property name/key
    let sortArray = (arr: [] | any, sortBy: string, isAsending: boolean) => {
      //let firstproduct = arr.length > 0 ? arr[arr.length - 1][sortBy] : "";
      if (arr.length > 0) {
        let sorted =
          typeof arr[0][sortBy] === 'number'
            ? arr.sort((a: any, b: any) => a[sortBy] - b[sortBy])
            : Array.isArray(arr[0][sortBy])
              ? arr.sort((a: any, b: any) => a[sortBy].length - b[sortBy].length)
              : arr.sort((a: any, b: any) => {
                if (a[sortBy].toLowerCase() > b[sortBy].toLowerCase()) return 1
                if (a[sortBy].toLowerCase() < b[sortBy].toLowerCase()) return -1
                return 0
              })

        return isAsending ? sorted : sorted.reverse()
      }
    } */
    // sortArray(filterdProducts, sortColumn, sortOrder)
    // console.log(filterdSortedCountries, "filterd and sorted countries");

    setFilterdProducts(filterdProducts)
  }, [data, search, sortColumn, sortOrder])

  return [error, filterdProducts]
}

export default useFetch
