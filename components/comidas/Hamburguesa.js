import React from 'react';
import tomate from './imagenes/Jitomate.png';
import Carne from './imagenes/Carne.png';
import lechuga from './imagenes/Lechuga.png';
import Aguacate from './imagenes/Aguacate.png';
import Image from 'next/image';

const Hamburguesa = () => {
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
                                <Image src={Aguacate} alt="Aguacate" className="w-8 h-8 mr-2" />
                                AGUACATE
                            </td>
                            <td className="px-6 py-4">1 KG. HASS</td>
                            <td className="px-6 py-4">43.41</td>
                        </tr>
                        <tr>
                            <td className="flex items-center px-6 py-4">
                                <Image src={Carne} alt="Carne de res" className="w-8 h-8 mr-2" />
                                CARNE RES
                            </td>
                            <td className="px-6 py-4">1 KG. GRANEL. MOLIDA ESPECIAL 80/20</td>
                            <td className="px-6 py-4">96.67</td>
                        </tr>
                        <tr>
                            <td className="flex items-center px-6 py-4">
                                <Image src={tomate} alt="Tomate" className="w-8 h-8 mr-2" />
                                JITOMATE
                            </td>
                            <td className="px-6 py-4">1 KG. SALADETTE/ HUAJE O TOMATE SALADETTE/ HUAJE</td>
                            <td className="px-6 py-4">26.48</td>
                        </tr>
                        <tr>
                            <td className="flex items-center px-6 py-4">
                                <Image src={lechuga} alt="Lechuga" className="w-8 h-8 mr-2" />
                                LECHUGA
                            </td>
                            <td className="px-6 py-4">PZA. ROMANA</td>
                            <td className="px-6 py-4">16.31</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Hamburguesa;
