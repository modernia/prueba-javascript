import { useState } from 'react'
import { useRouter } from 'next/router'

import Header from '../../components/Header/Header'
import EditProfile from '../../components/Profile/EditProfile'
import { GET_USER, GET_HISTORY } from '../../gql/user'

import graphQLClient from '../../config/graphql'
import useAuth from '../../hooks/useAuth';


export default function id({data}) {
	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState(null)
	const router = useRouter()

  const { auth, logout } = useAuth();
  const onLogout = () => {
    logout();
    router.push('/');
  }

  if(auth === null) return null


	return (

		<>
			<Header />
			
			<div className="container max-w-screen-lg flex flex-col">

				<div className="user-data">
					{ auth.id === data.id 
						? <EditProfile user={data} logout={onLogout} />
						: 'Hola otro usuario'
					}
				</div>

				<div className="md:max-w-screen-sm mx-auto mt-4">
					Historial de Compras
				</div>
				
			</div>

			
		</>

	)
}

id.getInitialProps = async (ctx) => {
	const {id} = ctx.query;
	const {getUser} = await GET_USER(id)
	const getHistory = await GET_HISTORY(id)

	console.log(getHistory)

	return {
		data: getUser
	}

}