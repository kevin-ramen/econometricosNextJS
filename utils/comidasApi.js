async function getFoodData(id) {
    //hamburguesa --> 5
    //flan --> 6
    console.log("id", id);
    try{
    const response = await fetch(`http://127.0.0.1:5000/geojson/${id}`);
    const data = await response.json();
    return data;
    }catch(error){
      console.log(error);
    }
    
  }
  
  export default getFoodData;
  