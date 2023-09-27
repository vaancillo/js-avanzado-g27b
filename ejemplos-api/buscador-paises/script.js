const searchInput = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")
const countryList = document.getElementById("country-list")

const searchCountries = async (country) => {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
        countryList.innerHTML = ''
        data.forEach(country => {
            const countryCard = document.createElement("div")
            countryCard.classList.add('country-card')
            const currencies = Object.keys(country.currencies)
            const name_currencies = currencies.map(key => country.currencies[key].name).join()
            const symbol_currencies = currencies.map(key => country.currencies[key].symbol).join()
            const languages = Object.values(country.languages)
            const list_languages = languages.map(language => `<p>${language}</p>`).join()
            console.log(languages)
            countryCard.className = "country"
            countryCard.innerHTML = `
            <img src="${country.flags.png}" alt="${country.name}" class="${country.flags.alt}">
            <h3 class="flex align-center country-name ">${country.name.common}</h3>
            <h3 class="flex align-center country-name">${country.name.official}</h3>
            <p class="country-capital">Capital: ${country.capital}</p>
            <p class="country-region">Región: ${country.region}</p>
            <p class="country-currencies">Subregión:Currencies: ${name_currencies}, ${symbol_currencies}</p>
            <p class="country-languages">Languages: ${languages}</p>
            <p class="country-population">Poblacion: ${country.population}</p>
            `
            countryList.appendChild(countryCard)
        })
    })
    .catch(error => {
        countryList.innerHTML = "<p>Sorry, we couldn't find any country with that name :(</p>"
    })

}

searchButton.addEventListener('click', () => {
  const countryText = searchInput.value.trim()
  
  if(countryText.length > 2) {
    searchCountries(countryText)
  } else {
    countryList.innerHTML = '<p>Enter at least 3 characters to search</p>'
  }
})