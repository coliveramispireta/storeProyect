'use client';
import React, { useState } from 'react';
import { validateRegister } from '@/helpers/validateRegister';
import Swal from 'sweetalert2';
import { IRegisterProps, IRegisterPropsError } from '@/types/types';
import Link from 'next/link';
import { registerUser } from '@/services/user.services';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<IRegisterProps>({
    email: '', password: '', confirmPassword: '', name: '', address: '', phone: ''
  });

  const [errors, setErrors] = useState<IRegisterPropsError>({
    email: '', password: '', confirmPassword:'', name: '', address: '', phone: ''
  });

  const [type, setType] = useState('text');
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let updatedValue = value;
    if (name === 'name') updatedValue = value.toUpperCase();
    if (name === 'email' || name === 'username') updatedValue = value.toLowerCase();
    setFormData({ ...formData, [name]: updatedValue  });

    const fieldErrors: IRegisterPropsError = validateRegister({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: fieldErrors[name] });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { confirmPassword, ...dataToSend } = formData;
     try {
     await registerUser(dataToSend);
        Swal.fire({
          icon: "success",
          title: "Bien hecho!",
          text: "¡Registro exitoso!",
        });
        setFormData({ email: '', password: '', confirmPassword: '', name: '', address: '', phone: '' });
        router.push('/login');
    } catch (err: any) {
      const errorMessage = err.message;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    }
  };

  const handleChangeType = () => {
setType('date');
  }

  return (
    <div className="w-96 mx-auto rounded-lg bg-gray-200 shadow-md p-4">
		  <div className="mb-8">
      <form onSubmit={handleSubmit} >
  <input
    type="text"
    name="name"
    placeholder="Nombre"
    value={formData.name}
    onChange={handleChange}
    className="w-full h-10 bg-gray-300 rounded px-2 outline-none"
  />
  {errors.name && <p className="text-red-600 mb-[-4%] italic">{errors.name}</p>}

  <input
    type="text"
    name="address"
    placeholder="Dirección"
    value={formData.address}
    onChange={handleChange}
    className="w-full h-10 bg-gray-300 rounded px-2 mt-4 outline-none"
  />
  {errors.address && <p className="text-red-600 mb-[-4%] italic">{errors.address}</p>}

  <input
    type="text"
    name="phone"
    placeholder="Teléfono de contacto"
    value={formData.phone}
    onChange={handleChange}
    className="w-full h-10 bg-gray-300 rounded px-2 mt-4 outline-none"
  />
  {errors.phone && <p className="text-red-600 mb-[-4%] italic">{errors.phone}</p>}

  <hr className="my-2" />

  <input
    type="text"
    name="email"
    placeholder="Correo electrónico"
    value={formData.email}
    onChange={handleChange}
    className="w-full h-10 bg-gray-300 rounded px-2 mt-4 outline-none"
  />
  {errors.email && <p className="text-red-600 mb-[-4%] italic">{errors.email}</p>}

  <input
    type="password"
    name="password"
    placeholder="Contraseña"
    value={formData.password}
    onChange={handleChange}
    className="w-full h-10 bg-gray-300 rounded px-2 mt-4 outline-none"
  />
  {errors.password && <p className="text-red-600 mb-[-4%] italic">{errors.password}</p>}

  <input
    type="password"
    name="confirmPassword"
    placeholder="Confirmar Contraseña"
    value={formData.confirmPassword}
    onChange={handleChange}
    className="w-full h-10 bg-gray-300 rounded px-2 mt-4 outline-none"
  />
  {errors.confirmPassword && <p className="text-red-600 mb-[-4%] italic">{errors.confirmPassword}</p>}

  <button
    disabled={Object.values(errors).some(error => error !== undefined)}
    className={`w-full h-10 text-white font-medium mt-4 rounded ${
      Object.values(errors).some(error => error !== undefined)
        ? 'bg-gray-600 cursor-not-allowed opacity-50'
        : 'bg-blue-600 hover:bg-blue-700'
    }`}
    type="submit"
  >
    Registrarse
  </button>
</form>

     
      </div>

      <div className="flex items-center justify-center">
            <p className="inline-block">¿Ya tienes una cuenta?</p>
            <Link href="./login" className="inline-block ml-2 font-bold text-blue-500">
            Iniciar sesión
            </Link>
            </div>

    </div>
  );
};

export default RegisterForm;