import { renderPlanetData, handlePlanetColor, createNavEventListeners } from './planets.js';

let currentPlanet = 3;
let planetIconList = document.querySelectorAll('.planets li a i');
let planetLinks = document.querySelectorAll('.planets a');
let clearButton = document.querySelector('#clear-btn');

window.onload = () => {
    currentPlanet = localStorage.getItem('planetID');
    if (currentPlanet == null) {
        currentPlanet = 3;
    }
    // Stagger planet animation on load
    
    handlePlanetColor(currentPlanet);
    renderPlanetData(currentPlanet);
    createNavEventListeners();
    planetLinks.forEach((planet) => {
        console.log(planet, 'planet');
    });
};

// Adds all event listeners to each planet
planetLinks.forEach((planet, id) => {
    console.log(planet, 'planet');
    planet.addEventListener('click', () => {
        currentPlanet = id + 1;
        localStorage.setItem('planetID', currentPlanet);
    });

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

let planetTextList = document.querySelectorAll('.planets p');
planetTextList.forEach((planet, id) => {
    setTimeout(() => {
        planet.classList.remove('hidden');
        planet.classList.add('fadeInDown');
    }, 120 * id);
});


// Clear input fields
clearButton.addEventListener('click', () => {
    console.log('clicked');
    let inputField = document.getElementById('search-input');
    inputField.value = '';
    clearButton.style.display = 'none';
});

// Handles the search input
let searchInput = document.getElementById('search-input');
searchInput.addEventListener('keypress', () => {
    clearButton.style.display = '';
});



