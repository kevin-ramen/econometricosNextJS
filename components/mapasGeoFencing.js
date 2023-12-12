import React, { useState,useEffect } from "react";
import { GoogleMap, LoadScript, Polygon, InfoWindow ,Marker} from "@react-google-maps/api";
import {
  calcularPrecioMaximoSupermercado,
  calcularPrecioPromedioSupermercado,
  getColorByE_IDS_V,
  colorIcono
} from "../utils/funcionesMapa";

const MapContainer = ({geoJson, propiedadesGeoJson, coloniasAMostrar,propiedadesColonias,setPropiedadesColonias,supermercadosGeoJson=null}) => {

//States 
const [selectedMarker, setSelectedMarker] = React.useState(null);
const [precioMaximoSupermercado, setPrecioMaximoSupermercado] = useState(0);
const [precioPromedioSupermercado, setPrecioPromedioSupermercado] = useState(0);

//UseEffect
useEffect(() => {
  try{
    setPrecioMaximoSupermercado(calcularPrecioMaximoSupermercado(supermercadosGeoJson.features));
    setPrecioPromedioSupermercado(calcularPrecioPromedioSupermercado(supermercadosGeoJson.features));
  }catch(e){
    console.log(e);
  }
}, [supermercadosGeoJson]);

useEffect(() => {
  //obtenemos en un estado las propiedades que estan en las colonias filtradas
  const propiedadesFiltradas = propiedadesGeoJson.features.filter(feature =>
    feature.geometry.coordinates && (coloniasAMostrar.length === 0 || coloniasAMostrar.includes(feature.properties.colonia))
  );
  setPropiedadesColonias(propiedadesFiltradas);
  console.log("propiedadesFiltradas", propiedadesFiltradas);
}, [coloniasAMostrar]);

//Funcion para colorear
const colorIconoSupermercado = (precio) => {
  if (precio < precioPromedioSupermercado) return "https://econometricos-186a1a12a814.herokuapp.com/static/supermercadoverde.png"
  if (precio > precioPromedioSupermercado && precio < precioMaximoSupermercado) return "https://econometricos-186a1a12a814.herokuapp.com/static/supermercadonaranja.png"
  return "https://econometricos-186a1a12a814.herokuapp.com/static/supermercadorojo.png"
}

const polygons = geoJson.features
  .filter(feature => feature.properties.GeoShape?.coordinates && (coloniasAMostrar.length >= 0 || coloniasAMostrar.includes(feature.properties.Colonianame)))
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

/* console.log("polygons", polygons); */
const [infoWindowsOpen, setInfoWindowsOpen] = useState(Array(polygons.length).fill(false));

const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: polygons[0]?.paths[0]?.lat || 19.42847,
    lng: polygons[0]?.paths[0]?.lng || -99.12766,
  };

  const handlePolygonClick = (index) => {
    const newInfoWindowsState = [...infoWindowsOpen];
    newInfoWindowsState[index] = !newInfoWindowsState[index];
    setInfoWindowsOpen(newInfoWindowsState);
  };

//Mostrar las propiedades que estan en las colonias filtradas
  
  return (
    <LoadScript googleMapsApiKey='AIzaSyCwwLJHujEZM1HVi-D8FWKeR_gug2QrtAo'>
      <GoogleMap 
      mapContainerStyle={mapStyles} 
      center={defaultCenter} 
      zoom={10}
      >
        
      {propiedadesGeoJson.features
      .filter(feature => feature.geometry.coordinates && (coloniasAMostrar.length == 0 || coloniasAMostrar.includes(feature.properties.colonia)))
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
     {supermercadosGeoJson && supermercadosGeoJson.features && supermercadosGeoJson.features.map((supermercado, index) => (
  supermercado && supermercado.geometry && supermercado.geometry.coordinates ? (
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
  ) : null
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
                  <h3><b>Colonia:</b> {polygon.informacion.titulo}</h3>
                  <p><b>Indice:</b> {polygon.informacion.descripcion}</p>
                  <p><b>Delegacion:</b> {polygon.informacion.color}</p>
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
          <p><strong>#:</strong> {selectedMarker.id}</p>
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
