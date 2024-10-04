const searchBtn = document.getElementById('search-btn');
const clearBtn = document.getElementById('clear-btn');
const searchInput = document.getElementById('search-input');
const resultsDiv = document.getElementById('search-results');

function fetchDestinations() {
    resultsDiv.innerHTML = '';
    fetch('./travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const query = searchInput.value.toLowerCase();
            const type = matchSearch(query);
            const destinations = data[type];
            if (destinations) {
                resultsDiv.innerHTML += '<h2>How about a trip to...</h2>'
                for (const destination of destinations) {
                    const name = destination.name;
                    resultsDiv.innerHTML += `<h3>${name}</h3>`;
                    if (destination.imageUrl && destination.description) {
                        displayDestinations(name, destination.imageUrl, destination.description);
                    } else if (destination.cities) {
                        for (const city of destination.cities) {
                            const name = city.name;
                            resultsDiv.innerHTML += `<h4>${name}</h4>`;
                            displayDestinations(name, city.imageUrl, city.description);
                        }
                    }
                }
                } else {
                    resultsDiv.innerHTML = `<p>No results found for "${query}", but we know there is destination for you! \
                    <br> How about searching for beaches, temples, or countries?</p>`;
                }
            })
        }

function matchSearch(query) {
    if (query.search("countr") > -1) {
        return "countries";
    } else if (query.search("temple") > -1) {
        return "temples";
    } else if (query.search("beach") > -1) {
        return "beaches";
    } else {
        return false;
    }
}

function displayDestinations(name, imageUrl, description) {
    resultsDiv.innerHTML += `<img src="${imageUrl}" alt="Photo of ${name}">`;
    resultsDiv.innerHTML += `<p>${description}</p>`;
}

function clearSearch() {
    searchInput.value = '';
    resultsDiv.innerHTML = '';
}

// Add event listeners
searchBtn.addEventListener('click', fetchDestinations);
clearBtn.addEventListener('click', clearSearch);
searchInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        fetchDestinations();
    }
});

