async function getMapaData(id) {
    const response = await fetch(`http://localhost:5000/geojson/${id}`);
    const data = await response.json();
    return data;
  }
  
  export default getMapaData;
  