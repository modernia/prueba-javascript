import graphQLClient from '../config/graphql'
import { gql } from 'graphql-request'

export const REGISTER = async (input) => {

	console.log(input)

	const {register} = await graphQLClient.request(gql`
		mutation register($input: UserInput) {
			register(input: $input) {
				id
				name
				lastname
				email
				password
				address
			}
		}
	`,{
      input: input
    }
  )

	return register
}

export const LOGIN = async (input) => {
	const {login} = await graphQLClient.request(gql`
		mutation login($input: LoginInput) {
			login(input: $input) {				
				token
			}
		}
	`,{
      input: input
    }
  )

  console.log(login)
  return login
}


export const GET_USER = async (id) => {

	const { getUser, loading } = await graphQLClient.request(gql`
		query getUser($id: ID) {
			getUser(id: $id) {
				id,
				name,
				lastname,
				email,
				address,
			}
		}
	`, {
			id
		}
	)

	return {getUser, loading}

}


export const UPDATE_USER = async (input) => {
	const {updateUser} = await graphQLClient.request(gql`
	  mutation updateUser ($input: UserUpdateInput) {
	    updateUser (input: $input)
	  }
	`, {
			input
		}
	);

	return updateUser
}

export const GET_HISTORY = async (id) => {

	const { getHistory } = await graphQLClient.request(gql`
		query getHistory($id: ID) {
			getHistory(id: $id) {
				id,
				name,
				image,
				stock,
				amount,
			}
		}
	`, {
			id
		}
	)
	
	console.log(getHistory)

	return {getHistory}

}