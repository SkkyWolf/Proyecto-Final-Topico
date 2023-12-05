// Api Url = https://api.edamam.com/api/recipes/v2?type=public
// Api id = 8f1264ad
// Api key = aad51e9746e7e84fff6e179fd6e8de1d

async function fetchApi() {
  //Dieta
  const busquedaComida = document.getElementById("serachFood").value;
  const cboxDiet = document.querySelectorAll('.filDiet input[type="checkbox"]');
  const checkedCboxDiet = Array.from(cboxDiet).filter(
    (checkbox) => checkbox.checked
  );
  const valSelectDiet = checkedCboxDiet.map((checkbox) => checkbox.value);
  const catDiet = document
    .querySelector(".filDiet label")
    .getAttribute("value");
  const filtroDiet =
    valSelectDiet.length > 0 ? `&${catDiet}=${valSelectDiet.join(",")}` : "";

  //Salud
  const cboxHealth = document.querySelectorAll(
    '.filHealth input[type="checkbox"]'
  );
  const checkedCboxHealth = Array.from(cboxHealth).filter(
    (checkbox) => checkbox.checked
  );
  const valSelectHealth = checkedCboxHealth.map((checkbox) => checkbox.value);
  const catHealth = document
    .querySelector(".filHealth label")
    .getAttribute("value");
  const filtroHealth =
    valSelectHealth.length > 0
      ? `&${catHealth}=${valSelectHealth.join(",")}`
      : "";

  //Tipos de cocina
  const cboxCuisineType = document.querySelectorAll(
    '.filCuisineType input[type="checkbox"]'
  );
  const checkedCboxCuisineType = Array.from(cboxCuisineType).filter(
    (checkbox) => checkbox.checked
  );
  const valSelectCuisineType = checkedCboxCuisineType.map(
    (checkbox) => checkbox.value
  );
  const catCuisineType = document
    .querySelector(".filCuisineType label")
    .getAttribute("value");
  const filtroCuisineType =
    valSelectCuisineType.length > 0
      ? `&${catCuisineType}=${valSelectCuisineType.join(",")}`
      : "";

  //Tipos de comidas
  const cboxMealType = document.querySelectorAll(
    '.filMealType input[type="checkbox"]'
  );
  const checkedCboxMealType = Array.from(cboxMealType).filter(
    (checkbox) => checkbox.checked
  );
  const valSelectMealType = checkedCboxMealType.map(
    (checkbox) => checkbox.value
  );
  const catMealType = document
    .querySelector(".filMealType label")
    .getAttribute("value");
  const filtroMealType =
    valSelectMealType.length > 0
      ? `&${catMealType}=${valSelectMealType.join(",")}`
      : "";

  //Tipos de platos
  const cboxDishType = document.querySelectorAll(
    '.filDishType input[type="checkbox"]'
  );
  const checkedCboxDishType = Array.from(cboxDishType).filter(
    (checkbox) => checkbox.checked
  );
  const valSelectDishType = checkedCboxDishType.map(
    (checkbox) => checkbox.value
  );
  const catDishType = document
    .querySelector(".filDishType label")
    .getAttribute("value");
  const filtroDishType =
    valSelectDishType.length > 0
      ? `&${catDishType}=${valSelectDishType.join(",")}`
      : "";

  const apiUrl = "https://api.edamam.com/api/recipes/v2?type=public";
  const apiID = "8f1264ad";
  const apiKey = "aad51e9746e7e84fff6e179fd6e8de1d";
  let fullApi = `${apiUrl}&q=${busquedaComida}&app_id=${apiID}&app_key=${apiKey}${
    filtroDiet || ""
  }${filtroHealth || ""}${filtroCuisineType || ""}${filtroMealType || ""}${
    filtroDishType || ""
  }`;

  try {
    const response = await fetch(fullApi);
    console.log("Respuesta de la API:", response);
    if (response.status == 200) {
      const foodData = await response.json();
      displayFood(foodData);
    } else {
      console.log("Error al obtener los datos", response.status);
    }
  } catch (error) {
    console.log("Hubo un error:", error);
  }
}

function displayFood(foodData) {
  const allFoodContainer = document.getElementById("allFood");
  allFoodContainer.innerHTML = "";

  foodData.hits.forEach((hit) => {
    const foodDiv = document.createElement("div");

    const calorias = hit.recipe.calories.toFixed(2);
    const proteina = hit.recipe.totalNutrients.PROCNT.quantity.toFixed(2);
    const grasa = hit.recipe.totalNutrients.FAT.quantity.toFixed(2);
    const carboh = hit.recipe.totalNutrients.CHOCDF.quantity.toFixed(2);
    const fibra = hit.recipe.totalNutrients.FIBTG.quantity.toFixed(2);

    foodDiv.innerHTML = `
        <div class="cardFood"> 
            <img src="${hit.recipe.image || ""}" alt="${
      hit.recipe.label || ""
    }"/>
            <div class="desc">
                <p>${hit.recipe.label}</p>
                <ul>
                    <li>Calorías: ${calorias}</li>
                    <li>Proteína: ${proteina}</li>
                    <li>Grasa: ${grasa}</li>
                    <li>Carbohidratos: ${carboh}</li>
                    <li>Fibra: ${fibra}</li>
                </ul>
            </div>
        </div>
        `;

    allFoodContainer.appendChild(foodDiv);
  });
}

