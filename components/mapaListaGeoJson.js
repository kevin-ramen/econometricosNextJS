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

const MapaPropiedades = ({ propiedadesGeoJson, supermercadosGeoJson }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCwwLJHujEZM1HVi-D8FWKeR_gug2QrtAo",
  });

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
      {propiedadesGeoJson.features.map((feature, index) => (
        <Marker
          key={`propiedad-${index}`}
          position={{
            lat: feature.geometry.coordinates[1],
            lng: feature.geometry.coordinates[0],
          }}
          icon={{
            url: "https://img.icons8.com/emoji/48/000000/house-emoji.png",
            scaledSize: new window.google.maps.Size(30, 30),
          }}
          onClick={() => {
            setSelectedMarker(feature);
          }}
        />
      ))}

      {supermercadosGeoJson.features.map((supermercado, index) => (
        <Marker
          key={`supermercado-${index}`}
          position={{
            lat: supermercado.geometry.coordinates[1],
            lng: supermercado.geometry.coordinates[0],
          }}
          icon={{
            url: "https://toppng.com/uploads/preview/supermarket-cctv-icon-supermarket-ico-11563033623qxb61l6bwd.png",
            scaledSize: new window.google.maps.Size(30, 30),
          }}
          onClick={() => {
            setSelectedMarker(supermercado);
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
            <p><strong>Nombre:</strong> {selectedMarker.properties.NOMBRECOMERCIAL || selectedMarker.properties.ubicacion}</p>
            {selectedMarker.properties.precio && (
              <p><strong>Precio:</strong> ${selectedMarker.properties.PRECIO}.00</p>
            )}
            
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : <></>;
};

export default React.memo(MapaPropiedades);
