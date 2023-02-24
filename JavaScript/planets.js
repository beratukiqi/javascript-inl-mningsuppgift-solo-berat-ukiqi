import { fetchPlanet } from './data.js';

let currentPlanet = 1;
let nextButton = document.querySelector('.pagination__next');
let prevButton = document.querySelector('.pagination__back');
let planetTextList = document.querySelectorAll('.planets p');

async function renderPlanetData(id) {
    // Hides all planet data from UI before rendering new data
    let planetBlocksBefore = document.querySelectorAll('.fadeInDown');
    planetBlocksBefore.forEach((block) => {
        block.classList.remove('fadeInDown');
        block.classList.add('hidden');
    });

    // Render UI for each planet that is passed in
    let planetData = document.querySelector('.data__list');
    let planetHeader = document.querySelector('.planet__header');
    let planetDesc = document.querySelector('.planet__description');
    let planetMoons = document.querySelector('.moons');
    let planet = await fetchPlanet(id);


    let name = planet.name;
    let latinName = planet.latinName;
    let desc = planet.desc;
    let moons = planet.moons;

    let circ = planet.circumference;
    let dist = planet.distance;
    let day = planet.temp.day;
    let night = planet.temp.night;

    handlePlanetColor(id);

    // UI for planet header
    planetHeader.innerHTML = `
        <h1>${name}</h1>
        <h2>${latinName}</h2>
    `;

    // UI for planet description
    planetDesc.innerHTML = `
        <p>${desc}</p>
    `;

    // UI for planet data
    planetData.innerHTML = `
        <li>
            <h3>Omkrets</h3>
            <p>${circ}</p>    
        </li>
         <li>
            <h3>Km från solen</h3>
            <p>${dist}</p>    
        </li>
        <li>
            <h3>Max temperatur</h3>
            <p>${day}</p>    
        </li>
        <li>
            <h3>Min temperatur</h3>
            <p>${night}</p>    
        </li>`;

    // UI for planet moons
    planetMoons.innerHTML = `
    <h3>Månar</h3>
    <ul>
        ${moons
            .map((moon) => {
                return `<li>${moon}</li>`;
            })
            .join('')}
    </ul>`;

    // Stagger planet animation on render
    let planetBlocks = document.querySelectorAll('.hidden');
    ('use strict');
    planetBlocks.forEach((block, id) => {
        setTimeout(() => {
            block.classList.remove('hidden');
            block.classList.add('fadeInDown');
        }, 150 * id);
    });
}

function handlePlanetColor(id) {
    let planet = document.querySelector('.planet');
    console.log(parseInt(id));
    switch (parseInt(id)) {
        case 0:
            planet.style.boxShadow = '5rem 0rem 50rem 0px #F9C80E40';
            planet.style.backgroundColor = '#F9C80E';
            console.log('case 0');
            break;

        case 1:
            planet.style.boxShadow = '5rem 0rem 50rem 0px #88888840';
            planet.style.backgroundColor = '#888888';
            console.log('case 1');
            break;

        case 2:
            planet.style.boxShadow = '5rem 0rem 50rem 0px #E7CDCD40';
            planet.style.backgroundColor = '#E7CDCD';
            console.log('case 2');
            break;

        case 3:
            planet.style.boxShadow = '5rem 0rem 50rem 0px #428ED440';
            planet.style.backgroundColor = '#428ED4';
            console.log('case 3')
            break;

        case 4:
            planet.style.boxShadow = '5rem 0rem 50rem 0px #EF5F5F40';
            planet.style.backgroundColor = '#EF5F5F';
            console.log('case 4')
            break;

        case 5:
            planet.style.boxShadow = '5rem 0rem 50rem 0px #E2946840';
            planet.style.backgroundColor = '#E29468';
            console.log('case 5')
            break;

        case 6:
            planet.style.boxShadow = '5rem 0rem 50rem 0px #C7AA7240';
            planet.style.backgroundColor = '#C7AA72';
            console.log('case 6')
            break;

        case 7:
            planet.style.boxShadow = '5rem 0rem 50rem 0px #C9D4F140';
            planet.style.backgroundColor = '#C9D4F1';
            console.log('case 7')
            break;
        case 8:
            planet.style.boxShadow = '5rem 0rem 50rem 0px #7A91A740';
            planet.style.backgroundColor = '#7A91A7';
            console.log('case 8')
            break;

    }
}


planetTextList.forEach((planet, id) => {
    setTimeout(() => {
        planet.classList.remove('hidden');
        planet.classList.add('fadeInDown');
    }, 120 * id);
});

prevButton.addEventListener('click', () => {
    window.scrollTo(0, 0);
    // Handles the button displays
    if (currentPlanet === 8) {
        nextButton.style.display = 'revert';
    } else if (currentPlanet === 2) {
        prevButton.style.display = 'none';
    }

    currentPlanet--;
    handlePlanetColor(currentPlanet);
    renderPlanetData(currentPlanet);
});

nextButton.addEventListener('click', () => {
        window.scrollTo(0, 0);
        // Handles the button displays
        if (currentPlanet === 1) {
            prevButton.style.display = 'revert';
        } else if (currentPlanet === 7) {
            nextButton.style.display = 'none';
        }
        
        currentPlanet++;
        handlePlanetColor(currentPlanet);
        renderPlanetData(currentPlanet);
    });

currentPlanet = parseInt(localStorage.getItem('planetID'));
renderPlanetData(currentPlanet);

// Removes buttons if user starts at end of list
if (currentPlanet === 1) {
    prevButton.style.display = 'none';
} else if (currentPlanet === 8) {
    nextButton.style.display = 'none';
}
