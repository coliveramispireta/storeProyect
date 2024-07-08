import { IProduct } from '@/types/types'
import Link from 'next/link';
import React from 'react'
import ButtonAddToCard from './ButtonAddToCard/ButtonAddToCard';
import Image from 'next/image';

const Detail = ( { id, name, price, description, image, stock } : IProduct) => {
  return (
   
    <div className="max-w-6xl mx-auto my-10 p-6   ">
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2">
        <Image 
        src={image} 
        alt={name} 
        className="w-full h-auto rounded-md object-cover" 
        width={1500} // Ancho original de la imagen
        height={1500} // Altura original de la imagen
        />
      </div>
      <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
        <Link href='/' className='opacity-50'>
        Regresar a Productos  
        </Link>
        <h2 className="text-3xl font-bold mb-4 mt-6">{name}</h2>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="flex items-center mb-6">
          <span className="text-3xl font-bold text-gray-900">${price.toFixed(2)}</span>
          <span className="ml-4 text-gray-600">Stock: {stock}</span>
        </div>
      <ButtonAddToCard id={id} name={name} price={price} description={description} image={image} stock={stock}/>
      </div>
    </div>
  </div>
);
};
 


export default Detail