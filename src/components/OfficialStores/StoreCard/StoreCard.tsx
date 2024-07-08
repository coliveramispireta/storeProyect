import { IStoreCardProps } from '@/types/types';
import Image from 'next/image';
import React from 'react';

const StoreCard: React.FC<IStoreCardProps> = ({ id, name, location, phone, image }) => {
  return (

      <figure className="flex hover:bg-gray-100 flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700">
        <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{name}</h3>
        </blockquote>
        <figcaption className="flex items-center justify-center ">
            <Image className="rounded-full w-auto h-20" src={image} alt="profile picture" />
            <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                <div>{location}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 ">{phone}</div>
            </div>
        </figcaption>    
    </figure>
  );
};

export default StoreCard;
