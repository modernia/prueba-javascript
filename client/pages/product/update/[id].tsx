import React, { useCallback, useState } from 'react';
import Head from 'next/head'
import { CloudUpload } from 'heroicons-react'
import { toast } from 'react-toastify'
import Header from '../../../components/Header/Header'
import UpdateForm from '../../../components/Product/UpdateForm'
import { GET_PRODUCT } from '../../../gql/product'



export default function id({data}) {

	return (
		<>
			<Head>
        <title>Actualiza la información del producto</title>
      </Head>

			<Header />

			<div>

				<div className="w-40 h-52 mx-auto">
					<img className="object-cover w-full h-full" src={data.image} alt={data.name} />
				</div>
			
				<UpdateForm product={data} showAll={false}/>
				
			</div>
		</>
	)
}



id.getInitialProps = async (ctx) => {

	const {id} = ctx.query;
	const getProduct = await GET_PRODUCT(id)


	return {
		data: getProduct,
	}

}