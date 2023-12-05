import Link from 'next/link';
import { useState, useEffect } from 'react';
import MapContainer from '../components/mapasGeoFencing' 
import getMapaData from '../utils/mapasApi';
import Header from '../components/header';
import Footer from '../components/Footer';

const Index = () => {
  const [mapaData, setMapaData] = useState({});
  const [mapaData3, setMapaData3] = useState({});
  const [mapaData4, setMapaData4] = useState({});
  const [mapaData5, setMapaData5] = useState({});

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
          <MapContainer id="4" geoJson={mapaData4.geojson_data} propiedadesGeoJson={mapaData.geojson_data} supermercadosGeoJson={mapaData5.geojson_data}/>
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
        <label htmlFor="busqueda" className="block text-sm font-medium text-gray-700">Buscar por colonia:</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input type="text" id="busqueda" name="busqueda" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-10 py-2 border-gray-300 rounded-md" placeholder="Nombre de la colonia" />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M11 14h-.79l-.28-.27a6.5 6.5 0 111.06-1.06l.27.28v.79l5 4.99L15.99 20l.01-5-4.99-5zm-5 0C4.01 14 2 11.99 2 9.5S4.01 5 6.5 5 11 6.99 11 9.5 8.99 14 6.5 14z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
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
