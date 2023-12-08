import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Buscador de locales comerciales</h1>
          <p className="text-sm">Proyecto Final Modelos Econometricos</p>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/about">
            <p className="text-white">About Us</p>
          </Link>
          <Link href="/">
            <p className="text-white">Regresar</p>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
