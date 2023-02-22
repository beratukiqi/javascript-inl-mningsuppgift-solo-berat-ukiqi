import { renderPlanetData, fetchData } from './planets.js';

let currentPlanet = 3;
let planets = document.querySelectorAll('.planets a');
let planetIconList = document.querySelectorAll('.planets li a i');
let planetLinks = document.querySelectorAll('.planets a');
let nextButton = document.querySelector('.pagination__next');
let prevButton = document.querySelector('.pagination__back');
let searchInput = document.querySelector('#search-input');
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
        }

    });
}

function handleSearchButton() {
    let searchButton = document.querySelector('#search-btn');
    searchButton.addEventListener('click', () => {
        let searchValue = searchInput.value;
        console.log(searchValue);
        generateSearchResults(searchValue)
    });
}

// Handle input to check if letters are included in planets name
async function generateSearchResults(value) {
    if (value.length >= 3) {
        let planetData = await getData();
        planetData.forEach((planet) => {
            if (planet.name.toUpperCase().includes(value.toUpperCase())) {
                console.log(planet);
            }
        });
    }  else {
        console.log('Please enter more than 2 letters');
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
function handleLocalStorate(list) {
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
    addPrevButtonListener()
    addNextButtonListener()
    renderPlanetData(currentPlanet);
    handleLocalStorate(planets);
};



addHoverEffect(planets);
handleKeyPress();
handleSearchButton()


// // // Clear input fields
clearButton.addEventListener('click', () => {
    console.log('clicked');
    let inputField = document.getElementById('search-input');
    inputField.value = '';
    clearButton.style.display = 'none';
});