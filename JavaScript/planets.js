let currentPlanet = 3;




export async function fetchData() {
    let resp = await fetch('https://majazocom.github.io/Data/solaris.json');
    let data = await resp.json();
    return data;
}

export async function fetchPlanet(id) {
    let planets = await fetchData();
    let planet = planets.find((planet) => planet.id == id);
    return planet;
}

export async function renderPlanetData(id) {
    // Hides all planet data from UI before rendering new data
    let planetBlocksBefore = document.querySelectorAll('.fadeInDown');
    ('use strict');
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

    // Stagger animation of planet info on render
    let planetBlocks = document.querySelectorAll('.hidden');
    ('use strict');
    planetBlocks.forEach((block, id) => {
        setTimeout(() => {
            block.classList.remove('hidden');
            block.classList.add('fadeInDown');
        }, 150 * id);
    });
}


// Handles the color changes for each planet
export function handlePlanetColor(id) {
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

// window.onload = () => {
//     let currentPlanet = localStorage.getItem('planetID');
   

//     handlePlanetColor(currentPlanet);
// // '    if (currentPlanet === 1) {
// //         prevButton.style.display = 'none';
// //     } else if (currentPlanet === 8) {
// //         nextButton.style.display = 'none';
// //     }'
//     renderPlanetData(currentPlanet);
//     createNavEventListeners();
// };



export function createNavEventListeners () {
    let prevButton = document.querySelector('.pagination__back');
    let nextButton = document.querySelector('.pagination__next');

    // Handles the prev button
    prevButton.addEventListener('click', () => {
        window.scrollTo(0, 0);

        if (currentPlanet === 1) {
            prevButton.style.display = 'none';
        } else if (currentPlanet === 8) {
            nextButton.style.display = 'revert';
        }
    
        currentPlanet--;
        handlePlanetColor(currentPlanet);
        renderPlanetData(currentPlanet);
    });
    
    // Handles the next button
    nextButton.addEventListener('click', () => {
        window.scrollTo(0, 0);
            
        if (currentPlanet === 7) {
            nextButton.style.display = 'none';
        } else if (currentPlanet === 0) {
            prevButton.style.display = 'revert';
        }

        currentPlanet++;
        handlePlanetColor(currentPlanet);
        renderPlanetData(currentPlanet);
    });
}


