import React from 'react'


import TableProducts from './TableProducts'


export default function Cart() {
	return (
		<div className="container mx-auto">

			<h1 className="text-2xl text-gray-900 border-b-2 border-gray-200 py-2">Carrito de compras</h1>

			<div className="cart mb-4 mx-auto">
				<TableProducts />

			</div>

			
			
		</div>
	)
}