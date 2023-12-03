async function getMapaData(id) {

    try{
    const response = await fetch(`http://localhost:5000/geojson/${id}`);
    const data = await response.json();
    return data;
    }catch(error){
      console.log(error);
    }
    
  }
  
  export default getMapaData;
  