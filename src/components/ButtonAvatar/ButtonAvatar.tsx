'use client'
import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ButtonAvatar: React.FC = () => {
    const { logout, userData } = useAuth();
    const [firstLetter, setFirstLetter] = useState('');
    const [firstName, setFirstName] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const firstLetterName = (name: string | undefined): string => {
        if (name && name.trim() !== '') return name.trim().charAt(0).toUpperCase();
        else return `<i className="lni lni-user"></i>`;
    };

    const firstNameData = (name: string | undefined): string => {
        if (name && name.trim() !== '') return name.split(' ')[0];
        else return '';
    };

    useEffect(() => {
        if (userData?.user) {
            const letter = firstLetterName(userData?.user.name);
            const name = firstNameData(userData?.user.name);
            setFirstLetter(letter);
            setFirstName(name);
        }   
    }, [userData]);

    const toggleDropdown = (): void => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event: MouseEvent): void => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = (): void => {
        logout(null);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <div className="flex items-center space-x-4">
                <p className="text-gray-400">¡Hola, {firstName}!</p>
                <button
                    id="dropdownNavbarLink"
                    onClick={toggleDropdown}
                    className="rounded-full w-14 h-14 flex items-center justify-center bg-blue-500 text-white"
                >
                    <p className="text-3xl">{firstLetter}</p>
                </button>
            </div>
            {isDropdownOpen && (
                <div
                    id="dropdownNavbar"
                    className="absolute right-0 mt-2 z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-auto dark:bg-gray-700 dark:divide-gray-600"
                >
                    <div className="py-1">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white pointer-events-none">{userData?.user.name}</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white -mt-4 pointer-events-none"><i>{userData?.user.email}</i></a>
                    </div>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                        <li>                                                       
                            <Link href="/inConstruction" className=" block border-2 rounded-xl  border-yellow-500  px-4 py-2 mx-6 mb-2  hover:bg-yellow-500 transition duration-300 hover:text-white text-center">Vender</Link> 
                        </li>
                        <li>
                            <Link href="/inConstruction" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">Ajustes</Link>
                        </li>            
                        <li>
                            <Link href="/userProfile" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">Mi Perfil</Link>
                        </li>
                    </ul>
                    <div className="py-1">
                        <a 
                        href="#"
                        onClick={handleLogout} 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Cerrar Sesión</a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ButtonAvatar;

