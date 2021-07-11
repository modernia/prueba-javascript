
import Link from 'next/link';

import RightHeader from './RightHeader/RightHeader';

export default function Header() {
  return (
    <div className="header w-full border-b-2 border-gray-200 py-2 mb-4 ">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-wrap items-center justify-between px-3">
          <div className=" text-center header__logo">
            <Link href="/">
              <a className="text-sm text-gray-900 mr-2 border-r-2 pr-2 border-gray-400">Inicio</a>
            </Link>

            <Link href="/product/list">
              <a className="text-sm text-green-900 mr-2">Ver todos los pruductos</a>
            </Link>
          </div>

          <div className="text-right">
            <RightHeader />
          </div>

        </div>
      </div>
    </div>
  );
}
