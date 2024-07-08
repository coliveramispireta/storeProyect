'use client'
import { ICartContextProps, IProduct, ICartSession } from '@/types/types';
import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from './AuthContext';

export const CartContext = createContext<ICartContextProps>({
  cart: null,
  totalPrice: 0,
  addToCart: () => {},
  clearCart: () => {},
  removeProduct: () => {},
});

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<ICartSession | null>(null);
  const [ totalPrice, setTotalPrice ] = useState<number>(0);
  const { userData } = useAuth();

  
  useEffect(() => { // efecto al abrir el app o si cambia de usuario logueado
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedCart = localStorage.getItem('cart');
      if (storedCart){
        const userIdstoredCart = JSON.parse(storedCart)
        const userId = userIdstoredCart.userID
        console.log('userIdstoredCart', userIdstoredCart);
        console.log('userId', userId);
        if (userData?.user.id === userId) { // si userID del userdata(authContext) usuario loguado es === al userID del cart del localstorage
        console.log("Si es el mismo usuario, mantener localstorage, hacer serCart del storage");
        setCart(JSON.parse(storedCart));
      } else {
        if(userData?.user.id){// si si existe usuarioLougueado y no es === al userID del cart del localstorage
          console.log("no el el mismo usuario, eliminar localstorage");
          localStorage.removeItem('cart');
        }
      } 
      } else {
        console.log("localstorage vacio");
      }    
    }
  }, [userData]);

  useEffect(() => { // efecto para agregar productos del cart al cart.Storage y actualizar total de precios
    if (typeof window !== 'undefined' && window.localStorage && cart) {
      localStorage.setItem('cart', JSON.stringify(cart));
      let total = 0;
      cart?.cart.forEach(item => {
        total += item.price;
      });
      setTotalPrice(total);
    }
  }, [cart]);

  const addToCart = (product: IProduct) => {
      const userId = userData?.user.id
  
      console.log('addToCart 001', userId);
      if (!cart) {
        setCart({ userID: userId, cart: [product] });
        console.log('addToCart 002', userId);
      } else {
      const productExists = cart.cart.some(item => item.id === product.id)
      if (productExists) {
        Swal.fire({
          icon: "warning",
          title: "¡Producto duplicado!",
          text: "No se puede agregar este producto, pues ya se encuentra en su carrito de compras",
        });
      } else {
        console.log('addToCart 003', userId);
        setCart(prevCart => {
          if (!prevCart) {
            return null; 
          }
          return {
            ...prevCart,
            cart: [...prevCart.cart, product],
          };
        });
       }
      }
  };

  const clearCart = () => {
    setCart(null);
  };

  const removeProduct = (productId: number) => {
    if (cart) {
      setCart(prevCart => {
        if (!prevCart) {
          return null;
        }
        return {
          ...prevCart,
          cart: prevCart.cart.filter(item => item.id !== productId), 
        };
      });
    }
  };
  

  return (
    <CartContext.Provider value={{ cart, totalPrice, addToCart, clearCart, removeProduct  }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
