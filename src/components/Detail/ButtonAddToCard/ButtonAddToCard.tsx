'use client'
import { useAuth } from '@/context/AuthContext';
import React from 'react'
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { IProduct } from '@/types/types';
 
const ButtonAddToCard = ( { id, name, price, description, image, stock } : IProduct) => {
    const {userData, setRedirectPath } = useAuth();
    const router = useRouter();
    const { addToCart } = useCart();

    const handleAddToCard = () => {
        if (!userData?.token) {
            setRedirectPath('/cart'); 
            router.push('/login');

        }else {
            const quantity = 1;
            router.push('/cart');
            const product = { id, name, price, description, image, stock, quantity };
            addToCart(product);
        }   
      };

  return (
    <button 
    onClick={handleAddToCard}
    className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200">
      Comprar Ahora
    </button>
  )
}

export default ButtonAddToCard