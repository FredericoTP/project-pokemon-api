const apiUrl = 'https://pokeapi.co/api/v2/';
const endPoint = 'pokemon/';

const fetchApiPokemon = async (pokemon) => {
  const url = `${apiUrl}${endPoint}${pokemon}`;
  const response = await fetch(url);
  const value = await response.json();

  return value;
};
