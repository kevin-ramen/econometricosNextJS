import React from 'react';
import tomate from './imagenes/Jitomate.png';
import Carne from './imagenes/Carne.png';
import lechuga from './imagenes/Lechuga.png';
import Aguacate from './imagenes/Aguacate.png';
const Hamburguesa = () => {
    return (
        <div>
            <h1>Hamburguesa</h1>
            <p>Ingredientes:</p>
            <ul>
                <li>Carne de res</li><img src={Carne} alt="Tomate" />
                <li>Lechuga</li><img src={lechuga} alt="Tomate" />
                <li>Tomate <img src={tomate} alt="Tomate" /></li>
                <li>Aguacate <img src={Aguacate} alt="Queso" /></li>
                 
            </ul>
        </div>
    );
}

export default Hamburguesa;
