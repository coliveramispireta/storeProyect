
import RegisterForm from '@/components/RegisterForm/RegisterForm'
import React from 'react'

const page = () => {
  return (
    <div className="container mx-auto mt-16 mb-16">
      <h1 className="text-3xl font-bold mb-4 text-center">Registrate</h1>
      <RegisterForm />
    </div>
  )    
}

export default page