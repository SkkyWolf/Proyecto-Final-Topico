// Api Url = https://api.edamam.com/api/food-database/v2/parser
// ?app_id=
// Api id = a8677582
// &app_key=
// Api key = b3f8c7074f5e849ff1234712a0c505fc

async function fetchApi() {
    const apiUrl = "https://api.edamam.com/api/food-database/v2/parser";
    const apiID = "a8677582";
    const apiKey = "b3f8c7074f5e849ff1234712a0c505fc";
    const fullApi = `${apiUrl}?app_id=${apiID}&app_key=${apiKey}&health=vegan`;

    try {
        const response = await fetch(fullApi);
        if (response.status == 200) {
            const foodData = await response.json();
            displayFood(foodData);
        } else {
            console.log('Error al obtener los datos', response.status);
        }
    } catch (error) {
        console.log('Hubo un error:', error)
    }
}

function displayFood(food) {
    const allFoodContainer = document.getElementById('allFood');

    food.hints.forEach(food => {

        const foodDiv = document.createElement('div');

        foodDiv.innerHTML = `
        <div class="cardFood"> 
            <img src="${food.food.image}" alt="${food.food.label}"/>
            <div class="desc">
                <p>${food.food.label}</p>
                <ul>
                    <li>Calorías: ${food.food.nutrients.ENERC_KCAL}</li>
                    <li>Proteína: ${food.food.nutrients.PROCNT}</li>
                    <li>Grasa: ${food.food.nutrients.FAT}</li>
                    <li>Carbohidratos: ${food.food.nutrients.CHOCDF}</li>
                    <li>Fibra: ${food.food.nutrients.FIBTG}</li>
                </ul>
            </div>
        </div>
        `;

        allFoodContainer.appendChild(foodDiv);
    });
}

fetchApi();
