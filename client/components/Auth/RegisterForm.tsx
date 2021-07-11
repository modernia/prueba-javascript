import { useState } from 'react'
import Link from 'next/link'
import { UserAdd, AtSymbol, User, Identification, LockClosed, LocationMarker } from 'heroicons-react'
import { useMutation } from 'react-query'
import { useFormik } from 'formik';
import { toast } from 'react-toastify'
import * as Yup from 'yup';

import { REGISTER } from '../../gql/user'

export default function RegisterForm({setShowLogin}) {

	const [error, setError] = useState('');

	const formik = useFormik({
		initialValues: initialValues(),
    validationSchema: Yup.object({
      name: Yup.string().required(),
      lastname: Yup.string().required(),
      address: Yup.string().required(),
      email: Yup.string().email('Email is no t valid').required('Email is required'),
      password: Yup.string().required('Password is required')
    }),
    onSubmit: async (formData) => {
      const data = REGISTER(formData)
      toast.success('Usuario registrado correctamente')


      setShowLogin(true)
      
    }
  });

	return (
		
			<div className="flex flex-col" style={{minHeight: '450px'}}>
				<div className="shadow-md flex flex-col mx-auto mt-3 md:w-1/3 sm:min-w-full border-green-300 border-2 ">
					<h1 className="text-blue-900 text-2xl mb-2 text-center">
						<span className="inline -mt-4">
							<UserAdd size={80} className="boder-green-300 border-2 bg-white rounded-full inline p-2" style={{marginTop: '-40px'}} />
						</span>
					</h1>
					<form className="flex flex-col p-4" onSubmit={formik.handleSubmit}>
						<div>
							<div className="flex items-center relative">
								<User size={20} color="#e8a3a3" style={{zIndex: 99, left: '5px', position: 'absolute'}} />			
								<input 
									style={{paddingLeft: '25px'}}
									className="w-full text-gray-900 border-gray-400 border-2 rounded focus:outline-none focus:ring-2 focus:border-transparent pr-3 py-2 my-2"
									type="text"
									name="name"
									placeholder="Nombre"
									onChange={formik.handleChange}
					        value={formik.values.name}
									/>
							</div>
							{
								formik.errors.name && <span className="error-input text-red-600 text-sm">{formik.errors.name}</span>
							}
							
						</div>

						<div>
							
							<div className="flex items-center relative">
								<Identification size={20} color="#e8a3a3" style={{zIndex: 99, left: '5px', position: 'absolute'}} />
								<input 
									style={{paddingLeft: '25px'}}
									className="w-full text-gray-900 border-gray-400 border-2 rounded focus:outline-none focus:ring-2 focus:border-transparent pr-3 py-2 my-2"
									type="text"
									name="lastname"
									placeholder="Apellido"
									onChange={formik.handleChange}
					        value={formik.values.lastname}
									/>
							</div>
							{
								formik.errors.lastname && <span className="error-input text-red-600 text-sm">{formik.errors.lastname}</span>
							}
						</div>

						<div>
							<div className="flex items-center relative">
								<AtSymbol size={20} color="#e8a3a3" style={{zIndex: 99, left: '5px', position: 'absolute'}} />
								<input
									style={{paddingLeft: '25px'}}
									className="w-full text-gray-900 border-gray-400 border-2 rounded focus:outline-none focus:ring-2 focus:border-transparent pr-3 py-2 my-2"
									type="text"
									name="email"
									placeholder="Correo"
									onChange={formik.handleChange}
					        value={formik.values.email}

				        />
							</div>
							{
								formik.errors.email && <span className="error-input text-red-600 text-sm">{formik.errors.email}</span>
							}
						</div>

						<div>
							<div className="flex items-center relative">
								<LockClosed size={20} color="#e8a3a3" style={{zIndex: 99, left: '5px', position: 'absolute'}} />
								<input style={{paddingLeft: '25px'}}
									className="w-full text-gray-900 border-gray-400 border-2 rounded focus:outline-none focus:ring-2 focus:border-transparent pr-3 py-2 my-2"
									type="password"
									name="password"
									placeholder="Contraseña"
									onChange={formik.handleChange}
					        value={formik.values.password}
									/>
							</div>
							{
								formik.errors.password && <span className="error-input text-red-600 text-sm">{formik.errors.password}</span>
							}
						</div>

						
						<div>
							<div className="flex items-center relative">
								<LocationMarker size={20} color="#e8a3a3" style={{zIndex: 99, left: '5px', position: 'absolute'}} />
								
								<input style={{paddingLeft: '25px'}}
									className="w-full text-gray-900 border-gray-400 border-2 rounded focus:outline-none focus:ring-2 focus:border-transparent pr-3 py-2 my-2"
									type="text"
									name="address"
									placeholder="Dirección"
									onChange={formik.handleChange}
					        value={formik.values.address}
								/>
							</div>
							{
								formik.errors.address && <span className="error-input text-red-600 text-sm">{formik.errors.address}</span>
							}
						</div>

						<button type="submit" className="bg-blue-800 px-3 py-2 mt-3 w-full rounded text-white">Registrar</button>
					</form>
					
				</div>
				
			</div>
	)
}

function initialValues() {
  return {
  	name: "",
  	lastname: "",
  	address: "",
    email: "",
    password: ""
  };
}