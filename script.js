document.addEventListener('DOMContentLoaded', () => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
        .then(response => response.json())
        .then(data => {
            const promises = data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()));
            return Promise.all(promises);
        })
        .then(pokemons => {
            displayPokemonCards(pokemons);
        })
        .catch(error => {
            console.error('Error fetching Pokémon data:', error);
        });
});

function displayPokemonCards(pokemons) {
    const contentDiv = document.getElementById('content');
    pokemons.forEach(pokemon => {
        const card = createCard(pokemon.name, pokemon.sprites.front_default, `Height: ${pokemon.height}, Weight: ${pokemon.weight}`);
        contentDiv.appendChild(card);
    });
}

function createCard(name, imageUrl, details) {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-md-4';

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';

    const cardImg = document.createElement('img');
    cardImg.className = 'card-img-top';
    cardImg.src = imageUrl;
    cardImg.alt = name;

    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.className = 'card-body';

    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = name;

    const cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.textContent = details;

    cardBodyDiv.appendChild(cardTitle);
    cardBodyDiv.appendChild(cardText);
    cardDiv.appendChild(cardImg);
    cardDiv.appendChild(cardBodyDiv);
    colDiv.appendChild(cardDiv);

    return colDiv;
}