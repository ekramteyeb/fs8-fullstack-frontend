import {
  ProductState,
  ProductActions,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  ADD_ALL_PRODUCTS,
} from '../../types/product'

export default function product(
  state: ProductState = {
    inCart: [],
    allProducts:[],
  },
  action: ProductActions
): ProductState {
  switch (action.type) {
  case ADD_PRODUCT: {
    const { product } = action.payload
    if (state.inCart.find((p) => p.product.id === product.id)) {
      return {
        ...state,
        inCart: [...state.inCart.map(p => p.product.id === product.id ? {...p, quantity: p.quantity + 1} : p)],
      }
    }
    // Always return new state (e.g, new object) if changed
    return { ...state, inCart: [...state.inCart, {product: product, quantity : 1}] }
  }

  case REMOVE_PRODUCT: {
    const { product } = action.payload
    const index = state.inCart.findIndex((p) => p.product.id === product.id)
    if (index >= 0) {
      if(state.inCart[index].quantity > 1){
        return {
          ...state,
          inCart: [
            ...state.inCart.map((p) =>
              p.product.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
            ),
          ],
        }
      }else{
        state.inCart.splice(index, 1)
        return { ...state, inCart: [...state.inCart] }
      }
    }
    return state
  }

  case ADD_ALL_PRODUCTS: {
    const { products } = action.payload
    return { ...state, allProducts: products }
  }
  default:
    return state
  }
}
