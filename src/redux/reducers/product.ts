import {
  ProductState,
  ProductActions,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  ADD_CART,
  REMOVE_CART,
  ADD_ALL_PRODUCTS,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
} from '../../types/product'

export default function product(
  state: ProductState = {
    inCart: [],
    allProducts: [],
    favorite: [],
  },
  action: ProductActions
): ProductState {
  switch (action.type) {
  case ADD_PRODUCT: {
    const { product } = action.payload
    return {
      ...state,
      allProducts: [...state.allProducts, product],
    }
  }

  case REMOVE_PRODUCT: {
    const { id  } : any = action.payload
    const index = state.allProducts.findIndex((p) => p.id === id)
    return {
      ...state,
      allProducts: [...state.allProducts.splice(index, 1)],
    }
  }

  case ADD_CART: {
    const { product } = action.payload
    if (state.inCart.find((p) => p.product.id === product.id)) {
      return {
        ...state,
        inCart: [
          ...state.inCart.map((p) =>
            p.product.id === product.id
              ? { ...p, quantity: p.quantity + 1 }
              : p
          ),
        ],
      }
    }
    // Always return new state (e.g, new object) if changed
    return {
      ...state,
      inCart: [...state.inCart, { product: product, quantity: 1 }],
    }
  }

  case REMOVE_CART: {
    const { product } = action.payload
    const index = state.inCart.findIndex((p) => p.product.id === product.id)
    if (index >= 0) {
      if (state.inCart[index].quantity > 1) {
        return {
          ...state,
          inCart: [
            ...state.inCart.map((p) =>
              p.product.id === product.id
                ? { ...p, quantity: p.quantity - 1 }
                : p
            ),
          ],
        }
      } else {
        state.inCart.splice(index, 1)
        return { ...state, inCart: [...state.inCart] }
      }
    }
    return state
  }

  case ADD_FAVORITE: {
    const { product } = action.payload
    if (state.favorite.find((p) => p.product.id === product.id)) {
      return {
        ...state,
        favorite: [
          ...state.favorite.map((p) =>
            p.product.id === product.id
              ? { ...p, quantity: p.quantity + 1 }
              : p
          ),
        ],
      }
    }
    // Always return new state (e.g, new object) if changed
    return {
      ...state,
      favorite: [...state.favorite, { product: product, quantity: 1 }],
    }
  }

  // Remove from favorite list
  case REMOVE_FAVORITE: {
    const { product } = action.payload
    const index = state.favorite.findIndex((p) => p.product.id === product.id)
    if (index >= 0) {
      if (state.favorite[index].quantity > 1) {
        return {
          ...state,
          favorite: [
            ...state.favorite.map((p) =>
              p.product.id === product.id
                ? { ...p, quantity: p.quantity - 1 }
                : p
            ),
          ],
        }
      } else {
        state.favorite.splice(index, 1)
        return { ...state, favorite: [...state.favorite] }
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
