const inputPokemonName = document.getElementById('pokemon-name');
const searchButton = document.getElementById('btn-search');
const randomButton = document.getElementById('btn-random');
const sectionPokemonInfo = document.getElementById('info-pokemon');



const renderTypes = (types) => {
  const divCard = document.querySelector('.card');
  const createUl = document.createElement('ul');
  createUl.classList.add('list-group', 'list-group-flush');
  divCard.appendChild(createUl);
  const createLi = document.createElement('li');
  createLi.classList.add('list-group-item')
  const typeName = types.reduce((acc, curr) => `${acc}, ${curr}`);
  createLi.innerText = `Tipo: ${typeName}`;
  createUl.appendChild(createLi);
};

const renderNamePokemon = (name) => {
  const divCard = document.querySelector('.card');
  const createDiv = document.createElement('div');
  const createH5 = document.createElement('h5');
  createDiv.classList.add('card-body');
  createH5.classList.add('card-title');
  const nameUpper = name[0].toUpperCase() + name.substring(1);
  createH5.innerText = nameUpper;
  createDiv.appendChild(createH5);
  divCard.appendChild(createDiv);
};

const renderImagePokemon = (sprites) => {
  sprites.forEach((sprite) => {
    const divCard = document.querySelector('.card');
    const createImg = document.createElement('img');
    createImg.classList.add('card-img-top');
    createImg.src = sprite;
    createImg.alt = 'Imagem do pokemon'
    divCard.appendChild(createImg);
  });
};

const renderPokemon = (name, sprites) => {
  const createDiv = document.createElement('div');
  createDiv.classList.add('card');
  sectionPokemonInfo.appendChild(createDiv);
  renderImagePokemon(sprites);
  renderNamePokemon(name);
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
  renderTypes(type);
  renderHeight(height);
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
