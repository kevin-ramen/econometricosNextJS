async function distanciaMaps(origen, destino) {
  try {
    // Añade los parámetros de origen y destino a la URL de la solicitud
    console.log("origen", origen);
    console.log("destino", destino);

    let a = origen.lat + "," + origen.lon;
    let b = destino.lat + "," + destino.lon;

    const response = await fetch(`https://econometricos-186a1a12a814.herokuapp.com/distancia?origen=${a}&destino=${b}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default distanciaMaps;
