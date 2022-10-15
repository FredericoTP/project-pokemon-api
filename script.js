const inputPokemonName = document.getElementById('pokemon-name');
const searchButton = document.getElementById('btn-search');
const randomButton = document.getElementById('btn-random');

const renderRates = () => {
  alert('oi');
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
