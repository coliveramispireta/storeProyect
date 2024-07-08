import React from "react";
import Link from "next/link";
import { ICategory } from "@/types/types";
import { iconsToPreLoad } from "@/helpers/iconsToPreLoad";

const Category: React.FC<ICategory> = ({ id, name }) => {
  const iconData = iconsToPreLoad.find((icon) => icon.id === id);

  return (
    <>
      <Link
        href={`/category/${id}/${name}`}
        className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-300 border-rad dark:hover:bg-gray-800 group rounded-full h-24 w-[105px] hover:bg-opacity-20"
      >
        <svg
          className="w-[35px] h-auto text-gray-400  group-hover:text-blue-400 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path fillRule="evenodd" clipRule="evenodd" d={iconData?.icon} />
        </svg>
        <span className="text-sm text-gray-300 dark:text-gray-400 group-hover:text-blue-400 dark:group-hover:text-blue-500">
          {name}
        </span>
      </Link>
    </>
  );
};

export default Category;
