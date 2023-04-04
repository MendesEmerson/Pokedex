const pokemonList = document.getElementById('pokemon_list_id');
const morePokemons = document.getElementById('button_morepokemons');
const limit = 12;
let offset = 0;


function loadMorePokemons(offset, limit) {
    pokeAPI.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map((pokemon) =>
            `<li class="pokemon ${pokemon.type}">
                <div class="header_pokemon">
                   <span class="nome">${pokemon.name}</span>
                   <span class="numero">#${pokemon.number}</span>
                </div>
    
                <div class="detalhes_pokemon">
                    <ol class="tipos_pokemon">
                    ${pokemon.types.map((type) => `<li class="${type} tipo_pokemon">${type}</li>`).join('')}
                    </ol>
                    <img class="img_pokemon"
                        src=${pokemon.image}
                        alt="${pokemon.name}">
    
                </div>
            </li>`
        ).join('');
    })
}

loadMorePokemons(offset, limit);

morePokemons.addEventListener('click', () => {
    offset += limit;
    loadMorePokemons(offset, limit)
})


