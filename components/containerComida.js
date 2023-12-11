import React from 'react'
import Hamburguesa from './comidas/Hamburguesa'
import Flan from './comidas/Flan'
import Michelada from './comidas/Michelada'
import Pizza from './comidas/Pizza'


const ContainerComida = ({comida}) => {
    console.log("comida", comida)
    return (
        <div>

        {comida === "5" ? (
            <Hamburguesa/>
        ) : comida === "6" ? (
            <Flan/>
        ) : comida === "7" ? (
            <Michelada/>
        ) : comida === "8" ? (
            <Pizza/>
        ) : (
           null
        )}

        </div>

    )
}

export default ContainerComida