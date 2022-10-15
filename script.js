const inputPokemonName = document.getElementById('pokemon-name');
const searchButton = document.getElementById('btn-search');
const randomButton = document.getElementById('btn-random');
const sectionPokemonInfo = document.getElementById('info-pokemon');

const renderImagePokemon = (sprites) => {
  sprites.forEach((sprite) => {
    const divCard = document.querySelector('.card');
    const createImg = document.createElement('img');
    createImg.src = sprite;
    divCard.appendChild(createImg);
  });
};

const renderPokemon = (name, sprites) => {
  const createDiv = document.createElement('div');
  createDiv.classList.add('card');
  sectionPokemonInfo.appendChild(createDiv);
  renderImagePokemon(sprites);
};

const pokemonSprites = (sprites) => {
  const { front_default, front_shiny } = sprites;
  const sprite = [front_default, front_shiny];

  return sprite;
}

const pokemonTypes = (types) => types.map((type) => type.type.name);

const renderRates = (pokemonObj) => {
  const { height, name, sprites, types, weight } = pokemonObj;
  const type = pokemonTypes(types);
  const sprite = pokemonSprites(sprites);
  renderPokemon(name, sprite);
};

const handleSearchEvent = async () => {
  const pokemonName = inputPokemonName.value;
  const pokemonObj = await fetchApiPokemon(pokemonName);

  renderRates(pokemonObj);
};

const addEventSearchButton = () => {
  searchButton.addEventListener('click', handleSearchEvent);
};

window.onload = () => {
  addEventSearchButton();
};
