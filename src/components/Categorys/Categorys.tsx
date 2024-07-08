import React from 'react'
import { ICategory } from '@/types/types'
import { getCategorys } from '@/services/categorys.services';
import Category from "./Category/Category";

const Categorys = async () => {
    const fetchDataCategorys : ICategory[] = await getCategorys();
  return (
    <>
    
<div className="left-0 z-50 w-full -mb-6 -mt-3">
    <div className="row h-full items-center justify-center mx-auto font-medium">
    {fetchDataCategorys && fetchDataCategorys.map((MyCategory) => (
          <Category key={MyCategory.id} {...MyCategory} />
        ))}
    </div>
</div>

      
  </>
);
};

export default Categorys
