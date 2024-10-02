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
            console.log(type); // TODO: Remove when this is working properly
            const destination = data[type];
            if (type === "countries") {
                destination.forEach(country => {
                    const countryName = country.name;
                    resultsDiv.innerHTML += `<h2>${countryName}</h2>`;
                    console.log(countryName);
                    country.cities.forEach(city => {
                        const cityName = city.name;
                        const imageUrl = city.imageUrl;
                        const description = city.description;
                        resultsDiv.innerHTML += `<h3>${cityName}</h3>`;
                        resultsDiv.innerHTML += `<img src="${imageUrl}" alt="Photo of ${cityName}">`
                        resultsDiv.innerHTML += `<p>${description}</p>`;
                        console.log(cityName);
                        console.log(description);
                    });
                });
            } else if (type) {
                destination.forEach(city => {
                    const cityName = city.name;
                    const imageUrl = city.imageUrl;
                    const description = city.description;
                    console.log(cityName);
                    console.log(description);
                });
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

