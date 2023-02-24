import { fetchData } from './data.js';

let currentPlanet = 3;
let planets = document.querySelectorAll('.planets a');
let planetIconList = document.querySelectorAll('.planets li a i');
let searchInput = document.querySelector('#search-input');
let resultsContainer = document.querySelector('.search__results');
let clearButton = document.querySelector('#clear-btn');
let planetTextList = document.querySelectorAll('.planets p');
let inputField = document.getElementById('search-input');
let errorMessage = document.querySelector('.error');
let notFoundMessage = document.querySelector('.not-found');

let charsToCheck =  []; // Lista med bokstäver som ska matchas mot planetnamnet (Vill enbart ha dom som matchar rätt indexposition)
let inputValue = 'ju'; // 'ju' matchar   -- 'piter' (matchar inte)
let planetName = 'jupiter'; 

// Skickar in alla bokstäver i inputvärden i en lista


console.log(charsToCheck);



async function getData () {
    const data = await fetchData();
    return data;
}

// Handles inputs and generates search results
async function generateSearchResults(value) {
    let match = false;
    let planetData = await getData();
    let notFoundMessage = document.querySelector('.not-found');
    let errorMessage = document.querySelector('.error');
    let noOfCharsMatched = 0;

    

    // Handles the input value
    if (value.length >= 3) {

        // Loop through the planet data and check if the input matches any planet names
        planetData.forEach((planet) => {

            // Generates planet results if there is a match
            if (planet.name.toUpperCase().includes(value.toUpperCase())) {

                // Creates a list of all the characters in the input value
                for (let i = 0; i < value.length; i++) {
                    charsToCheck.push(value[i].toUpperCase());
                }
                // Checks if all the characters in the input value match the corresponding index position in the planet name
                for (let i = 0; i < charsToCheck.length; i++) { 
                    if (charsToCheck[i] === planet.name[i].toUpperCase()) { 
                        noOfCharsMatched++;
                    }
                }

                // Render results only if all chars are in correct corresponding index position
                if (noOfCharsMatched === charsToCheck.length) {
                    resultsContainer.style.display = '';
                    renderSearchResults(planet)
                    match = true;
                } 

                // Reset the charsToCheck array
                charsToCheck = [];
            } 
        });

        // Display error message if no results are found
        if (!match) {
            errorMessage.style.display = 'none';
            notFoundMessage.style.display = '';
        }
    
    } else { // Display error message if input is less than 3 characters
        notFoundMessage.style.display = 'none';
        errorMessage.style.display = '';
    }
}

// Renders matched search results to the UI
function renderSearchResults(results) {
    let container = document.querySelector('.search__results');

    // Insert the search results into the container
    container.innerHTML = `
    <h3>${results.name}</h3>
    <p>Only ${results.distance} km away,<br/>you up for it?</p>    
    <a href="/planets.html">
        <button class="results__button">Let's go there<i class="fa-solid fa-rocket"></i></button>
    </a>`

    // Gets the generated elemets to add and handle event listeners
    let header = document.querySelector('.search__results h3');
    let text = document.querySelector('.search__results p');
    let button = document.querySelector('.search__results a');

    // Add click-listener to the button and send the id of the clicked planet to the local storage
    button.addEventListener('click', () => {
        localStorage.setItem('planetID', results.id);
    });
    
    // Hide the search result container when the user clicks outside of it
    window.addEventListener('click', (e) => {
        if (e.target !== container &&
            e.target !== header &&
            e.target !== text &&
            e.target !== searchInput) {
            resultsContainer.style.display = 'none';
        }
    });
   
}

// Adds click-listener and sends the id of the clicked planet to the local storage
planets.forEach((planet, id) => {
    planet.addEventListener('click', () => {
        currentPlanet = id + 1;
        localStorage.setItem('planetID', currentPlanet);
    });
});

// Fade in planet names on load
planetTextList.forEach((planet, id) => {
    setTimeout(() => {
        planet.classList.remove('hidden');
        planet.classList.add('fadeInDown');
    }, 100 * id);
});

// Generate search results when user clicks search button
let searchButton = document.querySelector('#search-btn');
searchButton.addEventListener('click', () => {
    errorMessage.style.display = 'none';
    notFoundMessage.style.display = 'none';
    generateSearchResults(searchInput.value)
    resultsContainer.classList.add('fadeInUp');
});

// Fade in rocket icon above planets on hover
planets.forEach((planet, id) => {
    planet.addEventListener('mouseover', () => {
        planetIconList[id].classList.remove('fadeOutUp');
        planetIconList[id].classList.remove('hidden');
        planetIconList[id].classList.add('fadeInDownIcon');
    });

    planet.addEventListener('mouseleave', () => {
        planetIconList[id].classList.remove('fadeInDownIcon');
        planetIconList[id].classList.add('fadeOutUp');
        planetIconList[id].classList.add('hidden');
    });
});

// Handles the search input field and generates search results
searchInput.addEventListener('keydown', (e) => {
    errorMessage.style.display = 'none';
    notFoundMessage.style.display = 'none';

    // Hide clear button if input is empty
    if (e.target.value.length <= 1 && (e.key === 'Backspace' || e.key === 'Delete')) {
        clearButton.style.display = 'none';
    } else {
        // display clear button
        clearButton.style.display = 'revert';
    }

    // Generate search results when user presses enter
    if (e.key === 'Enter') {

        generateSearchResults(searchInput.value) 
        resultsContainer.classList.add('fadeInUp');
    }
});

//  Clear input fields and hide search results
clearButton.addEventListener('click', () => {
    errorMessage.style.display = 'none';
    notFoundMessage.style.display = 'none';
    inputField.value = '';
    clearButton.style.display = 'none';
});


