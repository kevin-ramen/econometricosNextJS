import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  height: '500px',
  width: '100%',
};

const defaultCenter = {
  lat: 19.43,
  lng: -99.1,
};

const MapaConColores = () => {
  const test = [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-99.1, 19.43],
      },
      properties: {
        'E_IDS_V,C,80': 'Medio',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-99.2, 19.4],
      },
      properties: {
        'E_IDS_V,C,80': 'Alto',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-99.15, 19.45],
      },
      properties: {
        'E_IDS_V,C,80': 'Bajo',
      },
    },
    // Puedes agregar más objetos Feature según sea necesario
  ];

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCwwLJHujEZM1HVi-D8FWKeR_gug2QrtAo',
  });

  const onLoad = React.useCallback(
    function callback(map) {
      console.log('Datos cargados:', test);

      // Crear un objeto de estilo para la Data Layer
      const layerStyle = {
        fillColor: 'blue', // Cambia el color del área
        strokeWeight: 1,
      };

      // Agregar la capa de datos con un objeto de estilo
      map.data.addGeoJson({ type: 'FeatureCollection', features: test }, layerStyle);

      // Puedes dejar el código para establecer estilos basados en propiedades si lo necesitas
      map.data.setStyle(feature => {
        const color = getColorBasedOnValue(feature.getProperty('E_IDS_V,C,80'));
        return { fillColor: color, strokeWeight: 1 };
      });
    },
    [test]
  );

  const onUnmount = React.useCallback(
    function callback(map) {
      // Limpiar los datos al desmontar el mapa (opcional)
      map.data.forEach(feature => {
        map.data.remove(feature);
      });
    },
    []
  );

  const getColorBasedOnValue = value => {
    // ... (tu función existente)
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    />
  ) : <></>;
};

export default React.memo(MapaConColores);
