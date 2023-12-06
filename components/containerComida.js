import React from 'react'

const ContainerComida = ({comida}) => {
    console.log("comida", comida)
    return (
        <div>

        {comida === "5" ? (
            <h3>Hamburguesa</h3>
        ) : comida === "6" ? (
            <h3>Flan</h3>
        ) : comida === "7" ? (
            <h3>Michelada</h3>
        ) : comida === "8" ? (
            <h3>Pizza</h3>
        ) : (
           null
        )}

        </div>

    )
}

export default ContainerComida