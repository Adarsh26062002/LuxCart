import Product from '@/components/Product'
import React from 'react'

const NewProduct = () => {
  return (
    <>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="m-4 text-sm text-gray-500">Let's create a new product! 🎉</p>
        </div>
        <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
        </div>
      </div>

      <hr className="h-px border-0 bg-gray-200" />

      <div className='my-10'>
          <Product/>
      </div>
    </>
  )
}

export default NewProduct