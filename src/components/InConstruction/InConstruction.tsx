import Link from "next/link";
import React from "react";

const InConstruction: React.FC = () => {
  return (
    <div className="flex flex-col mt-[10%]">
      <main className="container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">
          ¡Estamos trabajando en algo increíble para ti!
        </h1>
        <p className="text-gray-700 mb-4">
          Pronto te sorprenderemos con nuestro nuevo módulo.
        </p>
        <Link href="/" className="text-blue-500">
          Regresar al inicio
        </Link>
      </main>
    </div>
  );
};

export default InConstruction;
