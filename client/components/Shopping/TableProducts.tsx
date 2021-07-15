import React, { useState, useEffect } from 'react'
import { Trash, ArrowLeft, ArrowRight, PlusSm, MinusSm } from 'heroicons-react'
import { toast } from 'react-toastify'
import { size } from 'lodash'

import { getProductsObject, addNewProductCartObject, removeItemsCart } from '../../utils/cart'
import { SELL_PRODUCT } from '../../gql/product'
import Link from 'next/link'

import useAuth from '../../hooks/useAuth';

export default function TableProducts() {

  const { auth } = useAuth();
	const [products, setProducts] = useState(getProductsObject())
	const [value, setValue] = useState(0)
	const [total, setTotal]  = useState(0)



	
	const getTotal = () => {
    let totalP = 0

		products.map((p)=> {
			let precio = parseInt(p.price) * parseInt(p.amount) 

			console.log(precio)
			totalP += precio

		})
		setTotal(totalP)

	}

	const update = (key, type) => {
    let newProducts = []
    let productPass = []

    newProducts = products.map(p => {

      if (p.id === key && (p.stock > parseInt(p.amount) || parseInt(p.amount) >= 1)) {
  			if(type === '+' && p.stock > parseInt(p.amount)) p.amount += 1;
  			if(type === '-' && parseInt(p.amount) > 1) p.amount -= 1;
  			productPass.push(p)
        
        return p;
      }
      return p;
    });
		setProducts(newProducts);
    addNewProductCartObject(newProducts)

  }

  const removeProduct = (key) => {

  	let newProducts = []
    let productPass = []

    newProducts = products.filter(p => {
    	return p.id !== key
    })
    productPass = newProducts.map(p => {
      return p.id;
    });

		setProducts(newProducts);
    addNewProductCartObject(newProducts, productPass)

  }

  const handleSell = () => {
  	let newProducts = {}
  	newProducts.products = null

  	newProducts.products = products.map(p => {

      return {
      	amount: p.amount,
      	productId: p.id
      }; 
    });
    newProducts.userId = auth.id

		if(size(newProducts.products) > 0) {
			SELL_PRODUCT(newProducts).then(result => {
				if(result){
					removeItemsCart()
					setProducts([])
					setTotal(0)

	  			toast.success('Has comprado')
				}
			})
		}else {
			toast.info('Primero debes agregar productos al carrito')
		}


  }


	return (
		<>
			<div className="list mx-auto p-2">
				<div className="header flex text-xl border-b-2 border-gray-400 my-3">
					<div className="w-1/5 sm-text-xs">Producto</div>
					<div className="w-1/5 sm-text-xs">Precio</div>
					<div className="w-1/5 sm-text-xs">Cantidad</div>
					<div className="w-1/5 sm-text-xs">Sub Total</div>
					<div className="w-1/5 sm-text-xs"></div>
				</div>

				<div className="products flex flex-col">

					{
						products.map((product, index) => (
							<div className="product flex mb-2" key={product.id} >
								<div className="w-1/5 sm-text-xs">{product.name}</div>
								<div className="w-1/5 sm-text-xs"> ${product.price} USD</div>
								<div className="w-1/5 sm-text-xs flex">
										<button onClick={() => update(product.id, '-')} className="text-gray-800 text-center px-1">
											<MinusSm color="#000" />
										</button>
										<span className="text-gray-800 text-center px-1 sm-text-xs">{product.amount}</span>
										<button onClick={() => update(product.id, '+')} className="text-gray-800 text-center px-1">
											<PlusSm color="#000" />
										</button>
								</div>
								<div className="w-1/5 sm-text-xs">${product.amount * product.price} USD</div>
								<div className="w-1/5 sm-text-xs"><Trash onClick={() => removeProduct(product.id)} color="#fff" size={25} className="hover:bg-red-8w00 rounded cursor-pointer bg-red-600 p-1"/></div>
							</div>

						))
					}

				</div>

				<div className="flex justify-between my-4 options-store">
					<button className="py-1 rounded px-4 bg-green-800 text-white sm-text-xs" onClick={getTotal}>Calcular total</button>
					<span>Total $ {total} USD</span>
				</div>
			</div>

			<div className="flex justify-between mt-4 p-2 my-4 options-store">
				<div className="flex py-2 px-3 my-4 bg-green-500 sm-text-xs rounded hover:bg-green-700 text-white text-base">
					<ArrowLeft color="#fff" />
					<Link href="/">Continue comprando</Link>
				</div>

				<div className="flex align-center my-4 py-2 px-3 sm-text-xs bg-green-500 rounded hover:bg-green-700 text-white text-base">
					<button onClick={handleSell}>Pagar</button>
					<ArrowRight color="#fff" />
				</div>
				
			</div>

		</>
	)
}