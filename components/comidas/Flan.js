import React from 'react'
import Azucar from './imagenes/sugar.png';
import Huevo from './imagenes/huevo.png';
import Leche from './imagenes/leche.png';
import Image from 'next/image';

const Flan = () => {
    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Flan</h1>
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
                                <Image src={Azucar} alt="Azucar" className="w-8 h-8 mr-2" />
                                AZUCAR
                            </td>
                            <td className="px-6 py-4">1 KG. Estandar</td>
                            <td className="px-6 py-4">42.03</td>
                        </tr>
                        <tr>
                            <td className="flex items-center px-6 py-4">
                                <Image src={Huevo} alt="Huevo" className="w-8 h-8 mr-2" />
                                HUEVO
                            </td>
                            <td className="px-6 py-4">1 KG.</td>
                            <td className="px-6 py-4">51.13</td>
                        </tr>
                        <tr>
                            <td className="flex items-center px-6 py-4">
                                <Image src={Leche} alt="Leche" className="w-8 h-8 mr-2" />
                                LECHE ULTRAPASTEURIZADA
                            </td>
                            <td className="px-6 py-4">1 Lt.</td>
                            <td className="px-6 py-4">29.36</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Flan



/* PRECIO
PRODUCTO	
AZUCAR	42.031250
HUEVO	51.132692
LECHE ULTRAPASTEURIZADA	29.364103 */