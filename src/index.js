import './css/styles.css';
import debounce from 'lodash.debounce'
import Notiflix from 'notiflix';
import { FetchApi } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const countryInput = document.querySelector("#search-box");
const countryInfo = document.querySelector(".country-info");
const countryListDom = document.querySelector(".country-list");

const sourceFetch = new FetchApi();

function createDesign(countryList) {
  if (countryList.length === 1) {
    return makeCountryCard(countryList[0])
  } else if (countryList.length > 1 && countryList.length < 11) {
    return makeCountriesList(countryList)
  } else if (countryList.length > 10) {
    Notiflix.Notify.info("Sorry, too much countries here");
  }
}

const debounceFetchCountries = debounce(
  (countryName) => {
    sourceFetch.fetchCountries(countryName, createDesign)
  },
  DEBOUNCE_DELAY
)

countryInput.addEventListener("input", (event) => {
  debounceFetchCountries(event.target.value.trim())
});

function makeCountryCard(country) {
  let singleCardContent = `
    <img src="${country.flags.svg}" alt="${country.name.common}" height="60px" width="100px"/>
    <h1>${country.name.common}</h1>
    <ul style="list-style: none; padding-left: 10px">
        <li><strong>Capital:</strong> ${country.capital}</li>
        <li><strong>Population:</strong> ${country.population}</li>
        <li><strong>Languages:</strong> ${Object.values(country.languages).join(", ")}</li>
    </ul>`;
  countryInfo.innerHTML = singleCardContent;
  countryListDom.innerHTML = "";
}

function makeCountriesList(listmore) {
  let toInclude = ""
  listmore.forEach((country) => {
    toInclude = toInclude + `<li style="padding: 3px; list-style: none">
        <h4 style="margin: 1px"><img src="${country.flags.svg}" alt="${country.name.common}" height="24px" width="40px" style="display: inline-block; margin-right: 10px;"/>${country.name.common}</h4>
        </li>`
  })
  countryListDom.innerHTML = toInclude;
  countryInfo.innerHTML = "";
}