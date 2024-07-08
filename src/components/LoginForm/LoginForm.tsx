'use client';
import React, { useState } from 'react';
import { validateLogin } from '@/helpers/validateLogin';
import { ILoginProps, ILoginPropsError, IUserSession } from '@/types/types';
import Swal from 'sweetalert2';
import Link from 'next/link';
import { loginUser } from '@/services/user.services';
import { useAuth } from '@/context/AuthContext';


const LoginForm = () => {   
const { login } = useAuth();

	const [formData, setFormData] = useState<ILoginProps>({
		email: '',
		password: '',
	  });

	const [errors, setErrors] = useState<ILoginPropsError>({
		email: '',    
		password: '',   
	  });  
	  
	  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		let updatedValue = value;
		if (name === 'email') updatedValue = value.toLowerCase();
		setFormData({ ...formData, [name]: updatedValue });
	
		const fieldErrors: ILoginPropsError = validateLogin({ ...formData, [name]: value });
		setErrors({ ...errors, [name]: fieldErrors[name] });
	  };
	
	  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const res: IUserSession = await loginUser(formData);
			const { token, user } = res
			if (token){
				setFormData({ email: '', password: ''});
			 	login({ token, user }); 
			  Swal.fire({
				title: "¡Acceso exitoso!",
				html: `	<h2>Bienvenido(a):</h2>
			 			<h4>${res.user.name}</h4>	
			 			<h5>${res.user.email}</h5>   	
			 	`,
				icon: "success",
				showCancelButton: false,
				confirmButtonColor: "#3085d6",
				confirmButtonText: "Ok"
			  }).then((result) => {
				if (result.isConfirmed || result.isDismissed) {
					window.location.reload();
				}
			  });
			}
		} 
		catch (err: any) {
			const errorMessage = err.message;
			Swal.fire({
			  icon: "error",
			  title: "Oops...",
			  text: errorMessage,
			});
		  }	
		}



	  return (
		<div className="w-96 mx-auto rounded-lg bg-gray-200 shadow-md p-4">
		  <div className="mb-8">
			<form onSubmit={handleSubmit}>
			  <input
				type="text"
				name="email"
				placeholder="Email"
				value={formData.email}
				onChange={handleChange}
                className="w-full h-10 bg-gray-300 rounded px-2 outline-none"
			  />
				{errors.email && <p className="text-red-600">{errors.email}</p>}
			  <input
				type="password"
				name="password"
				placeholder="Contraseña"
				value={formData.password}
				onChange={handleChange}
                className="w-full h-10 bg-gray-300 rounded px-2 mt-4 outline-none"
			  />
			    {errors.password && <p className="text-red-600">{errors.password}</p>}

			  <button 
              disabled={Object.values(errors).some(error =>  error !== undefined)} 
              className={`w-full h-10 bg-blue-500 text-white rounded mt-4 transition duration-300 ${
                Object.values(errors).some((error) => error !== undefined) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
              type="submit">INICIAR SESIÓN</button>
			</form>
            <div className="flex items-center justify-center">
            <p className="inline-block">¿Aún no te has registrado?</p>
            <Link href="./register" className="inline-block ml-2 font-bold text-blue-500">
            Crear cuenta
            </Link>
            </div>

		  </div>
		</div>
	  )
	};

export default LoginForm;