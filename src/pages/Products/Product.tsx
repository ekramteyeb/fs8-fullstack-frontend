import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { AppState } from '../../types'
import Productt from '../../components/Product'


export default function Product() {
  const { id } = useParams()

  const product = useSelector((state: AppState) =>
    state.product.inCart.find((p) => p.product.id === id)
  )

  if (!product) {
    return <div>
      <h4>Default product page</h4>
      <p>there is no product to show</p>
    </div>
  }

  return (
    <>
      <h1>Product page</h1>
      <Productt 
        product={product.product} 
        handleAdd={() => alert('fix me ')} 
      
      />

    </>
  )
}
