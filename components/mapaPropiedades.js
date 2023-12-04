// MapComponent.js
import React from 'react';
import { GoogleMap, Marker, Polygon } from '@react-google-maps/api';

const MapComponent = ({ locations }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '500px',
  };

  const center = {
    lat: 19.472845380027369,
    lng: -99.15574594850743,
  };

  const apiKey = 'AIzaSyCwwLJHujEZM1HVi-D8FWKeR_gug2QrtAo'; // Reemplaza con tu propia clave de API de Google Maps

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={14}
    >
      {/* Agrega marcadores para cada ubicación */}
      {locations.map((location) => (
        <Marker
          key={location.properties.Unnamed}
          position={{
            lat: location.geometry.coordinates[1],
            lng: location.geometry.coordinates[0],
          }}
          title={location.properties.Colonianame}
        />
      ))}

      {/* Dibuja polígonos para las áreas */}
      {locations.map((location) => (
        <Polygon
          key={location.properties.Unnamed}
          paths={location.geometry.coordinates[0]}
          options={{
            strokeColor: '#0000FF',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#0000FF',
            fillOpacity: 0.35,
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default MapComponent;
