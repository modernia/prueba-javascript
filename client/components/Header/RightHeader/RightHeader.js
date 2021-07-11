import React, { useState } from 'react';
import Link from 'next/link';

import { ShoppingCart, ViewGridAdd, LockClosed, User } from 'heroicons-react'


import { GET_USER } from '../../../gql/user'
import useAuth from '../../../hooks/useAuth';

export default function RightHeader() {

  const [showModal, setShowModal] = useState(false)

  const { auth } = useAuth();

  



  return (
    <>
      <div className="right-header flex items-center justify-between">
        <Link href="/shopping-cart">
          <a>
            <ShoppingCart className="mr-1" />
          </a>
        </Link>

        {
          auth?.role === 'ADMIN_ROLE' && <Link href='/product/create'><ViewGridAdd className="cursor-pointer mr-1" /></Link>
        }

        {
          auth === null
            ? <span className="text-xs text-green-900 cursor-pointer border-2 border-green-300 rounded m2-1 px-1" ><Link href="/auth">Inicia sesión</Link></span>
            : (
              <Link  href={`/user/${auth.id}`}>
                <User size={30} className="boder-green-300 border-2 cursor-pointer rounded-full inline" />
              </Link>)
        }

        
      </div>

    </>
  );
}
