import ProductDetailsTable from '@/component/product-detaails/ProductDetails'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div>
          <Suspense fallback={<div>Loading...</div>}>

      <ProductDetailsTable />
      </Suspense>
      </div>
  )
}

export default page