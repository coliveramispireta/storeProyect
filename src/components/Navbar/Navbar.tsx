import Link from "next/link";
import React from "react";
import logo from "../../../public/logo.png";
import cart from "../../../public/carrito-de-compras.png";
import Image from "next/image";
import Categorys from "../Categorys/Categorys";
import ButtonAvatarOrLogin from "../ButtonAvatarOrLogin/ButtonAvatarOrLogin";
import SearchBar from "../SearchBar/SearchBar";

const Navbar: React.FC = () => {
  return (
    <nav className=" w-full bg-gradient-to-b from-black via-gray-800 to-blue-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="mb-[-3%]">
          <Link href="/">
            <Image
              src={logo.src}
              alt="Descripción de la imagen"
              className="w-80 h-auto transform animate-spin"
              width={1000}
              height={1000}
            />
          </Link>
        </div>
       < SearchBar />
        <div className="flex space-x-4 items-center">
          <Link href="/" className="text-gray-300 hover:text-white">
            Productos
          </Link>
          <Link href="/officialStores" className="text-gray-300 hover:text-white">
            Tiendas oficiales
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-white">
            Contactanos
          </Link>
          <Link
            href="/cart"
            className="filter brightness-0 invert grayscale relative"
          >
            <Image
              src={cart.src}
              alt="Descripción de la imagen"
              width={35}
              height={35}
            />
          </Link>
          <ButtonAvatarOrLogin />
        </div>
      </div>
      <div className="container  mx-auto justify-between text-center items-center">
        <div className=" mt-5 mb-2 space-x-4">
          <Categorys />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