function busquedaKey(event) {
  if (event.keyCode === 13) {
    const busquedaComida = document.getElementById("serachFood").value;
    fetchApi(busquedaComida, "");
  }
}

function buttonBusqueda() {
  const busquedaComida = document.getElementById("serachFood").value;
  fetchApi(busquedaComida, "");
}

function createCheckboxes() {
  const checkboxesInfo = new Map([
    ["fildiet", "Dieta"],
    ["balanced", "Equilibrada"],
    ["high-fiber", "Alta en fibra"],
    ["high-protein", "Alta en proteínas"],
    ["low-carb", "Baja en carbohidratos"],
    ["low-fat", "Baja en grasas"],
    ["low-sodium", "Baja en sodio"],
    ["filhealth", "Salud"],
    ["alcohol-free", "Alcohol"],
    ["immuno-supportive", "Compatible con el sistema inmunológico"],
    ["celery-free", "Apio"],
    ["crustacean-free", "Crustáceos"],
    ["dairy-free", "Lácteos"],
    ["egg-free", "Huevos"],
    ["fish-free", "Pescado"],
    ["fodmap-free", "FODMAP"],
    ["gluten-free", "Gluten"],
    ["keto-friendly", "Amigable con la dieta keto"],
    ["kidney-friendly", "Amigable con los riñones"],
    ["kosher", "Kosher"],
    ["low-potassium", "Baja en potasio"],
    ["lupine-free", "Lupino"],
    ["mustard-free", "Mostaza"],
    ["vegan", "Vegana"],
    ["filcuisineType", "Tipo de Cocina"],
    ["american", "Americana"],
    ["asian", "Asiática"],
    ["british", "Británica"],
    ["caribbean", "Caribeña"],
    ["central europe", "Europea Central"],
    ["chinese", "China"],
    ["eastern europe", "Europea Oriental"],
    ["french", "Francesa"],
    ["greek", "Griega"],
    ["indian", "India"],
    ["italian", "Italiana"],
    ["japanese", "Japonesa"],
    ["korean", "Coreana"],
    ["kosher", "Kosher"],
    ["mediterranean", "Mediterránea"],
    ["middle eastern", "Del Medio Oriente"],
    ["nordic", "Nórdica"],
    ["south american", "Sudamericana"],
    ["south east asian", "Del Sudeste Asiático"],
    ["world", "Mundial"],
    ["filmealType", "Tipo de Comida"],
    ["Breakfast", "Desayuno"],
    ["Lunch", "Almuerzo"],
    ["Dinner", "Cena"],
    ["Snack", "Merienda"],
    ["Teatime", "Hora del té"],
    ["fildishType", "Tipo de Plato"],
    ["alcohol cocktail", "Cóctel con alcohol"],
    ["biscuits and cookies", "Galletas y cookies"],
    ["bread", "Pan"],
    ["cereals", "Cereales"],
    ["condiments and sauces", "Condimentos y salsas"],
    ["desserts", "Postres"],
    ["drinks", "Bebidas"],
    ["egg", "Huevo"],
    ["ice cream and custard", "Helado y natillas"],
    ["main course", "Plato principal"],
    ["pancake", "Panqueque"],
    ["pasta", "Pasta"],
    ["pastry", "Pastelería"],
    ["pies and tarts", "Pasteles y tartas"],
    ["pizza", "Pizza"],
    ["preps", "Preparativos"],
    ["salad", "Ensalada"],
    ["sandwiches", "Sándwiches"],
    ["seafood", "Mariscos"],
    ["side dish", "Acompañamiento"],
    ["soup", "Sopa"],
    ["special occasions", "Ocasiones especiales"],
    ["starter", "Entrada"],
    ["sweets", "Dulces"],
  ]);

  const elementoPrincipal = document.getElementById("listChec");
  let elementoSecundario = null;
  for (const unitInfo of checkboxesInfo) {
    const key = unitInfo[0];
    const value = unitInfo[1];

    if (key.startsWith("fil")) {
      elementoSecundario = document.createElement("div");
      elementoSecundario.className = upperCaseChange(key);
      const label = document.createElement("label");
      label.value = key.substring(3);
      label.textContent = value;
      elementoSecundario.appendChild(label);
      elementoPrincipal.appendChild(elementoSecundario);
    } else {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "checkbox";
      input.value = key;
      label.append(input, value);
      elementoSecundario.appendChild(label);
    }
  }
}

function upperCaseChange(string) {
  return (
    string.substring(0, 3) +
    string.charAt(3).toUpperCase() +
    string.substring(4)
  );
}

document.getElementById("serachFood").addEventListener("keydown", busquedaKey);

document.getElementById("btnSearch").addEventListener("click", buttonBusqueda);

document.addEventListener("DOMContentLoaded", createCheckboxes);
