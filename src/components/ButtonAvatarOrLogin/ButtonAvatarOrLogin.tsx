'use client'
import { useAuth } from '@/context/AuthContext';
import React from 'react'
import ButtonLogin from '../ButtonLogin/ButtonLogin';
import ButtonAvatar from '../ButtonAvatar/ButtonAvatar';


const ButtonAvatarOrLogin = () => {
    const { userData } = useAuth();

  return (
    <>
    { userData && userData?.token ? <ButtonAvatar /> : <ButtonLogin /> }
    </>
  )
}

export default ButtonAvatarOrLogin;