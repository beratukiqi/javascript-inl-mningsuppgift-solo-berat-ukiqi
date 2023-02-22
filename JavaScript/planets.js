export async function fetchData() {
    let resp = await fetch('https://majazocom.github.io/Data/solaris.json');

    let data = await resp.json();
    // console.log(data);
    return data;
}

export async function fetchPlanet(id) {
    let planets = await fetchData();
    let planet = planets.find((planet) => planet.id == id);
    // console.log(planet, 'planet from FetchPlanet');
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

