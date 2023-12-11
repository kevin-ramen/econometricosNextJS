export const getColorByE_IDS_V = (eIdsV) => {
  if (eIdsV == "Muy Bajo") return "#FF0000"; // Rojo
  if (eIdsV == "Bajo") return "#FFA500"; // Naranja
  if (eIdsV == "Medio") return "#FFFF00"; // Amarillo
  if (eIdsV == "Alto") return "#00FF80"; // Verde claro
  return "#0AB11D";  
};

export const colorIcono = (precio) => {
  if (precio < 6000) return "https://econometricos-186a1a12a814.herokuapp.com/static/locacionverde.png"
  if (precio > 6000 && precio < 12000) return "https://econometricos-186a1a12a814.herokuapp.com/static/locacionnraranja.png"
  return "https://econometricos-186a1a12a814.herokuapp.com/static/locacionrojo.png"
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

export const calculateHaversineDistance = (coord1, coord2) => {
  const R = 6371; // Radio de la Tierra en kilómetros

  const toRadians = (degrees) => degrees * (Math.PI / 180);

  const dLat = toRadians(coord2.lat - coord1.lat);
  const dLon = toRadians(coord2.lon - coord1.lon);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(coord1.lat)) * Math.cos(toRadians(coord2.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distancia en kilómetros

  return distance;
};

export const medirDistancia = (mapaData4, propiedadesColonias) => {
  const supermercados = mapaData4.geojson_data.features;
  const locales = propiedadesColonias;
  const supermercadosFiltrados = supermercados.filter((supermercado) => supermercado.geometry.coordinates);
  const localesFiltrados = locales.filter((local) => local.geometry.coordinates);
  console.log("supermercadosFiltrados", supermercadosFiltrados);
  console.log("localesFiltrados", localesFiltrados);
  const distancias = [];
  supermercadosFiltrados.forEach((supermercado) => {
    localesFiltrados.forEach((local) => {
      console.log("local ->", local);
      const distancia = calculateHaversineDistance(
        {
          lat: supermercado.geometry.coordinates[1],
          lon: supermercado.geometry.coordinates[0],
        },
        {
          lat: local.geometry.coordinates[1],
          lon: local.geometry.coordinates[0],
        }
      );
      distancias.push({
        supermercado: supermercado.properties.NOMBRE,
        local: local.properties.NOMBRE,
        id: local.id,
        distancia,
      });
    });
  });
  console.log("distancias", distancias);
};
