import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

import { InfoWindow } from '@react-google-maps/api';

const apiKey = process.env.API_KEY_MAPS;
console.log(apiKey);
const containerStyle = {
  height: '500px',
  width: '100%',
};

const defaultCenter = {
  lat: 19.43,
  lng: -99.1,
};

const MapaPropiedades = ({ geoJsonData }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCwwLJHujEZM1HVi-D8FWKeR_gug2QrtAo",
  });

  let houseIcon = 'https://img.icons8.com/emoji/48/000000/house-emoji.png';
  console.log(geoJsonData);
  const [map, setMap] = React.useState(null);
  const [selectedMarker, setSelectedMarker] = React.useState(null);

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
      zoom={8}
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
          icon={{
            url: houseIcon,
            scaledSize: new window.google.maps.Size(30, 30),
          }}
          onClick={() => {
            setSelectedMarker(feature);
          }}
        />
      ))}

      {selectedMarker && (
        <InfoWindow
          position={{
            lat: selectedMarker.geometry.coordinates[1],
            lng: selectedMarker.geometry.coordinates[0],
          }}
          onCloseClick={() => {
            setSelectedMarker(null);
          }}
        >
          <div>
            <p><strong>Precio:</strong> ${selectedMarker.properties.precio}.00</p>
            <p><strong>Tamaño:</strong> {selectedMarker.properties.tamanio} metros cuadrados</p>
            <p><strong>Dirección:</strong> {selectedMarker.properties.ubicacion}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : <></>;
};

export default React.memo(MapaPropiedades);
