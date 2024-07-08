import { useCart } from '@/context/CartContext';
import { IProduct } from '@/types/types'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import Swal from 'sweetalert2';
 
const Cart = ({ id, name, price, description, image, stock }: IProduct) => {
  const pathname = usePathname()
  const { removeProduct } = useCart();

  const handleRemoveClick = () => { 
    removeProduct(id);
  };

  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <a  href='#' className="pointer-events-none shrink-0 md:order-1">
          <Image className="h-20 w-20" src={image} alt="imac image" />
        </a>
        <div className="flex items-center justify-between md:order-3 md:justify-end">

          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold text-gray-900 dark:text-white">
              {pathname === '/cart' && ('$ ' + price)}
            </p>
          </div>
        </div>

        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-xl">
            {name}
          </h2>
          <a
            href="#"
            className="pointer-events-none text-base font-medium text-gray-600 hover:underline dark:text-white"
          >
            {truncateDescription(description, 110)}{" "}
          </a>
          <div className="flex items-center gap-4">
            <Link
              href={`/product/${id}`}
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
            >
              Ver descripción
            </Link>
            {pathname === '/cart' ? (
              <button
              type="button"
              onClick={handleRemoveClick}
              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
            >
              <svg
                className="me-1.5 h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
              Quitar
            </button>
          ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;