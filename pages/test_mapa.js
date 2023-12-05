import Link from 'next/link';
import { useState, useEffect } from 'react';
import MapContainer from '../components/mapasGeoFencing' 
import getMapaData from '../utils/mapasApi';

const Test_Mapa = () => {
  const [mapaData, setMapaData] = useState({});
  const [mapaData3, setMapaData3] = useState({});
  const [mapaData4, setMapaData4] = useState({});

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
  }, []);

  return (
    <div className="container mx-auto mt-8">
       <div>
      <h1>Mi Aplicación con Geofencing</h1>
      {
        mapaData4.geojson_data && (
          <MapContainer id="4" geoJson={mapaData4.geojson_data} propiedadesGeoJson={mapaData.geojson_data} supermercadosGeoJson={mapaData3.geojson_data}/>
        )
      }
    </div>
    </div>
  );
};

export default Test_Mapa;
