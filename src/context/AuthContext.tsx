'use client'
import React, {createContext, useContext, useState, useEffect} from 'react';
import { IAuthContextProps, IProviderProps, IUserSession } from '@/types/types';
import { useRouter } from 'next/navigation';
import { destroyCookie, setCookie } from 'nookies';

const AuthContext = createContext<IAuthContextProps>({
    userData: null,
    login: () => {},
    logout: () => {},
    setRedirectPath: () => {},
});

export const AuthProvider: React.FC<IProviderProps> = ({ children }) => {
    const [userData, setUserData] = useState<IUserSession | null>(null);
    const [redirectPath, setRedirectPath] = useState('/');
    const router = useRouter();

    useEffect(() => {
     if (userData){
      setCookie(null, 'authToken', userData.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
        localStorage.setItem('userSession', JSON.stringify(userData));
     }
    }, [userData]);

    useEffect(() => {
      if(typeof window !== 'undefined' && window.localStorage){
          const storedUserData  = localStorage.getItem('userSession');
          if (storedUserData) setUserData(JSON.parse(storedUserData));
      }
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === 'userSession') {
          if (event.newValue) {
            setUserData(JSON.parse(event.newValue));
            router.push('/');
          } else {
            setUserData(null);
            localStorage.removeItem('userSession'); 
            destroyCookie(null, 'authToken');
            setRedirectPath('/');
            window.location.reload();
          }
        }
      };
      window.addEventListener('storage', handleStorageChange);
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }, [router]);

    const login = (user: IUserSession | null) => {
      setUserData(user);
      router.push(redirectPath);
      setRedirectPath('/');
    };

    const logout = () => {
      setUserData(null);
      localStorage.removeItem('userSession'); 
      destroyCookie(null, 'authToken');
      setRedirectPath('/');
      window.location.reload();
    };

  return (
    <AuthContext.Provider
      value={{
        userData,
        login, 
        logout, 
        setRedirectPath,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
