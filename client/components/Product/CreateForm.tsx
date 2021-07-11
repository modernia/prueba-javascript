import { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Tag, CurrencyDollar, Collection } from 'heroicons-react'
import { toast } from 'react-toastify'


import { CREATE_PRODUCT } from '../../gql/product'

export default function CreateForm({image}) {

	const [error, setError] = useState('');
	const router = useRouter()

	const formik = useFormik({
		initialValues: initialValues(),
    validationSchema: Yup.object({
      name: Yup.string().required(),
      stock: Yup.string().required(),
      price: Yup.string().required(),
    }),
    onSubmit: async (formData) => {
    	console.log(image)
    	if(image !== null){
      		const result = await CREATE_PRODUCT({...formData, image})

      		if(result) {
      			toast.success('Pruducto publicado correctamente')
    				router.push('/');
      		}


    	}
      
    }
	});
	
	return (
		<div>
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

				<button type="submit" className="bg-blue-800 px-3 py-2 mt-3 w-full rounded text-white">Subir producto</button>

			</form>
	</div>
	)
}

function initialValues() {
  return {
  	name: "",
  	stock: "",
  	price: "",
  };
}