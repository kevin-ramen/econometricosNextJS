import React from 'react'
import Cheve from './imagenes/cheve.png';
import Limon from './imagenes/limon.png';
import SalsaSoya from './imagenes/salsasoya.png';
import SalsaInglesa from './imagenes/salsainglesa.png';
import Image from 'next/image';

const Michelada = () => {
    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Hamburguesa</h1>
            <p className="text-lg mb-2">Ingredientes:</p>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-6 py-3 text-left">PRODUCTO</th>
                            <th className="px-6 py-3 text-left">PRESENTACIÓN</th>
                            <th className="px-6 py-3 text-left">PRECIO PROMEDIO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="flex items-center px-6 py-4">
                                <Image src={Cheve} alt="Cheve" className="w-8 h-8 mr-2" />
                                CERVEZA
                            </td>
                            <td className="px-6 py-4">1.2 Lt.</td>
                            <td className="px-6 py-4">43.11</td>
                        </tr>
                        <tr>
                            <td className="flex items-center px-6 py-4">
                                <Image src={Limon} alt="Limon" className="w-8 h-8 mr-2" />
                                LIMON
                            </td>
                            <td className="px-6 py-4">1 Kg.</td>
                            <td className="px-6 py-4">49.10</td>
                        </tr>
                        <tr>
                            <td className="flex items-center px-6 py-4">
                                <Image src={SalsaSoya} alt="SalsaSoya" className="w-8 h-8 mr-2" />
                                SALSA DE SOYA
                            </td>
                            <td className="px-6 py-4">290 ml.</td>
                            <td className="px-6 py-4">16.83</td>
                        </tr>
                        <tr>
                            <td className="flex items-center px-6 py-4">
                                <Image src={SalsaInglesa} alt="SalsaInglesa" className="w-8 h-8 mr-2" />
                                SALSA INGLESA
                            </td>
                            <td className="px-6 py-4">290 ml.</td>
                            <td className="px-6 py-4">65.45</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Michelada


/* PRECIO
PRODUCTO	
CERVEZA	43.114286
LIMON	49.100000
SALSA DE SOYA	16.833333
SALSA INGLESA	65.454545 */