"use client";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { getOrder } from "@/services/user.services";
import { IOrder } from "@/types/types";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Cart from "../ShoppingCart/Cart/Cart";

const UserProfile: React.FC = () => {
  const { userData } = useAuth();
  const [firstLetter, setFirstLetter] = useState("");
  const [orders, setOrders] = useState<IOrder[]>([]);
  const { cart } = useCart();

  const firstLetterName = (name: string | undefined) => {
    if (name && name.trim() !== "") return name.trim().charAt(0).toUpperCase();
    else return <i className="lni lni-user"></i>;
  };

  useEffect(() => {
    const letter = firstLetterName(userData?.user.name);
    setFirstLetter(letter as string);
    const handlefetchOrders = async () => {
      try {
        const token: string | undefined = userData?.token;
        const res = await getOrder(token);
        setOrders(res);
      } catch (err: any) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al obtener sus compras. Por favor, actualice la página...",
        });
      }
    };
    handlefetchOrders();
  }, [cart, userData]);


  return (
    <div className="bg-gray-200 rounded-lg shadow-md p-4">
      <div
        className="mt-0 text-center bg-gradient-to-b from-gray-800 via-blue-500 to-transparent bg-fixed bg-cover filter brightness-100 h-96"
        style={{ backgroundImage: "url('/background.jpg')" }}></div>
        <div className="relative -mt-20 -mb-20 flex justify-center">
          <a
            href="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            className="pointer-events-none rounded-full w-36 h-36 flex items-center justify-center bg-blue-500 text-white"
          >
            <span className="text-8xl">{firstLetter}</span>
          </a>
        </div>
        <div className="bg-white p-8 text-center px-5 pt-28 pb-5">
          <div className="title text-4xl">
            <strong>{userData?.user.name}</strong>
          </div>
          <br />
          <div>
            <strong>Rol:</strong> {userData?.user.role}
          </div>
          <div>
            <strong>Email:</strong> {userData?.user.email}
          </div>
          <div>
            <strong>Dirección:</strong> {userData?.user.address}
          </div>
          <div>
            <strong>Telefono de contacto:</strong> {userData?.user.phone}
          </div>
          <br />

          <div>
            <strong>Compras realizadas:</strong>
            {orders && orders.length > 0 ? (
              <ul>
                {orders.map((order, orderIndex) =>
                  order.status === "approved" ? (
                    <li className="text-xl mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl border bg-blue-200 border-gray-400 rounded-lg mt-6 p-2 pt-4" key={orderIndex}>
                      ✔️ Orden N°000{order.id} -{" "}
                      {new Date(order.date).toLocaleDateString()}:
                      <ul className="mt-4">
                        {order.products?.map((product, productIndex) => (
                        <li key={productIndex} className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                          <div className="mt-1 space-y-6">
                            <Cart key={productIndex} id={product.id} name={product.name}  price={product.price} description={product.description} image={product.image} stock={product.stock} />
                            </div>
                        </li>
                        ))}
                      </ul>
                    </li>
                  ) : null
                )}
              </ul>
            ) : (
              <p className="text-sm">
                <i>No ha realizado compras</i>
              </p>
            )}
          </div>
        </div>

    </div>
  );
};

export default UserProfile;
