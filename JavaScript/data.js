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