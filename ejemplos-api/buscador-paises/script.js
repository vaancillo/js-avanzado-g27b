const searchInput = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")
const countryList = document.getElementById("country-list")

function searchCountries(country) {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
        countryList.innerHTML = ""
        data.forEach(country => {
            const countryDiv = document.createElement("div")
            countryDiv.className = "country"
            countryDiv.innerHTML = `
                <img src="${country.flags.svg}" alt="${country.name}" class="country-flag">
                <h3 class="country-name">${country.name}</h3>
                <p class="country-population">${country.population}</p>
                <p class="country-region">${country.region}</p>
                <p class="country-capital">${country.capital}</p>
            `
            countryList.appendChild(countryDiv)
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