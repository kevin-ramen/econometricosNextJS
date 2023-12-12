import React from 'react'
import Hamburguesa from './comidas/Hamburguesa'
import Flan from './comidas/Flan'
import Michelada from './comidas/Michelada'
 


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
            null
        ) : (
           null
        )}

        </div>

    )
}

export default ContainerComida