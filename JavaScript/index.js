import { renderPlanetData, fetchData } from './planets.js';

let currentPlanet = 3;
let planets = document.querySelectorAll('.planets a');
let planetIconList = document.querySelectorAll('.planets li a i');
let planetLinks = document.querySelectorAll('.planets a');
let nextButton = document.querySelector('.pagination__next');
let prevButton = document.querySelector('.pagination__back');
let searchInput = document.querySelector('#search-input');
let resultsContainer = document.querySelector('.search__results');
let clearButton = document.querySelector('#clear-btn');

async function getData () {
    const data = await fetchData();
    return data;
}

function handleKeyPress () {
    searchInput.addEventListener('keypress', (e) => {
        if (searchInput.value === "") {
            clearButton.style.display = 'none';
        }
        // Clear input field when user deletes all letters
        if (e.target.value.length === -1) {
            clearButton.style.display = 'none';
        } else if (e.target.value.length >= 0) {
            // display clear button
            clearButton.style.display = 'revert';
        }

        if (e.key === 'Enter') {
            let searchValue = searchInput.value;
            console.log(searchValue);
            generateSearchResults(searchValue)
            resultsContainer.classList.add('fadeInUp');
        }

    });
}

function handleSearchButton() {
    let searchButton = document.querySelector('#search-btn');
    searchButton.addEventListener('click', () => {
        let searchValue = searchInput.value;
        console.log(searchValue);
        generateSearchResults(searchValue)
        resultsContainer.classList.add('fadeInUp');
    });
}

// Handle input to check if letters are included in planets name
async function generateSearchResults(value) {
    let match = false;
    let planetData = await getData();
    let results = [];
    let notFoundMessage = document.querySelector('.not-found');
    let errorMessage = document.querySelector('.error');

    // Checks minimun length of input
    if (value.length >= 3) {
        planetData.forEach((planet) => {
            if (planet.name.toUpperCase().includes(value.toUpperCase())) {
                results.push(planet);
                console.log(planet);
                resultsContainer.style.display = '';
                renderSearchResults(planet)
                match = true;
                notFoundMessage.style.display = 'none';
                errorMessage.style.display = 'none';
            } 
        });
        if (!match) {
            errorMessage.style.display = 'none';
            notFoundMessage.style.display = '';
        }
    } else {
        notFoundMessage.style.display = 'none';
        errorMessage.style.display = '';
    }
}
        

