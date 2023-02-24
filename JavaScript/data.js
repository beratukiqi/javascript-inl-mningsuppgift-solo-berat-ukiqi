export async function fetchData() {
    try {
        let resp = await fetch('https://majazocom.github.io/Data/solaris.json');
        let data = await resp.json();
        return data;
    } catch (error) {
        console.error("My friend, you have encountered an error. Error message: ", error);
    }
}

export async function fetchPlanet(id) {
    let planets = await fetchData();
    let planet = planets.find((planet) => planet.id == id);
    // console.log(planet, 'planet from FetchPlanet');
    return planet;
}