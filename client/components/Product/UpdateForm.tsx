import { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Tag, CurrencyDollar, Collection } from 'heroicons-react'
import { toast } from 'react-toastify'

import { removeItemsCart } from '../../utils/cart'
import useAuth from '../../hooks/useAuth'
import { UPDATE_PRODUCT, DELETE_PRODUCT } from '../../gql/product'

export default function CreateForm({product}) {

	const [error, setError] = useState('');
	const router = useRouter()
	const { auth } = useAuth()


	const formik = useFormik({
		initialValues: {
			name: product.name || '',
			stock: product.stock || '',
			price: product.price || ''
		},
    validationSchema: Yup.object({
      name: Yup.string().required(),
      stock: Yup.string().required(),
      price: Yup.string().required(),
    }),
    onSubmit: async (formData) => {
  		const result = await UPDATE_PRODUCT({...formData, userId: auth?.id, productId: product.id})

  		if(result) {
  			toast.success('Pruducto actualizado correctamente')
				router.push('/');
  		}
      
    }
	});

	const handleDelete = async () => {
		const result = await DELETE_PRODUCT(product.id)
		if(result) {
			removeItemsCart()
			toast.success('Pruducto eliminado correctamente')
			router.push('/');
		}
	}
	
	return (
		<div className="md:w-11/12 max-w-screen-sm mx-auto">
			<form className="flex flex-col p-4" onSubmit={formik.handleSubmit}>
				<div className="flex items-center relative">
					<Tag size={20} color="#e8a3a3" style={{zIndex: 99, left: '5px', position: 'absolute'}} />			
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

				<div className="flex items-center relative">
					<Collection size={20} color="#e8a3a3" style={{zIndex: 99, left: '5px', position: 'absolute'}} />

					<input 
						style={{paddingLeft: '25px'}}
						className="w-full text-gray-900 border-gray-400 border-2 rounded focus:outline-none focus:ring-2 focus:border-transparent pr-3 py-2 my-2"
						type="text"
						name="stock"
						placeholder="Cantidad disponible"
						onChange={formik.handleChange}
        		value={formik.values.stock}
					/>
				</div>

				<div className="flex items-center relative">
					<CurrencyDollar size={20} color="#e8a3a3" style={{zIndex: 99, left: '5px', position: 'absolute'}} />

					<input
						style={{paddingLeft: '25px'}}
						className="w-full text-gray-900 border-gray-400 border-2 rounded focus:outline-none focus:ring-2 focus:border-transparent pr-3 py-2 my-2"
						type="text"
						name="price"
						placeholder="Precio"
						onChange={formik.handleChange}
        		value={formik.values.price}
	        />
				</div>

				<button type="submit" className="bg-blue-800 px-3 py-2 mt-3 w-full rounded text-white">Actualizar producto</button>

			</form>

			<div className="px-4">
				<button onClick={handleDelete} className="bg-red-800 px-3 py-2 mt-3 w-full rounded text-white">Eliminar producto</button>
				
			</div>
	</div>
	)
}
