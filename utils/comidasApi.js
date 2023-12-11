async function getFoodData(id) {
    //hamburguesa --> 5
    //flan --> 6
    console.log("id", id);
    try{
    const response = await fetch(`https://econometricos-186a1a12a814.herokuapp.com/geojson/${id}`);
    const data = await response.json();
    return data;
    }catch(error){
      console.log(error);
    }
    
  }
  
  export default getFoodData;
  