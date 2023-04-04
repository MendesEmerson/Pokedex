const pokeAPI = {}

function convertPokeApitoPokemon(pokeDetails) {
    const pokemon = new Pokemon();
    const types = pokeDetails.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types

    pokemon.name = pokeDetails.name;
    pokemon.number = pokeDetails.id;
    pokemon.types = types;
    pokemon.type = type;
    pokemon.image = pokeDetails.sprites.other.dream_world.front_default;

    return pokemon
}

pokeAPI.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApitoPokemon)
}

pokeAPI.getPokemons = function (offset = 0, limit = 12) {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeAPI.getPokemonDetails))
        .then((detailsRequest) => Promise.all(detailsRequest))
        .then((pokemonsDetails) => pokemonsDetails)
}