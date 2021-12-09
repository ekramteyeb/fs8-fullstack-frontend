import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'

import { AppState } from '../types'
import createRootReducer from './reducers'
import rootSaga from './sagas'

// access state in localstorage
//for cart items
let localCart: string | any = localStorage.getItem('inCartState')
let inCartState = JSON.parse(localCart)
// for all products
let allProductsLocalString: string | any = localStorage.getItem('allProducts')
let allProductsLocal = JSON.parse(allProductsLocalString)

//for loggedIn user
let localLoggedinUserString: any = localStorage.getItem('loggedinUser')
let loggedin = JSON.parse(localLoggedinUserString)
const initState: AppState = {
  product: {
    inCart: inCartState ? inCartState : [],
    allProducts: allProductsLocal ? allProductsLocal : [],
  },
  user: {
    loggedIn: loggedin
      ? loggedin
      : {
        id: '',
        email: '',
      },
  },
}

export default function makeStore(initialState = initState) {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware, thunk]
  let composeEnhancers = compose

  if (process.env.NODE_ENV === 'development') {
    if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
  }

  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  )

  sagaMiddleware.run(rootSaga)

  if ((module as any).hot) {
    ;(module as any).hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
