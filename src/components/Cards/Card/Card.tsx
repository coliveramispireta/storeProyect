import React from "react";
import { IProduct } from "@/types/types";
import Link from "next/link";
import Image from "next/image";

const Card: React.FC<IProduct> = ({
  id,
  name,
  price,
  description,
  image,
  stock,
}) => {
  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <>
      <Link href={`/product/${id}`}>
        <div className="p-6 border rounded-lg shadow-lg bg-white hover:bg-gray-100">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4">
              <Image
                src={image}
                alt={name}
                width={1500} // Ancho original de la imagen
                height={1500} // Altura original de la imagen

                className="w-full h-auto rounded-md object-cover"
              />
            </div>
            <div className="md:w-3/4 md:pl-8 mt-4 md:mt-0">
              <h2 className="text-2xl  mb-4">{name} </h2>
              <h5 className="text-base opacity-50 mb-4">
                {truncateDescription(description, 80)}{" "}
              </h5>
              <div className="flex items-center justify-end">
                <span className="text-2xl  text-gray-900">
                  ${price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
