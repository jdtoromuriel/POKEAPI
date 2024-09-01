async function obtenerPokemon(nombre) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);
        
        if (!response.ok) {
            throw new Error('Pokémon no encontrado');
        }
        
        const pokemon = await response.json();

        const container = document.getElementById("pokemon-container");
        const habilidades = pokemon.abilities.map(
            abilityInfo => `<span>🌀 ${abilityInfo.ability.name}</span>`
        ).join(' ');

        const pokemonCard = `
            <h1>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p><strong>Tipos:</strong> ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
            <p class="ability"><strong>Habilidades:</strong> ${habilidades}</p>
            <p><strong>Estadísticas:</strong></p>
            <ul>    
                ${pokemon.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('').toUpperCase()}
            </ul>
        `;

        container.innerHTML = pokemonCard;
    } catch (error) {
        document.getElementById("pokemon-container").innerHTML = `<p>${error.message}</p>`;
    }
}

function buscarPokemon() {
    const nombre = document.getElementById("search-input").value.trim();
    if (nombre.length > 0) {
        obtenerPokemon(nombre);
    } else {
        document.getElementById("pokemon-container").innerHTML = '';
    }
}