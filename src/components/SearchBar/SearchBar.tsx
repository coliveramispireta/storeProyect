"use client";
import { getProducts } from "@/services/products.services";
import React, { useEffect, useState } from "react";
import { IProduct } from "@/types/types";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [data, setData] = useState<IProduct[]>([]);
  const [dataID, setDataID] = useState<number[]>([]);
  const [value, setValue] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProducts();
        setData(res);
        console.log("res SeachBar", res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleChangeOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.toLowerCase();
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(inputValue)
    );

    if (inputValue.length < 1) {
      setDataID([]);
      router.push(`/`);
    } else {
      const matchingItem = filteredData.find(
        (item) => item.name.toLowerCase() === inputValue
      );
      const idsArray = filteredData.map((item) => item.id);
      if (idsArray.length < 1) {
        setValue(false);
      } else if (matchingItem) {
        const idsArrayMatch = [matchingItem.id];
        setDataID(idsArrayMatch);
        router.push(`/search/${idsArray}`);
        setValue(true);
      } else {
        setDataID(idsArray);
        setValue(true);
      }
    }
  };

  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSendSearch();
  };

  const handleSendSearch = () => {
    if (dataID.length < 1) router.push(`/`);
    else router.push(`/search/${dataID}`);
  };

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div className="text-white">
      <div className="relative">
        <form onSubmit={handleSubmitSearch}>
          <input
            type="text"
            placeholder="Buscar productos..."
            className="bg-gray-700 text-gray-300 rounded-full pl-5 pr-20 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            list="dataListOptions"
            onChange={handleChangeOptions}
          />

          {value ? (
            <datalist id="dataListOptions">
              {data.map((item) => (
                <option key={item.id}>{item.name}</option>
              ))}
            </datalist>
          ) : (
            <p className="text-sm fixed border text-gray-200 border-gray-500 rounded-xl p-2  bg-gray-900">No hay productos relacionados a su búsqueda</p>
          )}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5 text-gray-400 absolute right-5 top-1/2 transform -translate-y-1/2"
            onClick={handleSendSearch}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1114.5 9.5a7.5 7.5 0 012.15 14.15z"
            />
          </svg>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
