import { takeLatest } from 'redux-saga/effects'

import { ADD_PRODUCT, AddProductAction } from '../../types/product'

function* doSomethingWhenAddingProduct(action: AddProductAction) {
  yield console.log(action)
}
const Array = [takeLatest(ADD_PRODUCT, doSomethingWhenAddingProduct)]
export default Array
