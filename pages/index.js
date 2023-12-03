import Mapa from '../components/mapa';
import MapaPropiedades from '../components/mapaPropiedades';
import mapaListaGeoJson from '../components/mapaListaGeoJson';
import geoJsonData from '../geojson/cdmx.geojson';
import { useState, useEffect } from 'react';
import getMapaData from '../utils/mapasApi';
import MapaListaGeoJson from '../components/mapaListaGeoJson';


const Index = () => {
  const [mapaData, setMapaData] = useState({});
  const [mapaData3, setMapaData3] = useState({});

  useEffect(() => {
    const getData = async () => {
      const data = await getMapaData(1);
      const data3 = await getMapaData(3);
      setMapaData(data);
      setMapaData3(data3);
    };
    getData();
  }, []);
  

  return (
    <div className="container mx-auto mt-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Explora los diferentes precios de las Tiendas!</h1>
      <div className="mt-8">
       {/* 
            **********PRUEBA*************
       <Mapa id="1" geoJsonData={geoJsonData} /> 
       
       */}
        
        <div className='pt-8 pb-8'>
        {
          mapaData.geojson_data && (
            <MapaPropiedades id="2" geoJsonData={mapaData.geojson_data} />
          )
        }
        </div>
        <div className='pt-8 pb-8'>
        {
            mapaData3.geojson_data && (
              <MapaListaGeoJson id="3" propiedadesGeoJson={mapaData.geojson_data} supermercadosGeoJson={mapaData3.geojson_data} />
            )
        }
        </div>
     
    </div>
    </div>
  );
};

export default Index;
