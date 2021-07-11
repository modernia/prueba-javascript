
import Link from 'next/link';

import RightHeader from './RightHeader/RightHeader';
//import Search from './Search'

export default function Header() {
  return (
    <div className="header w-full border-b-2 border-gray-200 py-2 mb-4 ">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-wrap justify-between px-3">
          <div className=" text-center header__logo">
            <Link href="/">
              <a>Home</a>
            </Link>
          </div>

          <div className="text-center">
            <p>Hola</p>
          </div>

          <div className="text-right">
            <RightHeader />
          </div>

        </div>
      </div>
    </div>
  );
}
