import React from 'react'
import Card from './Card/Card'
import { IProduct } from '@/types/types'

const Cards = ( {products} : {products: IProduct[]}) => {
  return (
    <div className="flex flex-col min-h-screen">
    <main className="flex-grow container mx-auto px-4 pb-8">
      <div className="grid grid-cols-1 gap-1">
        {products.length > 0? (
          products.map((product) => (
          <Card key={product.id} {...product} />
        ))
       ) : (
          <p className="text-center">No existen productos en stock</p>
        )}
      </div>
    </main>
  </div>
);
};

export default Cards

