import Link from 'next/link';
import { useState, useEffect } from 'react';
import MapContainer from '../components/mapasGeoFencing' 
import getMapaData from '../utils/mapasApi';

const Test_Mapa = () => {
  const [mapaData, setMapaData] = useState({});
  useEffect(() => {
    const getData = async () => {
      const data = await getMapaData(4);
      setMapaData(data);
    };
    getData();
  }, []);

  return (
    <div className="container mx-auto mt-8">
       <div>
      <h1>Mi Aplicación con Geofencing</h1>
      {
        mapaData.geojson_data && (
          <MapContainer id="4" geoJson={mapaData.geojson_data} />
        )
      }
    </div>
    </div>
  );
};

export default Test_Mapa;
