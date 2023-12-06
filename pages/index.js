import Link from 'next/link';
import { useState, useEffect } from 'react';
import MapContainer from '../components/mapasGeoFencing' 
import getMapaData from '../utils/mapasApi';
import Header from '../components/header';
import Footer from '../components/Footer';
import coloniasJson from '../props/data_colonias.json';

const Index = () => {
  const [mapaData, setMapaData] = useState({});
  const [mapaData3, setMapaData3] = useState({});
  const [mapaData4, setMapaData4] = useState({});
  const [mapaData5, setMapaData5] = useState({});

  const [colonias, setColonias] = useState([]);
  const [coloniasSeleccionadas, setColoniasSeleccionadas] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data1 = await getMapaData(1);
      const data3 = await getMapaData(3);
      const data4 = await getMapaData(4);
      const data5 = await getMapaData(5);

      setMapaData(data1);
      setMapaData3(data3);
      setMapaData4(data4);
      setMapaData5(data5);
    };
    getData();
  }, []);

  useEffect(() => {
    setColonias(coloniasJson);
  }, []);

  const handleCheckboxChange = (colonia) => {
    if (coloniasSeleccionadas.includes(colonia)) {
      // Si la colonia ya está seleccionada, quitarla del estado
      setColoniasSeleccionadas(coloniasSeleccionadas.filter((c) => c !== colonia));
    } else {
      // Si la colonia no está seleccionada, agregarla al estado
      setColoniasSeleccionadas([...coloniasSeleccionadas, colonia]);
    }
  };

  return (
   
    <>  
     <Header/>
    <div className="container mx-auto mt-8 flex">
    <h1 className="text-2xl font-bold mb-4">Buscador de locales de comida</h1>
    </div>
    
    <div className="container mx-auto mt-8 flex">
    <div className="w-3/4 pr-4">
      <div>
        {mapaData4.geojson_data && (
          <MapContainer id="4" 
            geoJson={mapaData4.geojson_data} 
            propiedadesGeoJson={mapaData.geojson_data} 
            supermercadosGeoJson={mapaData5.geojson_data} 
            coloniasAMostrar={coloniasSeleccionadas} 
          />
        )}
      </div>
    </div>

    
    <div className="w-1/4 pl-4">
      <div className="mb-4">
        <p className='pt-4 pb-4'>Selecciona el platillo que quieres vender</p>
        <label htmlFor="comida" className="block text-sm font-medium text-gray-700">Selecciona tu comida:</label>
        <select id="comida" name="comida" className="mt-1 p-2 border rounded-md w-full">
          <option value="hamburguesa">Hamburguesa</option>
          <option value="flan">Flan</option>
          <option value="michelada">Michelada</option>
          <option value="pizza">Pizza</option>
        </select>
      </div>

      
      <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Colonias:</label>
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
      <p>Colonias seleccionadas: {coloniasSeleccionadas.join(', ')}</p>
    </div>

     
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Buscar</button>

       
      <div className="mt-8 bg-gray-200 p-4 rounded-md">
        
      </div>
    </div>
  </div>
          <Footer/>
  </>
  
  );
  
};

export default Index;
