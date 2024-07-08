import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
    return (
      <footer className="bg-gray-800 p-6">
        <div className="container mx-auto text-center">
          <div className="text-gray-300 mb-4">
            <Link href="/" className="hover:text-white">
              Productos
            </Link>
            <span className="mx-2">|</span>
            <Link href="/officialStores" className="hover:text-white">
              Tiendas oficiales
            </Link>
            <span className="mx-2">|</span>
            <Link href="/contact" className="hover:text-white">
              Contactanos
            </Link>
          </div>
          <div className="text-gray-400">
            &copy; {new Date().getFullYear()} MundoStore. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;