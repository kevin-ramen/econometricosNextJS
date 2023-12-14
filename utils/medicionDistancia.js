import distanciaMaps from '../utils/distancia';

const medirDistancia = async (mapaData5, propiedadesColonias, setDistancias) => {
  if (Object.keys(mapaData5).length === 0 || Object.keys(propiedadesColonias).length === 0) {
    return;
  } else {
    const supermercados = mapaData5.geojson_data.features;
    const locales = propiedadesColonias;

    const supermercadosFiltrados = supermercados.filter((supermercado) => supermercado.geometry.coordinates);
    const localesFiltrados = locales.filter((local) => local.geometry.coordinates);

    const distanciasArray = [];

    for (const supermercado of supermercadosFiltrados) {
      for (const local of localesFiltrados) {
        try {
          const distanciafetch = await distanciaMaps(
            {
              lat: supermercado.geometry.coordinates[1],
              lon: supermercado.geometry.coordinates[0],
            },
            {
              lat: local.geometry.coordinates[1],
              lon: local.geometry.coordinates[0],
            }
          );

          
          distanciasArray.push({
            supermercado: supermercado.properties.NOMBRECOMERCIAL,
            local: local.properties.ubicacion,
            id: local.id,
            metros: local.properties.tamanio,
            precio_local: local.properties.precio,
            precio_metros_cuadrado: local.properties.precio / local.properties.tamanio,
            precio_supermercado: supermercado.properties.PRECIO,
            distancia: distanciafetch.distancia_metros,
            tiempo: distanciafetch.tiempo_llegada_seg,
            tiempo_texto: distanciafetch.tiempo_llegada,
            distancia_texto: distanciafetch.distancia,
          });
        } catch (error) {
          console.error(`Error al calcular la distancia: ${error}`);
        }
      }
    }

    setDistancias(distanciasArray);
  }
};

export { medirDistancia };
