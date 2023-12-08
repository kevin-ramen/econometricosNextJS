import Link from "next/link";
import { useState, useEffect } from "react";
import MapContainer from "../components/mapasGeoFencing";
import getMapaData from "../utils/mapasApi";
import getFoodData from "../utils/comidasApi";
import Header from "../components/header";
import Footer from "../components/Footer";
import coloniasJson from "../props/data_colonias.json";
import ContainerComida from "../components/containerComida";
import {calculateHaversineDistance} from "../utils/funcionesMapa";
import ContainerInformacionLocales from "../components/containerInformacionLocales";

const Index = () => {
  const [mapaData, setMapaData] = useState({});
  const [mapaData3, setMapaData3] = useState({});
  const [mapaData4, setMapaData4] = useState({});
  //mapa de comida ->
  const [mapaData5, setMapaData5] = useState({});
  //mandar al mapa ->
  const [propiedadesColonias, setPropiedadesColonias] = useState([]);

  const [colonias, setColonias] = useState([]);
  const [coloniasSeleccionadas, setColoniasSeleccionadas] = useState([]);
  const [selectedFood, setSelectedFood] = useState("");
  
  //distancias ->
  const [distancias, setDistancias] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data1 = await getMapaData(1);
      const data3 = await getMapaData(3);
      const data4 = await getMapaData(4);
       
      setMapaData(data1);
      setMapaData3(data3);
      setMapaData4(data4);
    };
    getData();
  }, [propiedadesColonias]);

  useEffect(() => {
    setColonias(coloniasJson);
  }, []);

  


  const handleCheckboxChange = (colonia) => {
    if (coloniasSeleccionadas.includes(colonia)) {
      // Si la colonia ya está seleccionada, quitarla del estado
      setColoniasSeleccionadas(
        coloniasSeleccionadas.filter((c) => c !== colonia)
      );
    } else {
      // Si la colonia no está seleccionada, agregarla al estado
      setColoniasSeleccionadas([...coloniasSeleccionadas, colonia]);
    }
  };

  //selleccionar supermercado -->
  const handleSearch = () => {
    if (selectedFood !== " ") {
      try {
        getFoodData(selectedFood).then((data) => {
        setMapaData5(data);
        }); 
      } catch (error) {
        console.log(error);
      }
    } else {
      // Maneja el caso cuando no se ha seleccionado ninguna opción
      alert("Selecciona una opción antes de buscar");
    }
  };
  
  //funcion para calcular las distancias dato el local y el supermercado -->

  useEffect(() => {
    console.log("entro?");
    const medirDistancia = (mapaData5, propiedadesColonias) => {
      if(Object.keys(mapaData5).length === 0 || Object.keys(propiedadesColonias).length === 0){
        return;
      }else{
         
        const supermercados = mapaData5.geojson_data.features;
        const locales = propiedadesColonias;
        console.log("supermercados", supermercados);
        console.log("locales", locales);
       

        const supermercadosFiltrados = supermercados.filter((supermercado) => supermercado.geometry.coordinates);
        const localesFiltrados = locales.filter((local) => local.geometry.coordinates);
        console.log("supermercadosFiltrados", supermercadosFiltrados);
        console.log("localesFiltrados", localesFiltrados);
        const distanciasArray = [];
        supermercadosFiltrados.forEach((supermercado) => {
          localesFiltrados.forEach((local) => {
            const distancia = calculateHaversineDistance(
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
              metros:local.properties.tamanio,
              precio_local:local.properties.precio,
              precio_metros_cuadrado: local.properties.precio/local.properties.tamanio,
              precio_supermercado:supermercado.properties.PRECIO,
              distancia,
            });
          });
        });
        
        setDistancias(distanciasArray);
        console.log("distancias", distancias); 
      }

    };
    medirDistancia(mapaData5, propiedadesColonias);
  }, [mapaData5, propiedadesColonias]);


  return (
    <>
      <Header />
      <div className="container mx-auto mt-8 flex">
        <h1 className="text-2xl font-bold mb-4">
          Buscador de locales de comida
        </h1>
      </div>
      <div className="container mx-auto mt-8 flex">
        <ContainerComida comida={selectedFood} /> 
      </div>

      <div className="container mx-auto mt-8 flex">
        <div className="w-3/4 pr-4">
          <div>
            {mapaData4.geojson_data && (
              <MapContainer
                id="4"
                geoJson={mapaData4.geojson_data}
                propiedadesGeoJson={mapaData.geojson_data}
                supermercadosGeoJson={mapaData5.geojson_data}
                coloniasAMostrar={coloniasSeleccionadas}
                propiedadesColonias={propiedadesColonias}
                setPropiedadesColonias={setPropiedadesColonias}
                 
              />
            )}
          </div>
        </div>

        <div className="w-1/4 pl-4">
         
          <div className="mb-4">
            <p className="pt-4 pb-4">
              <b>Selecciona el platillo que quieres vender</b>
            </p>
            <label
              htmlFor="comida"
              className="block text-sm font-medium text-gray-700"
            >
              Selecciona tu comida:
            </label>
            <select
              id="comida"
              name="comida"
              className="mt-1 p-2 border rounded-md w-full"
              onChange={(e) => setSelectedFood(e.target.value)}
            >
              <option value=" ">-- Selecciona una opción --</option>
              <option value="5">Hamburguesa</option>
              <option value="6">Flan</option>
              <option value="michelada">Michelada</option>
              <option value="pizza">Pizza</option>
            </select>

          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Colonias:
            </label>
            <div className="max-h-40 overflow-y-auto border rounded-md p-2">
              {colonias.map((colonia, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`colonia-${index}`}
                    value={colonia}
                    checked={coloniasSeleccionadas.includes(colonia)}
                    onChange={() => handleCheckboxChange(colonia)}
                    className="mr-2"
                  />
                  <label htmlFor={`colonia-${index}`}>{colonia}</label>
                </div>
              ))}
            </div>
            <p>Colonias seleccionadas: {coloniasSeleccionadas.join(", ")}</p>
          </div>

          <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Buscar
          </button>

          
        </div>
        
      </div>
      <div className="mt-8 mb-8 p-8 rounded-md">
                {
                  distancias &&  distancias.length > 0 && (
                    <div className="p-10">
                      <ContainerInformacionLocales datos={distancias}/>
                      </div>
                  )
                }
      </div>
      <Footer />
    </>
  );
};

export default Index;
