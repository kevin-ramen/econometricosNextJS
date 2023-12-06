
export const getColorByE_IDS_V = (eIdsV) => {
    if (eIdsV == "Muy Bajo") return "#FF0000"; // Rojo
    if (eIdsV == "Bajo") return "#FFA500"; // Naranja
    if (eIdsV == "Medio") return "#FFFF00"; // Amarillo
    if (eIdsV == "Alto") return "#00FF80"; // Verde claro
    return "#0AB11D";  
};


export const colorIcono = (precio) => {
  if (precio < 5000) return "http://127.0.0.1:5000/static/locacionverde.png"
  if (precio > 5000 && precio < 10000) return "http://127.0.0.1:5000/static/locacionnraranja.png"
  return "http://127.0.0.1:5000/static/locacionrojo.png"
}


export const calcularPrecioMaximoSupermercado = (supermercado) => {
  const precios = supermercado.map((item) => item.properties.PRECIO);
  const precioMaximo = Math.max(...precios);
  return precioMaximo;
};

export const calcularPrecioPromedioSupermercado = (supermercado) => {
  const precios = supermercado.map((item) => item.properties.PRECIO);
  const sumaPrecios = precios.reduce((a, b) => a + b, 0);
  const precioPromedio = sumaPrecios / precios.length;
  return precioPromedio;
};


