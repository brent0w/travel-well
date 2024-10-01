const searchBtn = document.getElementById('search-btn');
const clearBtn = document.getElementById('clear-btn');
const searchInput = document.getElementById('search-input');
const resultsDiv = document.getElementById('search-results');

function fetchDestinations() {
    resultsDiv.innerHTML = '';
    fetch('./travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const destination = filterData(data);
            console.log(destination);
            if (destination) {
                destination.forEach(element => {
                    const name = element.name;
                    const image = element.image;
                    const description = element.description;
                    console.log(name);
                });
            } else {
                resultsDiv.innerHTML = "No results found.";
            }
        })
    }

function filterData(data) {
    const query = searchInput.value.toLowerCase();
    if (query.search("countr") > -1) {
        return data.countries;
    } else if (query.search("temple") > -1) {
        return data.temples;
    } else if (query.search("beach") > -1) {
        return data.beaches;
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

