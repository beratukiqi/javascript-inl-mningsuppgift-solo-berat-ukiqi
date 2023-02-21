let currentPlanet = 3;

import { renderPlanetData } from './planets.js';

let planets = document.querySelectorAll('.planets li a');
planets.forEach((planet, id) => {
    // Send the id of the planet to the local storage when clicked
    planet.addEventListener('click', () => {
        currentPlanet = id + 1;
        localStorage.setItem('planetID', currentPlanet);
    });
});

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

        default:
            planet.style.boxShadow = '5rem 0rem 50rem 0px #7A91A740';
            planet.style.backgroundColor = '#7A91A7';
            break;
    }
}

window.onload = () => {
    // Gets the current planet from local storage and renders it
    currentPlanet = localStorage.getItem('planetID');
    handlePlanetColor(currentPlanet);
    if (currentPlanet === 1) {
        prevButton.style.display = 'none';
    } else if (currentPlanet === 8) {
        nextButton.style.display = 'none';
    }
    renderPlanetData(currentPlanet);
};

let prevButton = document.querySelector('.pagination__back');
let nextButton = document.querySelector('.pagination__next');

prevButton.addEventListener('click', () => {
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

nextButton.addEventListener('click', () => {
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

// {
//     id: 2,
//     type: 'planet',
//     name: 'Venus',
//     latinName: 'Venus',
//     rotation: 116,
//     circumference: 38025,
//     temp: {
//         day: 430,
//         night: -173
//     },
//     distance: 10820000,
//     orbitalPeriod: 225,
//     desc: 'Venus har ...',
//     moons: []
// }
