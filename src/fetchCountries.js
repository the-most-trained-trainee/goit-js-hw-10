import Notiflix from 'notiflix';

class FetchApi {
  fetchCountries = (countryName, createDesign) => {
    if (countryName !== "") {
      fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`)
        .then((data) => {
          if (data.status === 404) {
            Notiflix.Notify.failure("Oops, there is no country with that name")
          } else {
            return data.json()
          }
        })
        .then((result) => createDesign(result))
        .catch((error) => console.log(error))
    }
  }
}

export { FetchApi }