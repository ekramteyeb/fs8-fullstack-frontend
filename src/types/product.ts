import { User } from './user'

// Action types
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const ADD_ALL_PRODUCTS = 'ADD_ALL_PRODUCTS'

//favorite
export const ADD_FAVORITE = 'ADD_FAVORITE'
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'

//cart
export const ADD_CART = 'ADD_CART'
export const REMOVE_CART = 'REMOVE_CART'
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
  createdAt: string
  users: User[]
}
// reducers
export type AddProductAction = {
  type: typeof ADD_PRODUCT
  payload: {
    product: Product
  }
}

export type AddFavoriteAction = {
  type: typeof ADD_FAVORITE
  payload: {
    product: Product
  }
}
export type AddCartAction = {
  type: typeof ADD_CART
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

export type RemoveFavoriteAction = {
  type: typeof REMOVE_FAVORITE
  payload: {
    product: Product
  }
}
export type RemoveCartAction = {
  type: typeof REMOVE_CART
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
  | AddFavoriteAction
  | RemoveFavoriteAction
  | AddAllProductsAction
  | AddCartAction
  | RemoveCartAction

// state
export type CartState = {
  product: Product
  quantity: number
}
export type FavoriteState = {
  product: Product
  quantity: number
}
export type ProductState = {
  inCart: CartState[]
  allProducts: Product[]
  favorite: FavoriteState[]
}
export default Product