function addHoverEffect(list) {
    list.forEach((planet, id) => {
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
}

// Send the id of the planet to the local storage when clicked
function handleLocalStorage(list) {
    list.forEach((planet, id) => {
        planet.addEventListener('click', () => {
            currentPlanet = id + 1;
            localStorage.setItem('planetID', currentPlanet);
        });
    });
}

// Handles the color changes for each planet
function handlePlanetColor(id) {
    let planet = document.querySelector(`.planet`);

    switch (id) {
        case 0:
            planet.style.boxShadow = '5rem 0rem 50rem 0px #F9C80E40';
            planet.style.backgroundColor = '#F9C80E';
            break;

        case 1:
            planet.style.boxShadow = '5rem 0rem 50rem 0px #88888840';
            planet.style.backgroundColor = '#888888';
            break;

        case 2:
            planet.style.boxShadow = '5rem 0rem 50rem 0px #E7CDCD40';
            planet.style.backgroundColor = '#E7CDCD';
            break;

        case 3:
            planet.style.boxShadow = '5rem 0rem 50rem 0px #428ED440';
            planet.style.backgroundColor = '#428ED4';
            break;

        case 4:
            planet.style.boxShadow = '5rem 0rem 50rem 0px #EF5F5F40';
            planet.style.backgroundColor = '#EF5F5F';
            break;

        case 5:
            planet.style.boxShadow = '5rem 0rem 50rem 0px #E2946840';
            planet.style.backgroundColor = '#E29468';
            break;

        case 6:
            planet.style.boxShadow = '5rem 0rem 50rem 0px #C7AA7240';
            planet.style.backgroundColor = '#C7AA72';
            break;

        case 7:
            planet.style.boxShadow = '5rem 0rem 50rem 0px #C9D4F140';
            planet.style.backgroundColor = '#C9D4F1';
            break;
        case 8:
            planet.style.boxShadow = '5rem 0rem 50rem 0px #7A91A740';
            planet.style.backgroundColor = '#7A91A7';
            break;

    }
}

function addPrevButtonListener() {

    prevButton.addEventListener('click', () => {
        window.scrollTo(0, 0);
        // Handles the button displays
        console.log(currentPlanet, 'pre click');
        if (currentPlanet === 1) {
            prevButton.style.display = 'none';
        } else if (currentPlanet === 8) {
            nextButton.style.display = 'revert';
        }

        currentPlanet--;
        console.log(currentPlanet, 'post click');

        handlePlanetColor(currentPlanet);
        renderPlanetData(currentPlanet);
    });
}

function addNextButtonListener() {
    nextButton.addEventListener('click', () => {
        window.scrollTo(0, 0);
        // Handles the button displays
        console.log(currentPlanet, 'pre click');
        
        if (currentPlanet === 7) {
            nextButton.style.display = 'none';
        } else if (currentPlanet === 0) {
            prevButton.style.display = 'revert';
        }
        currentPlanet++;
        console.log(currentPlanet, 'post click');

        handlePlanetColor(currentPlanet);
        renderPlanetData(currentPlanet);
    });
};


// Gets the current planet from local storage and renders it on load
window.onload = () => {
    currentPlanet = localStorage.getItem('planetID');
    // Stagger planet animation on load
    let planetTextList = document.querySelectorAll('.planets p');
    ('use strict');
    planetTextList.forEach((planet, id) => {
        setTimeout(() => {
            planet.classList.remove('hidden');
            planet.classList.add('fadeInDown');
        }, 120 * id);
    });

    // handlePlanetColor(currentPlanet);
    // if (currentPlanet === 1) {
    //     prevButton.style.display = 'none';
    // } else if (currentPlanet === 8) {
    //     nextButton.style.display = 'none';
    // }
    handleLocalStorage(planets);
    addPrevButtonListener()
    addNextButtonListener()
    renderPlanetData(currentPlanet);
};

function renderSearchResults(results) {
    let container = document.querySelector('.search__results');
    let errorMessage = document.querySelector('.error');
    let notFoundMessage = document.querySelector('.not-found');
   

    // Display error message if no results are found
    if (results.length > 2) {
        errorMessage.style.display = '';
        console.log(results.length, 'results length worked');
    } else if (!results.name) {
        notFoundMessage.style.display = '';
        console.log(results.name, 'results name worked');
    } else {

        container.innerHTML = `
        <h3>${results.name}</h3>
        <p>Only ${results.distance} km away,<br/>you up for it?</p>    
        <a href="/planets.html">
            <button class="results__button">Let's go there<i class="fa-solid fa-rocket"></i></button>
        </a>`

        
    
    }

    // Gets the elements if they exist / after they are created
    let button = document.querySelector('.results__button');
    let header = document.querySelector('.search__results h3');
    let text = document.querySelector('.search__results p');
    let CTALink = document.querySelector('.search__results a');
    CTALink.addEventListener('click', () => {
        localStorage.setItem('planetID', results.id);
    });
    
    // Hide the search result container when the user clicks outside of it
    window.addEventListener('click', (e) => {
        if (e.target !== container &&
            e.target !== header &&
            e.target !== text &&
            e.target !== button &&
            e.target !== searchInput) {
            resultsContainer.style.display = 'none';
        }
    });
   
}

addHoverEffect(planets);
handleKeyPress();
handleSearchButton()


// // // Clear input fields
clearButton.addEventListener('click', () => {
    let errorMessage = document.querySelector('.error');
    let notFoundMessage = document.querySelector('.not-found');
    errorMessage.style.display = 'none';
    notFoundMessage.style.display = 'none';

    let inputField = document.getElementById('search-input');
    inputField.value = '';
    resultsContainer.style.display = 'none';
    clearButton.style.display = 'none';
});