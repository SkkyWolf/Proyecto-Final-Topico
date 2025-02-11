// Api Url = https://api.edamam.com/api/recipes/v2?type=public
// Api id = 8f1264ad
// Api key = aad51e9746e7e84fff6e179fd6e8de1d

const filters = {
  diet: {
    value: "Dieta",
    items: new Map([
      ["balanced", "Equilibrada"],
      ["high-fiber", "Alta en fibra"],
      ["high-protein", "Alta en proteínas"],
      ["low-carb", "Baja en carbohidratos"],
      ["low-fat", "Baja en grasas"],
      ["low-sodium", "Baja en sodio"],
    ]),
  },
  health: {
    value: "Salud",
    items: new Map([
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
    ]),
  },
  cuisineType: {
    value: "Tipo de Cocina",
    items: new Map([
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
    ]),
  },
  mealType: {
    value: "Tipo de Comida",
    items: new Map([
      ["Breakfast", "Desayuno"],
      ["Lunch", "Almuerzo"],
      ["Dinner", "Cena"],
      ["Snack", "Merienda"],
      ["Teatime", "Hora del té"],
    ]),
  },
  dishType: {
    value: "Tipo de Plato",
    items: new Map([
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
    ]),
  },
};

function filterQueryString(filter) {
  const className = upperCaseChange(filter);
  const everyCheckbox = document.querySelectorAll(
    `.${className} input[type="radio"]`
  );
  const checkedCheckboxes = Array.from(everyCheckbox).filter(
    (checkbox) => checkbox.checked
  );
  const checkedCheckboxesValues = checkedCheckboxes.map(
    (checkbox) => checkbox.value
  );
  if (!checkedCheckboxesValues.length) return "";
  return `&${filter}=${checkedCheckboxesValues.join(",")}`;
}

async function fetchApi() {
  const busquedaComida = document.getElementById("serachFood").value;
  const loadingElement = document.getElementById("infoContainer");

  if (busquedaComida == "" && !filtroSelect()) {
    showAlert(
      "Por favor, complete el campo de búsqueda o selecciona al menos un filtro"
    );
    displayFood({ count: 0 });
    return;
  }

  const apiUrl = "https://api.edamam.com/api/recipes/v2?type=public";
  const apiID = "8f1264ad";
  const apiKey = "aad51e9746e7e84fff6e179fd6e8de1d";
  let fullApi = `${apiUrl}&q=${busquedaComida}&app_id=${apiID}&app_key=${apiKey}`;
  for (const key in filters) fullApi += filterQueryString(key);
  loadingElement.classList.remove("hidden");

  try {
    const response = await fetch(fullApi);
    if (response.status == 200) {
      const foodData = await response.json();
      displayFood(foodData);
    } else {
      showAlert("Error al obtener los datos: " + response.status);
      displayFood({ count: 0 });
      const err = await response.json();
      console.log(err.errors);
    }
  } catch (error) {
    showAlert(
      "Error! Verifique su conexión a Internet y vuelva a intentarlo más tarde."
    );
    displayFood({ count: 0 });
    console.log(error);
  }
}

function filtroSelect() {
  for (const key in filters) {
    const className = upperCaseChange(key);
    const checkboxes = document.querySelectorAll(
      `.${className} input[type="radio"]:checked`
    );
    if (checkboxes.length > 0) {
      return true;
    }
  }
  return false;
}

function displayFood(foodData) {
  const loadingElement = document.getElementById("infoContainer");
  loadingElement.classList.add("hidden");
  const allFoodContainer = document.getElementById("allFood");
  allFoodContainer.innerHTML = "";

  const noResultsDiv = document.getElementById("noResults");

  if (!foodData.count) {
    noResultsDiv.classList.remove("hidden");

    return;
  } else {
    noResultsDiv.classList.add("hidden");
  }

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
  if (event.keyCode === 13) fetchApi();
}

function buttonBusqueda() {
  fetchApi();
}

function createCheckboxes() {
  const elementoPrincipal = document.getElementById("listChec");
  elementoPrincipal.replaceChildren();

  for (const key in filters) {
    const elementoSecundario = document.createElement("div");
    elementoSecundario.className = upperCaseChange(key) + " filter";
    const label = document.createElement("label");
    label.value = key;
    label.textContent = filters[key].value;
    elementoSecundario.appendChild(label);
    elementoPrincipal.appendChild(elementoSecundario);

    for (const unitInfo of filters[key].items) {
      const inputValue = unitInfo[0];
      const nombreAMostrar = unitInfo[1];

      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = key;
      input.value = inputValue;
      input.title = nombreAMostrar;
      label.title = nombreAMostrar;
      label.append(input, nombreAMostrar);
      input.style.marginRight = "5px";

      elementoSecundario.appendChild(label);
    }
  }
}

function upperCaseChange(string) {
  return "fil" + string.charAt(0).toUpperCase() + string.substring(1);
}

let alertIndex = 0;

function showAlert(message) {
  var modal = document.createElement("div");
  modal.className = "modalShowAlert";
  modal.setAttribute("data-index", alertIndex);
  document.body.classList.add("modal-open");

  var modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  modalContent.innerHTML = `
    <div class="conText">
      <img src="img/iconAlert.png">
      <p>${message}</p>
      <span class="close" onclick="closeModal()">&times;</span>
    </div>
  `;

  modal.appendChild(modalContent);

  document.body.appendChild(modal);

  modal.style.display = "block";

  modal.style.top = `${alertIndex * 100}px`;

  alertIndex++;
}

function closeModal() {
  var modal = document.querySelector(".modalShowAlert:last-child");
  if (modal) {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
    document.body.removeChild(modal);

    alertIndex--;

    const showAlertCloseAll = document.querySelectorAll(".modalShowAlert");
    showAlertCloseAll.forEach((alert, i) => {
      alert.style.top = `${i * 100}px`;
      alert.setAttribute("data-index", i);
    });
  }
}

// EVENTS
document.getElementById("serachFood").addEventListener("keydown", busquedaKey);
document.getElementById("btnSearch").addEventListener("click", buttonBusqueda);
document.addEventListener("DOMContentLoaded", createCheckboxes);
