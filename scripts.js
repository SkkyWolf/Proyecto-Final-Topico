// Api Url = https://api.edamam.com/api/food-database/v2/parser
// ?app_id=
// Api id = a8677582
// &app_key=
// Api key = b3f8c7074f5e849ff1234712a0c505fc

async function fetchApi (){
    const apiUrl = "https://api.edamam.com/api/food-database/v2/parser";
    const apiID = "a8677582";
    const apiKey = "b3f8c7074f5e849ff1234712a0c505fc";
    const fullApi = `${apiUrl}?app_id=${apiID}&app_key=${apiKey}&nutrition-type=cooking`;

    try{
        const response = await fetch(fullApi);
        if(response.status == 200){
            const foodData = await response.json();
            console.log(foodData);
        }else{
            console.log('Error al obtener los datos', response.status);
        }
    }catch(error){
        console.log('Hubo un error:', error )
    }

}

fetchApi();
console.log("enabled");


