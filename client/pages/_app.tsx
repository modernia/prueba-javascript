import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { useState, useMemo, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import client from '../config/apollo';
import AuthContext from '../context/AuthContext'
import { decodeToken, removeToken } from '../utils/token'

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())
  const [auth, setAuth] = useState(undefined);
  useEffect(() => {
    let token = ''
    if (typeof window !== "undefined") {
      token = localStorage.getItem('token')
    }
    if (!token) {
      setAuth(null);
    } else {
      setAuth(decodeToken(token));

    }
  }, []);

  const logout = () => {
    removeToken();
    setAuth(null);
  };

  const setUser = (user) => {
    setAuth(user);
  };

  let authData = useMemo(
    () => ({
      auth,
      logout,
      setUser,
    }),
    [auth]
  );

  if (auth === undefined) return null;
  return (
     <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={authData}>
       <Hydrate state={pageProps.dehydratedState}>
         <Component {...pageProps} />

       </Hydrate>
       <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        rtl={false}
        draggable
        pauseOnHover
      />
      </AuthContext.Provider>
     </QueryClientProvider>
  )
}
export default MyApp
