import { Dispatch } from 'redux'

import {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  ADD_FAVORITE,
  ADD_CART,
  REMOVE_CART,
  REMOVE_FAVORITE,
  ADD_ALL_PRODUCTS,
  ProductActions,
  Product,
} from '../../types/product'

export function addProduct(product: Product): ProductActions {
  return {
    type: ADD_PRODUCT,
    payload: {
      product,
    },
  }
}

export function removeProduct(product: Product): ProductActions {
  return {
    type: REMOVE_PRODUCT,
    payload: {
      product,
    },
  }
}

export function addCart(product: Product): ProductActions {
  return {
    type: ADD_CART,
    payload: {
      product,
    },
  }
}

export function removeCart(product: Product): ProductActions {
  return {
    type: REMOVE_CART,
    payload: {
      product,
    },
  }
}
export function addFavorite(product: Product): ProductActions {
  return {
    type: ADD_FAVORITE,
    payload: {
      product,
    },
  }
}

export function removeFavorite(product: Product): ProductActions {
  return {
    type: REMOVE_FAVORITE,
    payload: {
      product,
    },
  }
}
export function fetchAllProducts(products: Product[]): ProductActions {
  return {
    type: ADD_ALL_PRODUCTS,
    payload: {
      products,
    },
  }
}
// Async action processed by redux-thunk middleware
export function fetchProducts(url: string) {
  return (dispatch: Dispatch) => {
    return fetch(url)
      .then((resp) => resp.json())
      .then((products) => {
        localStorage.setItem('allProducts', JSON.stringify(products))
        dispatch(fetchAllProducts(products))
      })
  }
}
