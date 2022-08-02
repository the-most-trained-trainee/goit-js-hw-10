import './css/styles.css';

import debounce from 'lodash.debounce'

const DEBOUNCE_DELAY = 900;

const countryInput = document.querySelector("#search-box");
const countryInfo = document.querySelector(".country-info");
const countryListDom = document.querySelector(".country-list");

countryInput.addEventListener("input", debounce(fetchCountries, DEBOUNCE_DELAY));

function fetchCountries(name) {
    let countryName = name.target.value.trim();
    let countryInfoReceived = fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`)
        .then((data) => data.json())
        .then((result) => createDesign(result))
}

function createDesign(countryList) {
    if (countryList.length === 1) {
        return makeCountryCard(countryList[0])
    } else if (countryList.length > 1 && countryList.length < 11) {
        return makeCountriesList(countryList)
    }

}

function makeCountryCard(country) {
    let singleCardContent = `
    <img src="${country.flags.svg}" alt="${country.name.official}" height="60px" width="100px"/>
    <h1>${country.name.official}</h1>
    <ul>
        <li>Capital: ${country.capital}</li>
        <li>Population: ${country.population}</li>
        <li>Languages: ${Object.values(country.languages).join(", ")}</li>
    </ul>`;
    countryInfo.innerHTML = singleCardContent;
    countryListDom.innerHTML = "";
}

function makeCountriesList(listmore) {
    let toInclude = ""
    listmore.forEach((country) => {
        toInclude = toInclude + `<li>
        <img src="${country.flags.svg}" alt="${country.name.official}" height="60px" width="100px"/>
        <h1>${country.name.official}</h1>
        </li>`
    })
    countryListDom.innerHTML = toInclude;
    countryInfo.innerHTML = "";
}