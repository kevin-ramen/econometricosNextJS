import Mapa from '../components/mapa';
import geoJsonData from '../geojson/cdmx.geojson';

const Index = () => (
  <div className="container mx-auto mt-8 text-center">
    <h1 className="text-4xl font-bold mb-4">Explora los diferentes precios de las Tiendas!</h1>
    <div className="mt-8">
      <Mapa geoJsonData={geoJsonData} />
    </div>
  </div>
);

export default Index;
