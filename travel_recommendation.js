const searchBtn = document.getElementById('search-btn');
const clearBtn = document.getElementById('clear-btn');
const searchInput = document.getElementById('search-input');
const resultsDiv = document.getElementById('search-results');

document.createElement('h2').innerText = "Header";

function fetchDestinations() {
    resultsDiv.innerHTML = '';
    fetch('./travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const query = searchInput.value;
            const type = matchSearch(query.toLowerCase());
            const destinations = data[type];
            if (destinations) {
                displayResults(destinations, 2);
            } else {
                resultsDiv.innerHTML = `<p>No results found for "<span id='search-term'></span>"
                                        <br> We know there is destination for you! How about searching for beaches, temples, or countries?</p>`;
                document.getElementById('search-term').innerText = query;
            }
        })
}

function displayResults(data, headerLevel) {
    // for each item in data
    let destinationDiv = '<p>How about a trip to...</p>';
    listDestinations(data, headerLevel);
    resultsDiv.innerHTML += destinationDiv;

    function listDestinations(data, headerLevel) {
        for (const item of data) {;
            const name = item.name;
            const imageUrl = item.imageUrl;
            const desc = item.description;
            const cities = item.cities;
            cities ? destinationDiv += '<div class = "region">' : destinationDiv += '<div class = "city">';
            destinationDiv += `<h${headerLevel}>${name}</h${headerLevel}>`;
            if (imageUrl) {
                destinationDiv += `<img src="${imageUrl}" alt="Photo of ${name}">`;
            }
            if (desc) {
                destinationDiv += `<p>${desc}</p>`;
            }
            if (cities) {
                const newHeaderLevel = headerLevel + 1;
                listDestinations(item.cities, newHeaderLevel);
            }
            destinationDiv += '</div>';
        }
    }
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

