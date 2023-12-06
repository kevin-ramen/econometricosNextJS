import React, { useState,useEffect } from "react";
import { GoogleMap, LoadScript, Polygon, InfoWindow ,Marker} from "@react-google-maps/api";
import {
  calcularPrecioMaximoSupermercado,
  calcularPrecioPromedioSupermercado,
  getColorByE_IDS_V,
  colorIcono
} from "../utils/funcionesMapa";

const MapContainer = ({geoJson, propiedadesGeoJson, supermercadosGeoJson, coloniasAMostrar}) => {

//States 
const [selectedMarker, setSelectedMarker] = React.useState(null);
const [precioMaximoSupermercado, setPrecioMaximoSupermercado] = useState(0);
const [precioPromedioSupermercado, setPrecioPromedioSupermercado] = useState(0);

//UseEffect
useEffect(() => {
  try{
    console.log("Supermercados", supermercadosGeoJson);
    setPrecioMaximoSupermercado(calcularPrecioMaximoSupermercado(supermercadosGeoJson.features));
    setPrecioPromedioSupermercado(calcularPrecioPromedioSupermercado(supermercadosGeoJson.features));
  }catch(e){
    console.log(e);
  }
}, []);

//Funcion para colorear
const colorIconoSupermercado = (precio) => {
  if (precio < precioPromedioSupermercado) return "http://127.0.0.1:5000/static/supermercadoverde.png"
  if (precio > precioPromedioSupermercado && precio < precioMaximoSupermercado) return "http://127.0.0.1:5000/static/supermercadonaranja.png"
  return "http://127.0.0.1:5000/static/supermercadorojo.png"
}

/* console.log("coloniasAMostrar", coloniasAMostrar);
console.log("preview ->", geoJson.features[0].properties.Colonianame)
console.log("coloniasAMostrar lista", coloniasAMostrar.includes(geoJson.features[0].properties.Colonianame)); */

const polygons = geoJson.features
  .filter(feature => feature.properties.GeoShape?.coordinates && (coloniasAMostrar.length > 0 || coloniasAMostrar.includes(feature.properties.Colonianame)))
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

console.log("polygons", polygons);
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

  console.log("propiedadesGeoJson.features:", (propiedadesGeoJson.features[0].properties.colonia).trimStart());
  console.log("propiedadesGeoJson.features:", (propiedadesGeoJson.features[0].properties.colonia));
 
  console.log("longitud:", coloniasAMostrar.length);
  return (
    <LoadScript googleMapsApiKey='AIzaSyCwwLJHujEZM1HVi-D8FWKeR_gug2QrtAo'>
      <GoogleMap 
      mapContainerStyle={mapStyles} 
      center={defaultCenter} 
      zoom={10}
      >
        
      {propiedadesGeoJson.features
      .filter(feature => feature.geometry.coordinates && (coloniasAMostrar.length == 1 || coloniasAMostrar.includes(feature.properties.colonia)))
      .map((feature, index) => (
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
            url: colorIconoSupermercado(supermercado.properties.PRECIO),
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
             <>
              <p><strong>Precio:</strong> $ {selectedMarker.properties.precio} pesos mexicanos. /  $ {((selectedMarker.properties.precio)/17.42).toFixed(1)} dolares</p>
              <p><strong>Tamaño:</strong> {selectedMarker.properties.tamanio} metros cuadrados</p>
              <p><strong>Colonia:</strong> {selectedMarker.properties.colonia}</p>
              <p><strong>Delegacion:</strong> {selectedMarker.properties.delegacion}</p>
             </>
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
