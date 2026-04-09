const searchButton = document.getElementById('searchButton');
const resetButton = document.getElementById('resetButton');
const resultsDiv = document.getElementById('searchResults');
const introductionDiv = document.getElementById('introduction');
const restultsContainer = document.getElementById('results');

const timeZones = [['Sydney','Australia/Queensland'],['Melbourne','Australia/Queensland'],
                ['Tokyo','Japan'],['Kyoto','Japan'],
                ['Rio de Janeiro','Brazil/East'],['São Paulo','Brazil/East'],
                ['Angkor Wat','Asia/Bangkok'],['Taj Mahal','Asia/Kolkata'],
                ['Bora Bora','Pacific/Tahiti'],['Copacabana Beach','Brazil/East'],];


function searchLocation() {
    const input = document.getElementById('destinationInput').value.toLowerCase();

    resultsDiv.innerHTML = ''; // Reset search
    restultsContainer.hidden = false; // Show results div containter
    introductionDiv.setAttribute('hidden',true); // Hide introduction div

    // key words
    const keywordCountry = ['country','countries'];
    const keywordTemple = ['temple','temples'];
    const keywordBeach = ['beach','beaches'];

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then (data => {
            if (keywordCountry.find(item => item.toLocaleLowerCase() === input)) {
                data.countries.forEach(element => {
                    element.cities.forEach(city => createCard(city));
                });
            } else if (keywordTemple.find(item => item.toLocaleLowerCase() === input)) {
                data.temples.forEach(temple => createCard(temple));
            } else if (keywordBeach.find(item => item.toLocaleLowerCase() === input)) {
                data.beaches.forEach(beach => createCard(beach));
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
// Receives an element from the JSON and the div where it will be displayed
function createCard(element) {
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
    resultContent.innerHTML = `<h3>${name}</h3> <p>${description}</p> <p>Current time: ${displayTime(element.name)}</p>`
    resultCard.appendChild(resultImg);
    resultCard.appendChild(resultContent);

    // Add cards on Search Results div
    resultsDiv.appendChild(resultCard);

    return;
}

function resetSearch() {
    resultsDiv.innerHTML = ''; // Reset search
    restultsContainer.hidden = true; // Hide results div containter
    introductionDiv.hidden = false; // Hide introduction div
    return;
}

// To display current time at result cards
function displayTime(location) {
    const locationEdit = location.split(','); // cut only place name
    let time = ''

    // Check for match in timeZones array
    for (i = 0; i < timeZones.length; i++) {
        if (timeZones[i][0] == locationEdit[0]) {
            time = timeZones[i][1];
        }
    };

    if (time !== '') {
        const options = {timeZone:time, hour12:true};
        return new Date().toLocaleTimeString('en-US',options);
    } else {
        return 'Not available';
    }
}


searchButton.addEventListener('click',searchLocation);
resetButton.addEventListener('click',resetSearch);