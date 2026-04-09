let locations = [];
const searchButton = document.getElementById('searchButton');
const resetButton = document.getElementById('resetButton');

function searchLocation() {
    const input = document.getElementById('destinationInput').value.toLowerCase();
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = ''; // Reset search

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        // .then(data => {
            //const filter = data.find(item => item.name.toLowerCase() === input);
            // data.forEach(item => )
            // if (filter) {
            //     console.log(filter);
            // } else {
            //     resultsDiv.innerHTML = 'Destination not found :(';
            // }
        // })
        .catch(error => {
            console.log('Error: ', error);
            resultsDiv.innerHTML = 'Ups! An error has occured';
        });

}

// cada uno es un resultCard, que incluye una img y un resultContent con h3 y p

searchButton.addEventListener('click',searchLocation);