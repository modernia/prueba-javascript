import { useState } from 'react'
import { useRouter } from 'next/router'

import Link from 'next/link'
import { UserAdd, AtSymbol, User, Identification, LockClosed, LocationMarker } from 'heroicons-react'
import { useMutation } from 'react-query'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify'
import { removeItemsCart } from '../../utils/cart'

import { UPDATE_USER, DELETE_USER } from '../../gql/user'
import useAuth from '../../hooks/useAuth';



export default function EditProfile({user, logout}) {

	const [error, setError] = useState('');
  const { auth } = useAuth();
	const router = useRouter()



	const formik = useFormik({
		initialValues: {
			name: user.name || "",
	  	lastname: user.lastname || "",
	  	address: user.address || "",
	    email: user.email || "",
		},
    validationSchema: Yup.object({
      name: Yup.string().required("Los nombres son requeridos"),
      lastname: Yup.string().required("Apellido es requerido"),
      address: Yup.string().required("Dirección es requerida"),
      email: Yup.string().email('Correo no valido').required('Ingresa un correo'),
    }),
    onSubmit: async (formData) => {
      try {
      	const result = await UPDATE_USER({...formData, userId: user.id})
      	toast.success('Datos actualizados correctamente')

	      logout()
      } catch (error) {
      	toast.error('No se ha podido actualizar tus datos')
      }
      
    }
  });

  const handleDelete = async () => {

    DELETE_USER(auth.id).then((result) => {
	  	logout();
			removeItemsCart()
	    router.push('/');
    })
    	
  }

	return (
		
			<div className="box-border flex flex-col mt-4 md:w-11/12 max-w-screen-sm mx-auto" style={{minHeight: '450px'}}>
				<div className="shadow-md flex flex-col mx-auto mt-3 md:w-1/3 sm:min-w-full border-green-300 border-2 ">
					<h1 className="text-blue-900 text-2xl mb-2 text-center pt-4">
						Información de tu cuenta
					</h1>
					<form className="flex flex-col p-4" onSubmit={formik.handleSubmit}>
						<div>
							<label htmlFor="">Nombre</label>
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
					        disabled={auth.id !== user.id}

								/>

							</div>
							{
								formik.errors.name && <span className="error-input text-red-600 text-sm">{formik.errors.name}</span>
							}
						</div>

						<div>
							<label htmlFor="">Apellidos</label>
							
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
					        disabled={auth.id !== user.id}
									/>
							</div>
							{
								formik.errors.lastname && <span className="error-input text-red-600 text-sm">{formik.errors.lastname}</span>
							}
						</div>

						<div>
							<label htmlFor="">Correo</label>
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
					        disabled={auth.id !== user.id}

				        />
							</div>
							{
								formik.errors.email && <span className="error-input text-red-600 text-sm">{formik.errors.email}</span>
							}
						</div>
						
						<div>
							<label htmlFor="">Dirección</label>
							<div className="flex items-center relative">
								<LocationMarker size={20} color="#e8a3a3" style={{zIndex: 99, left: '5px', position: 'absolute'}} />
								
								<input style={{paddingLeft: '25px'}}
									className="w-full text-gray-900 border-gray-400 border-2 rounded focus:outline-none focus:ring-2 focus:border-transparent pr-3 py-2 my-2"
									type="text"
									name="address"
									placeholder="Dirección"
									onChange={formik.handleChange}
					        value={formik.values.address}
					        disabled={auth.id !== user.id}
								/>
							</div>
							{
								formik.errors.address && <span className="error-input text-red-600 text-sm">{formik.errors.address}</span>
							}
						</div>

						{
							auth.id === user.id && <button type="submit" className="bg-blue-800 px-3 py-2 mt-3 w-full rounded text-white">Actualizar mis datos</button>
						}

						{
							auth.id === user.id && <button onClick={handleDelete} className="bg-red-800 px-3 py-2 mt-3 w-full rounded text-white">Eliminar mi cuenta</button>
						}
						
					</form>

					
				</div>
				
			</div>
	)
}
