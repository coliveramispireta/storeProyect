import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { createOrder } from '@/services/orders.services';
import { ICreateOrderParams } from '@/types/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'
import Swal from 'sweetalert2';

interface OrderSummaryProps {
  priceTotal: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ priceTotal }) => {
  const { userData } = useAuth();
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const handleCheckAuth = () => {
    if (!userData?.token) {
        router.push('/login');
        return;
      }
      handleAddToCart();
    };
  const handleAddToCart = async () => {
    try {
        const products = cart?.cart;
        const params: ICreateOrderParams = { cart: products, token: userData?.token };
        await createOrder(params);
        Swal.fire({
                    icon: "success",
                    title: "¡Bien hecho!",
                    text: "Compra realizada con éxito",
                  });
        clearCart();      
      } 
    catch (err: any) {
        const errorMessage = err.message;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorMessage,
        });
      }	
    }

  return (
    <div className=" mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
    <div className="bg-blue-900 space-y-4 rounded-lg border border-gray-200 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
      <p className="items-center text-center text-xl font-semibold text-gray-200 dark:text-white">Resumen de Compra</p>
      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="mt-4  text-base font-normal text-gray-200 dark:text-gray-400">Nombre</dt>
            <dd className="mt-4 text-base font-normal text-gray-200 dark:text-white">{userData?.user.name }</dd>
          </dl>
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-200 -mt-1 dark:text-gray-400">Email</dt>
            <dd className="text-base font-normal text-gray-200 -mt-1">{userData?.user.email}</dd>
          </dl>         
        </div>
        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
          <dt className="text-base text-gray-200">Subtotal</dt>
          <dd className="text-base text-gray-200">$ {priceTotal}</dd>
        </dl>
        <dl className="flex items-center justify-between gap-4">
          <dt className="text-base text-gray-200 -mt-3">Descuentos</dt>
          <dd className="text-base text-gray-200 -mt-3">$ 0</dd>
        </dl>
        <dl className="flex items-center justify-between gap-4">
          <dt className="text-base text-gray-200 -mt-3">Costo de envío</dt>
          <dd className="text-base text-gray-200 -mt-3">$ 0</dd>
        </dl>
        <dl className="flex items-center justify-between gap-4">
          <dt className="text-base text-gray-200 -mt-3">Total</dt>
          <dd className="text-base text-gray-200 -mt-3">$ {priceTotal}</dd>
        </dl>
      </div>
      <button onClick={handleCheckAuth} className="flex w-full items-center justify-center rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
      <dl className="flex items-center justify-between gap-4">
          <dt className="text-base text-gray-200 ">Pagar</dt>
          <dd className="text-base text-gray-200 ">$ {priceTotal}</dd>
        </dl>
      </button>
      <div className="flex items-center justify-center gap-2">
        <span className="text-sm font-normal text-gray-200 dark:text-gray-100"> or </span>
        <Link href="/" title="" className=" text-gray-200 inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
          Continue Comprando
          <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
          </svg>
        </Link>
        
      </div>
    </div>
  </div>
  )
}

export default OrderSummary