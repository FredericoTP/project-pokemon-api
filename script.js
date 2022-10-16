const inputPokemonName = document.getElementById('pokemon-name');
const searchButton = document.getElementById('btn-search');
const randomButton = document.getElementById('btn-random');
const sectionPokemonInfo = document.getElementById('info-pokemon');
const infoP = document.getElementById('info-paragraph');

const renderWeight = (weight) => {
  const ulElement = document.querySelector('.list-group');
  const createLi = document.createElement('li');
  createLi.classList.add('list-group-item');
  const toKilo = weight * 0.1;
  createLi.innerText = `Peso: ${toKilo.toFixed(2)}kg`;
  ulElement.appendChild(createLi);
};

const renderHeight = (height) => {
  const ulElement = document.querySelector('.list-group');
  const createLi = document.createElement('li');
  createLi.classList.add('list-group-item');
  const toMetres = height * 0.1;
  createLi.innerText = `Altura: ${toMetres.toFixed(2)}m`;
  ulElement.appendChild(createLi);
};

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

const renderImage = (sprite) => {
  const divCard = document.querySelector('.card');
  const createImg = document.createElement('img');
  createImg.classList.add('card-img-top');
  createImg.src = sprite;
  createImg.alt = 'Imagem do pokemon'
  divCard.appendChild(createImg);
};

const renderImagePokemon = (sprites) => {
  if (typeof sprites === 'string') {
    renderImage(sprites);
    return;
  }

  const divCard = document.querySelector('.card');
  sprites.forEach((sprite) => {
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
  const { front_default, front_shiny, other } = sprites;
  const artwork = other['official-artwork'];

  if (front_default === null) {
    return artwork.front_default;
  }

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
  renderWeight(weight);
};

const handleSearchEvent = async () => {
  try {
    const pokemonName = inputPokemonName.value.toLowerCase();
    if (!pokemonName) {
      throw new Error('Coloque um nome');
    }
    const pokemonObj = await fetchApiPokemon(pokemonName);
    infoP.innerHTML = '';
    sectionPokemonInfo.innerText = '';
    renderRates(pokemonObj);
  } catch (erro) {
    infoP.innerText = erro.message;
  }
};

const randomId = () => Math.floor(Math.random() * 905) + 1;

const handleRandomEvent = async () => {
  const pokemonIdRandom = randomId();
  const pokemonObj = await fetchApiPokemon(pokemonIdRandom);
  sectionPokemonInfo.innerText = '';
  renderRates(pokemonObj);
};

const addEventSearchButton = () => {
  searchButton.addEventListener('click', handleSearchEvent);
};

const addEventRandomButton = () => {
  randomButton.addEventListener('click', handleRandomEvent);
};

window.onload = () => {
  addEventSearchButton();
  addEventRandomButton();
};
