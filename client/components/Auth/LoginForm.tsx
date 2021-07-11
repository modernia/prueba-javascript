import { useState } from 'react'
import Link from 'next/link'
import { BadgeCheck, AtSymbol, LockClosed } from 'heroicons-react'
import { useMutation } from 'react-query'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify'


import { LOGIN } from '../../gql/user';
import { setToken, decodeToken } from '../../utils/token';
import useAuth from '../../hooks/useAuth';

export default function LoginForm({setShowLogin}) {

	const [error, setError] = useState('');

  const { getUser, auth, setUser } = useAuth();

	const formik = useFormik({
		initialValues: initialValues(),
    validationSchema: Yup.object({
      email: Yup.string().email('Email is no t valid').required('Email is required'),
      password: Yup.string().required('Password is required')
    }),
    onSubmit: async (formData) => {
      try {
        const { token } = await LOGIN(formData)
        setToken(token);
        setUser(decodeToken(token));
        toast.success('Iniciando sesión')

        setError('');

      } catch (error) {
        toast.error(error.message)
        setError(error.message);
      }
      
    }
  });

	return (
		
			<div className="flex flex-col" style={{minHeight: '350px'}}>
				<div className="shadow-md flex flex-col mx-auto mt-3 md:w-1/3 sm:min-w-full border-green-300 border-2 ">
					<h1 className="text-blue-900 text-2xl mb-2 text-center">
						<span className="inline -mt-4">
							<BadgeCheck size={80} className="boder-green-300 border-2 bg-white rounded-full inline p-2" style={{marginTop: '-40px'}} />
						</span>
					</h1>
					<form className="flex flex-col p-4" onSubmit={formik.handleSubmit}>

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

						<button type="submit" className="bg-blue-800 px-3 py-2 mt-3 w-full rounded text-white">Iniciar</button>
					</form>
					
				</div>
				
			</div>
	)
}

function initialValues() {
  return {
    email: "",
    password: ""
  };
}