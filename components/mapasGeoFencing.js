import React, { useState } from "react";
import { GoogleMap, LoadScript, Polygon, InfoWindow ,Marker} from "@react-google-maps/api";
 
const MapContainer = ({geoJson,propiedadesGeoJson, supermercadosGeoJson}) => {
  const [selectedMarker, setSelectedMarker] = React.useState(null);
const getColorByE_IDS_V = (eIdsV) => {
    
    if (eIdsV == "Muy Bajo") return "#FF0000"; // Rojo
    if (eIdsV == "Bajo") return "#FFA500"; // Naranja
    if (eIdsV == "Medio") return "#FFFF00"; // Amarillo
    if (eIdsV == "Alto") return "#00FF80"; // Verde claro
    return "#0AB11D";  
};


const colorIcono = (precio) => {
  if (precio < 5000) return "http://127.0.0.1:5000/static/locacionverde.png"
  if (precio > 5000 && precio < 10000) return "http://127.0.0.1:5000/static/locacionnraranja.png"
  return "http://127.0.0.1:5000/static/locacionrojo.png"
}

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
          fillColor: getColorByE_IDS_V(feature.properties.E_IDS_V),
          fillOpacity: 0.35,
          strokeColor: feature.properties.color || "#161618",
          strokeOpacity: 0.8,
          strokeWeight: 0.5,
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
      <GoogleMap 
      mapContainerStyle={mapStyles} 
      center={defaultCenter} 
      zoom={10}
      >

      {propiedadesGeoJson.features.map((feature, index) => (
        <Marker
          key={`propiedad-${index}`}
          position={{
            lat: feature.geometry.coordinates[1],
            lng: feature.geometry.coordinates[0],
          }}
          icon={{
            url: colorIcono(feature.properties.precio),
            scale: 0.05
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
            url: 'http://127.0.0.1:5000/static/supermercadoverde.png',
            scale: 0.01
          }}
          onClick={() => {
            setSelectedMarker(supermercado);
          }}
        />
      ))}
      
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
              <p><strong>Precio:</strong> ${selectedMarker.properties.precio}</p>
            )}

            {selectedMarker.properties.PRECIO && (
              <p><strong>Precio total de los productos: </strong> ${selectedMarker.properties.PRECIO}.00</p>
            
            )}
            
          </div>
        </InfoWindow>
      )}


      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
