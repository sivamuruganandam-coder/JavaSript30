const endpoint =
	"https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
// huge array
const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

const cities = [];

fetch(endpoint)
	.then((blob) => blob.json())
	.then((data) => cities.push(...data));
// fetch return promise

function findMatches(wordToMatch, cities) {
	return cities.filter((place) => {
		const regrex = new RegExp(wordToMatch, "gi"); //gi -global,insensitive
		return place.city.match(regrex) || place.state.match(regrex);
	});
}

function displayMatches() {
	const matchArray = findMatches(this.value, cities);
	const html = matchArray
		.map((place) => {
			const regrex = new RegExp(this.value, "gi");
			const cityName = place.city.replace(
				regrex,
				`<span class="hl">${this.value}</span>`
			);
			const stateName = place.state.replace(
				regrex,
				`<span class="hl">${this.value}</span>`
			);
			return `
        <li>
        <span class="name">${cityName},${stateName}</span>
        <span class="population">${place.population}</span>
        </li>
        `;
		})
		.join("");
	suggestions.innerHTML = html;
}

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
