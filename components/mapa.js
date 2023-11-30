import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const apiKey = process.env.API_KEY_MAPS;

const containerStyle = {
  height: '500px',
  width: '100%',
};

const defaultCenter = {
  lat: 0,
  lng: 0,
};

const Mapa = ({ geoJsonData }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(defaultCenter);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={2}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {geoJsonData.features.map((feature, index) => (
        <Marker
          key={index}
          position={{
            lat: feature.geometry.coordinates[1],
            lng: feature.geometry.coordinates[0],
          }}
        />
      ))}
    </GoogleMap>
  ) : <></>;
};

export default React.memo(Mapa);
