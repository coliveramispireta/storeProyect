'use client'
import React from 'react';
import { useCart } from '@/context/CartContext';
import { IProduct } from '@/types/types';
import OrderSummary from './OrderSummary/OrderSummary';
import Cart from './Cart/Cart';

const ShoppingCart = () => {
  const { cart, totalPrice } = useCart();
 
return (
  <>
  <section className=" py-8 antialiased dark:bg-gray-900 md:py-16">
    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
        Carrito de compras
      </h2>
      <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
          <div className="space-y-6">
  
          {cart? (
  Object.values(
    cart.cart.reduce((uniqueProducts: { [key: number]: IProduct }, currentItem: IProduct) => {
      if (!uniqueProducts[currentItem.id]) {
        uniqueProducts[currentItem.id] = currentItem;
      }
      return uniqueProducts;
    }, {})
  )
  .map((item: IProduct) => (
    <Cart
      key={item.id} 
      id={item.id}
      name={item.name}
      price={item.price}
      description={item.description}
      image={item.image}
      stock={item.stock}
    />
  ))
) : (
  <p>No hay productos en el carrito</p>
)}
          </div>
        </div>
        {cart? <OrderSummary priceTotal={totalPrice} /> : ""}
      </div>
    </div>
  </section>
  </>
);
};
export default ShoppingCart;
