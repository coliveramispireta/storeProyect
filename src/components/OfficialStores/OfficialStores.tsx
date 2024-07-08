import React from "react";
import StoreCard from "./StoreCard/StoreCard";
import { officialStoresToPreload } from "@/helpers/officialStoresToPreload";

const OfficialStores: React.FC = () => {

  return (
    <div>
        <h2 className="text-gray-400 font-semibold text-3xl text-center mt-6"> Tiendas oficiales</h2>
   <div className="px-64 justify-center mt-8">
      <div className="grid grid-cols-3 mb-8 border  border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 bg-white dark:bg-gray-800">
        {officialStoresToPreload.map((store) => (
          <StoreCard
            key={store.id}
            id={store.id}
            name={store.name}
            location={store.location}
            phone={store.phone}
            image={store.image}
          />
        ))}
      </div>
    </div>

    </div>
 
  );
};

export default OfficialStores;
