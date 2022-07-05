const log = console.log

// FETCH DATA //
const hyruleData = {
  allData: fetchHyruleData("https://botw-compendium.herokuapp.com/api/v2/all"),
  favorites: [],
};

// ADD EVENT LISTENER TO THE FAVORITES BUTTON //
const faveButton = document.querySelector(".favorites-button");

faveButton.addEventListener("click", () => {
  displayCards.textContent = ``;
    hyruleData.favorites.forEach((item) => {
      console.log(item);
      renderFavoritesCard(item);
    });
});

// FAVORITES CARD //
function renderFavoritesCard(data) {
  const card = document.createElement("div");
  card.className = "card";
  card.style.width = "18rem";
  const cardContent = `
      <img src="${data.image}" class="card-img-top" alt="${data.image}">
      <div class="card-body">
        <h5 class="card-title">Name: ${data.name[0]
          .toUpperCase()
          .slice(-1)}${data.name.slice(1)} </h5>
        <p class="card-text">${data.description}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Hearts Recovered: ${
          data.hearts_recovered
        }</li>
        <li class="list-group-item">Common Locations: ${
          data.common_locations
        }</li>
        <li class="list-group-item">Cooking Effect(s): ${
          data.cooking_effect
        }</li>
      </ul>
      <button class='remove-button'>➖ Remove</button>`;
  card.innerHTML = cardContent;
  const removeButton = card.querySelector(".remove-button");

  // ADD EVENT LISTENER TO REMOVE BUTTON //
  removeButton.addEventListener("click", (e) => {
    card.remove();
  });

  displayCards.append(card);
}

// GLOBAL VARIABLES //
const form = document.querySelector(".search-hyrule");
const displayCards = document.querySelector("#results");

async function fetchHyruleData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// DESTRUCTURE OBJECTS //
hyruleData.allData.then(({ data }) => {
  const { creatures } = data;
  const { food, non_food } = creatures;
  const { equipment } = data;
  const { materials } = data;
  const { monsters } = data;

  hyruleData.creatures = creatures;
  hyruleData.edibleCreatures = food;
  hyruleData.nonEdibleCreatures = non_food;
  hyruleData.materials = materials;
  hyruleData.monsters = monsters;
  hyruleData.equipment = equipment;

  renderMaterials(materials);
});

// MATERIALS CARD - INCLUDES SPECIFIC KEYS FOR MATERIALS //
function renderMaterialsCard(data) {
  const card = document.createElement("div");
  card.className = "card";
  card.style.width = "18rem";
  const cardContent = `
    <img src="${data.image}" class="card-img-top" alt="${data.image}">
    <div class="card-body">
      <h5 class="card-title">Name: ${data.name[0]
        .toUpperCase()
        .slice(-1)}${data.name.slice(1)} </h5>
      <p class="card-text">${data.description}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Hearts Recovered: ${
        data.hearts_recovered
      }</li>
      <li class="list-group-item">Common Locations: ${
        data.common_locations
      }</li>
      <li class="list-group-item">Cooking Effect(s): ${data.cooking_effect}</li>
    </ul>
    <button class='add-button'>➕ Add to Favorites</button>`;
  card.innerHTML = cardContent;
  const addButton = card.querySelector(".add-button");

  // ADD EVENT LISTENER TO ADD BUTTON //
  addButton.addEventListener("click", () => {
    hyruleData.favorites.push(data);
  });

  displayCards.append(card);
}

// RENDER MATERIALS TO CARDS //
function renderMaterials(data) {
  data.forEach((item) => {
    renderMaterialsCard(item);
  });
}

// SEARCH //
function searchHyrule(e) {
  e.preventDefault();
  debugger;
  const searchTerm = e.target.elements["search"].value;
  return searchTerm;
}

function search() {
  form.addEventListener("submit", searchHyrule);
}
search(hyruleData);
