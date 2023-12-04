import React, { useState } from "react";
import { GoogleMap, LoadScript, Polygon, InfoWindow } from "@react-google-maps/api";

const MapContainer = ({geoJson}) => {
 /*  const geoJson = {
    "type": "FeatureCollection",
    "features": [
      // ... (tus objetos GeoJSON aquí)
    ]
  }; */
  console.log(geoJson);

  const polygons = geoJson.features
    .filter(feature => feature.properties.GeoShape?.coordinates) // Filtrar las features que tienen coordenadas
    .map((feature, index) => {
      const coordinates = feature.properties.GeoShape.coordinates[0].map(coord => ({
        lat: coord[1],
        lng: coord[0],
      }));

   return {
        paths: coordinates,
        options: {
          fillColor: feature.properties.color || "#FF0000",
          fillOpacity: 0.35,
          strokeColor: feature.properties.color || "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          clickable: true,
          draggable: false,
          editable: false,
          visible: true,
        },
        informacion: {
          titulo: feature.properties.Colonianame || "Sin nombre",
          descripcion: feature.properties.E_IDS_V || "Sin descripción",
          color: feature.properties.Municipalityname || "Sin municipio",
        },
      };
    });

  const [infoWindowsOpen, setInfoWindowsOpen] = useState(Array(polygons.length).fill(false));

  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: polygons[0]?.paths[0]?.lat || 0,
    lng: polygons[0]?.paths[0]?.lng || 0,
  };

  const handlePolygonClick = (index) => {
    const newInfoWindowsState = [...infoWindowsOpen];
    newInfoWindowsState[index] = !newInfoWindowsState[index];
    setInfoWindowsOpen(newInfoWindowsState);
  };

  return (
    <LoadScript googleMapsApiKey='AIzaSyCwwLJHujEZM1HVi-D8FWKeR_gug2QrtAo'>
      <GoogleMap mapContainerStyle={mapStyles} center={defaultCenter} zoom={10}>
        {polygons.map((polygon, index) => (
          <React.Fragment key={index}>
            <Polygon
              paths={polygon.paths}
              options={polygon.options}
              onClick={() => handlePolygonClick(index)}
            />
            {infoWindowsOpen[index] && (
              <InfoWindow
                position={{ lat: polygon.paths[0].lat, lng: polygon.paths[0].lng }}
                onCloseClick={() => handlePolygonClick(index)}
              >
                <div>
                  <h3>{polygon.informacion.titulo}</h3>
                  <p>{polygon.informacion.descripcion}</p>
                  <p>{polygon.informacion.color}</p>
                </div>
              </InfoWindow>
            )}
          </React.Fragment>
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
