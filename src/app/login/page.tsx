import LoginForm from '@/components/LoginForm/LoginForm'
import React from 'react'

const page = () => {
  return (
    <div className="container mx-auto mt-16 ">
      <h1 className="text-3xl font-bold mb-4 text-center">Iniciar Sesión</h1>
      <LoginForm />
    </div>
  )    
}

export default page