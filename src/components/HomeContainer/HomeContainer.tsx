import React from "react";
import Cards from "../Cards/Cards";
import { getProducts } from "@/services/products.services";
import banner1 from '../../../public/banner1.jpg';
import banner2 from '../../../public/banner2.jpg';
import banner3 from '../../../public/banner3.jpg';
import banner4 from '../../../public/banner4.jpg';
import Banner from "../Banner/Banner";
import Link from "next/link";
import { IProduct } from "@/types/types";

const HomeContainer = async ({ categoryId, name, searchID }: { categoryId: number | null; name: string | null; searchID: string }) => {
  const fetchData = await getProducts();
  
  const filteredProducts = fetchData.filter(
    (product: IProduct) => product.categoryId == categoryId
  );
 
  const decodedSearchID = decodeURIComponent(searchID);
  const searchIDsArray = decodedSearchID.split(",").map(Number);
  const searchProducts = fetchData.filter(
    (product: IProduct) => searchIDsArray.includes(product.id)
  );
  console.log("searchIDsArray", searchIDsArray)
  console.log("searchID", searchID)

  return (
    <div className="grid grid-cols-4 gap-4 p-4 justify-items-center ">
      <div id="default-carousel" className="col-span-1 p-4 w-[350px] h-[700px] mt-10 top-12 z-1 sticky" data-carousel="slide">
          <Banner banner1={banner1} banner2={banner2} banner3={banner3} banner4={banner4}/>
      </div>
      <div className="grid col-span-2 p-4 mt-1">
        <h1 className="text-gray-400 text-xl mt-4 text-left ml-5">
          {name ? ( <span><Link  href="/">Productos</Link> » {name} </span>) : ("Todos los productos")}
        </h1>
        {categoryId ? (
          <Cards products={filteredProducts} />
        ) : searchProducts != "" ? (
          <Cards products={searchProducts} />
        ) : (
          <Cards products={fetchData} />
        )}
      </div>
      <div id="default-carousel" className="col-span-1 p-4 w-[350px] h-[700px] mt-10 top-12 z-1 sticky" data-carousel="slide">
        <Banner banner1={banner3} banner2={banner4} banner3={banner1} banner4={banner2}/>
      </div>
    </div>
  );
};

export default HomeContainer;

