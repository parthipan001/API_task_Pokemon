document.addEventListener('DOMContentLoaded', () => {
    const apis = [
        'https://api.coindesk.com/v1/bpi/currentprice.json',
        'https://dog.ceo/api/breeds/image/random',
        'https://api.chucknorris.io/jokes/random'
    ];

    Promise.all(apis.map(api => fetch(api).then(response => response.json())))
        .then(data => {
            displayData(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

function displayData(data) {
    const [bitcoinData, dogData, jokeData] = data;
    
    const contentDiv = document.getElementById('content');

    
    const bitcoinCard = createCard('Bitcoin Price', `USD: ${bitcoinData.bpi.USD.rate}`);
    contentDiv.appendChild(bitcoinCard);

    
    const dogCard = createCard('Random Dog', `<img src="${dogData.message}" alt="Dog" class="img-fluid">`);
    contentDiv.appendChild(dogCard);

    
    const jokeCard = createCard('Chuck Norris Joke', jokeData.value);
    contentDiv.appendChild(jokeCard);
}

function createCard(title, content) {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-md-4';

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';

    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.className = 'card-body';

    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = title;

    const cardContent = document.createElement('p');
    cardContent.className = 'card-text';
    cardContent.innerHTML = content;

    cardBodyDiv.appendChild(cardTitle);
    cardBodyDiv.appendChild(cardContent);
    cardDiv.appendChild(cardBodyDiv);
    colDiv.appendChild(cardDiv);

    return colDiv;
}