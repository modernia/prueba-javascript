import Link from 'next/link';

import RightHeader from './RightHeader/RightHeader';
import useAuth from '../../hooks/useAuth'


export default function Header() {

  const { auth } = useAuth()

  return (
    <div className="header w-full border-b-2 border-gray-200 py-2 mb-4 bg-gray-100 ">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-wrap items-center justify-between px-3">
          <div className=" text-center header__logo">
            <Link href="/">
              <a className="text-sm p-2 text-gray-900 mr-2 border-r-2 pr-2 border-gray-400 hover:bg-purple-800 hover:text-white rounded">Inicio</a>
            </Link>

            {
              auth?.role === "ADMIN_ROLE" && (
                <>
                  <Link href="/product/list">
                    <a className="text-sm p-2 text-green-900 mr-2 border-r-2 pr-2 border-gray-400 hover:bg-purple-800 hover:text-white rounded">Ver todos los productos</a>
                  </Link>
                  <Link href='/product/create'>
                    <a className="text-sm p-2 text-green-900 mr-2 hover:bg-purple-800 hover:text-white rounded">Subir nuevo producto</a>
                  </Link>
                </>
              )
            }

          </div>

          <div className="text-right">
            <RightHeader />
          </div>

        </div>
      </div>
    </div>
  );
}
