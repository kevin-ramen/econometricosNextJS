// En tu componente de encabezado
import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold">Buscador de locales comerciales</h1>
        <p className="text-sm">Proyecto Final Modelos Econometricos</p>
      </div>
    </header>
  );
};

export default Header;
