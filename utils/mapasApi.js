async function getMapaData(id) {

    try{
    const response = await fetch(`https://econometricos-186a1a12a814.herokuapp.com/geojson/${id}`);
    const data = await response.json();
    return data;
    }catch(error){
      console.log(error);
    }
    
  }
  
  export default getMapaData;
  