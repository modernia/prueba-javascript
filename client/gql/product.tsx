import graphQLClient from '../config/graphql'
import { gql } from 'graphql-request'

export const CREATE_PRODUCT = async (input) => {

	const { createProduct } = await graphQLClient.request(gql`
		mutation createProduct($input: ProductInput) {
			createProduct(input: $input) {
				name
		    price
		    stock
		    image
		    id
			}
		}
	`,{
      input: input
    }
  )

	return createProduct
}


export const GET_PRODUCTS = async () => {

	const {getProducts} = await graphQLClient.request(gql`
		query {
			getProducts{
				name
		    price
		    stock
		    image
		    id
			}
		}
	`)

	return getProducts
}

export const GET_PRODUCT = async (id) => {


	const {getProduct} = await graphQLClient.request(gql`
		query getProduct($id: ID) {
			getProduct(id: $id) {
				name
		    price
		    stock
		    image
		    id
			}
		}
	`,{
				id
		}
	)

	return getProduct
}


export const DELETE_PRODUCT = async (id) => {


	const {deleteProduct} = await graphQLClient.request(gql`
		mutation deleteProduct($id: ID) {
			deleteProduct(id: $id)
		}
	`,{
			id
		}
	)

	return deleteProduct
}

export const SELL_PRODUCT = async (input) => {

	const {sellProduct} = await graphQLClient.request(gql`
		mutation sellProduct($input: ProductSellInput) {
			sellProduct(input: $input)
		}

	`,{
      input
    }
	)

	return sellProduct
}

export const UPDATE_PRODUCT = async (input) => {
	const updateProduct = await graphQLClient.request(gql`
	  mutation updateProduct ($input: ProductUpdateInput) {
	    updateProduct (input: $input)
	  }
	`, {
			input
		}
	);

	console.log("updateProduct", updateProduct )

	return updateProduct
}