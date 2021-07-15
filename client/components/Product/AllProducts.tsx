import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Check } from 'heroicons-react'
import { toast } from 'react-toastify'
import { size } from 'lodash'


import { addProductCart, getProducts, addProductCartObject } from '../../utils/cart'
import { GET_PRODUCTS } from '../../gql/product'
import useAuth from '../../hooks/useAuth'

export default function  AllProducts({listAdminPage, showAll}) {

	const [products, setProducts] = useState(null)
	const [cart, setCart]  = useState([])
	
	let productsAdded = getProducts()

	const { auth } = useAuth()

	useEffect(() => {
		GET_PRODUCTS().then((data) => setProducts(data))
	}, [])

	const handleAddProduct = (e) => {

		if(auth) {
			const productPass = JSON.parse(e.target.attributes[0].value)
			productPass.amount = 1;

			addProductCart(e.target.attributes[1].value)
			addProductCartObject(productPass)
			productsAdded = getProducts()
			setCart(cart.concat(e.target.attributes[1].value))
		} else {
			toast.info('Inicia sesión o crea una cuenta para agrgar productos al carrito')	
		}
	}



	return (
		<>

		{
			size(products) > 0 
			? (
				<div className="flex p-2 flex-wrap text-center justify-between">

					{ 
						products?.map((product) => 
							{
								return (parseInt(product.stock)>0 || showAll) && (
									<div className="product text-center mx-4 mr-2 mb-4 mt-4" key={product.id}>
										<div className="w-28 h-32 mx-auto">
											<img className="object-cover w-full h-full" src={product.image} alt={product.name} />
											
										</div>
										<h3 className="uppercase text-bold text-base">{product.name}</h3>
										
										<div className="flex flex-col text-center">
											<p className="text-sm text-bold text-gray-900 ">
												${product.price} USD
											</p>
											<p className="text-sm text-gray-800 ">
												{product.stock} disponibles
											</p>
										</div>

										{ !listAdminPage &&	(
											<div className="cursor-pointer mt-2 w-full rounded text-white text-center py-1 px-2 bg-blue-500 hover:bg-blue-800">
																											
												{
													parseInt(product.stock) > 0
														? (
																(cart.includes(product.id) || productsAdded.includes(product.id))
																	? <button className="flex" id-product={product.id}><Check color="#fff" /> Agregado</button>
																	: <button onClick={handleAddProduct} product={JSON.stringify(product)}  id-product={product.id} >Comprar</button>
															)
														: <button className='text-red-900 cursor-not-allowed'>No disponible</button>

												}
	
											</div>
										)
									}
										{
											auth?.role === 'ADMIN_ROLE'  && (
													<div className="cursor-pointer mt-2 w-full rounded text-white text-center py-1 px-2 bg-green-500 hover:bg-green-800">
														<Link href={`/product/update/${product.id}`}>Editar</Link>
													</div>
												)
										}

									</div>
								)
							}


						)
					}

				</div>
			)
			: (
				<div className="text-xl text-gray-800 p-4">No hay productos</div>	
			)
		}


		</>
	)
}

export const getServerSideProps = async (ctx )=> {

	console.log("ctx", ctx.query)
	const products = await GET_PRODUCTS()
	console.log(products)

	return {
		
			props: products
		
	}
}