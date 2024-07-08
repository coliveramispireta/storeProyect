import Link from 'next/link'
import React from 'react'

const ButtonLogin = () => {
  return (
    <Link href="/login" className="border-2 rounded-xl  border-gray-600 text-white px-4 py-2 hover:bg-gray-700 transition duration-300">
    Login
    </Link>
  )
}

export default ButtonLogin