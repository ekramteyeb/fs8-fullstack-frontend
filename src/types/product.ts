import { User } from './user'

// Action types
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const ADD_ALL_PRODUCTS = 'ADD_ALL_PRODUCTS'

// A product
export type Product = {
  id: string
  name: string
  category: string
  productCode: string
  productionYear: number
  price: number
  rating: number
  amount: number
  color: string
  warranty: number
  modelType: string
  techInfo: string[]
  image: string
  users: User[]
}
// reducers
export type AddProductAction = {
  type: typeof ADD_PRODUCT
  payload: {
    product: Product
  }
}

export type RemoveProductAction = {
  type: typeof REMOVE_PRODUCT
  payload: {
    product: Product
  }
}
export type AddAllProductsAction = {
  type: typeof ADD_ALL_PRODUCTS
  payload: {
    products: Product[]
  }
}
// Use this union in reducer
export type ProductActions =
  | AddProductAction
  | RemoveProductAction
  | AddAllProductsAction

// state
export type CartState = {
  product: Product
  quantity: number
}
export type ProductState = {
  inCart: CartState[]
  allProducts: Product[]
}
export default Product
