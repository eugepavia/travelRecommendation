let locations = [];
const searchButton = document.getElementById('searchButton');
const resetButton = document.getElementById('resetButton');

function searchLocation() {
    const input = document.getElementById('destinationInput').value.toLowerCase();
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = ''; // Reset search

    // key words
    const keywordCountry = ['country','countries'];
    const keywordTemple = ['temple','temples'];
    const keywordBeach = ['beach','beaches'];

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then (data => {
            if (keywordCountry.find(item => item.toLocaleLowerCase() === input)) {
                data.countries.forEach(element => {
                    element.cities.forEach(city => createCard(city,resultsDiv));
                });
            } else if (keywordTemple.find(item => item.toLocaleLowerCase() === input)) {
                // code temple
            } else if (keywordBeach.find(item => item.toLocaleLowerCase() === input)) {
                // code beac
            } else {
                resultsDiv.innerHTML = 'Destination not found :(';
            }
        })
        .catch(error => {
            console.log('Error: ', error);
            resultsDiv.innerHTML = 'Ups! An error has occured';
        });

}

// To create search result cards
function createCard(element,div) {
    console.log('entered createCard');
    // Retreive info
    const name = element.name;
    const img = element.imageUrl;
    const description = element.description;

    // Create containers and elements
    const resultCard = document.createElement('div');
    resultCard.classList.add('resultCard'); // card containter (img and content)
    const resultImg = document.createElement('img');
    resultImg.src = img; // card image
    const resultContent = document.createElement('div');
    resultContent.classList.add('resultContent'); // content containter (h3 and p)

    // Fill elements
    resultContent.innerHTML = `<h3>${name}</h3> <p>${description}</p>`
    resultCard.appendChild(resultImg);
    resultCard.appendChild(resultContent);

    // Show cards on Search Results div
    div.appendChild(resultCard);

    return;
}

searchButton.addEventListener('click',searchLocation);