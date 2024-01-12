import Link from 'next/link'
import React from 'react'

const Products = () => {
  return (
    <>
    <header>
        <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">All Products</h1>
              <p className="mt-1.5 text-sm text-gray-500">Let's create a new product! 🎉</p>
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              <Link
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-orange-200 px-5 py-3 text-orange-500 transition hover:bg-gray-50 hover:text-green-600 hover:border-green-600 focus:outline-none focus:ring"
                href='/products/new'
              >
                <span className="text-sm font-medium"> Create Product </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

              </Link>
            </div>
          </div>
        </div>
      </header>

      <hr className='my-1 h-px border-0 bg-gray-100'/>

      <p className='mt-4'>No products</p>
    </>
  )
}

export default Products