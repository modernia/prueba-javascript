import React from 'react'

export default function History({name, stock, amount, image, id, price}) {
	return (
		<div className="mx-auto mt-4 p-1 pb-4 flex flex-wrap border-b-2 border-gray-200">

			<div className="w-20 h-24 rounded">
				<img src={image} className="w-full h-full" />
			</div>

			<div className="flex flex-col">
				<h3 className="text-base text-gray-900">{name}</h3>
				<div>
					<p className="text-sm pl-1 text-gray-700">Cantidad Comprada: {amount}</p>
					<p className="text-sm pl-1 text-gray-700">Precio Total: {parseInt(price) * amount}</p>
				</div>
			</div>
			
		</div>
	)
}