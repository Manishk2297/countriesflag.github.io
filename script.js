
    document.addEventListener("DOMContentLoaded", () => {
      const countryGrid = document.querySelector(".country-grid");
      const detailsDialog = document.getElementById("details-dialog");
      const detailsContent = document.getElementById("details-content");
      const closeDialogButton = document.getElementById("close-dialog");
      const searchInput = document.querySelector(".search-input");
      const searchButton = document.querySelector(".search-button");
  
      let countriesData = []; // To store fetched country data
  
      // Fetch country data from an API (replace with the actual API URL)
      fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((data) => {
          countriesData = data; // Store fetched data for later use
          populateCountryGrid(data);
        })
        .catch((error) => console.error("Error fetching country data:", error));
  
      function populateCountryGrid(data) {
        countryGrid.innerHTML = ""; // Clear existing content
        data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        data.forEach((country) => {
          const countryCard = document.createElement("div");
          countryCard.className = "country-card";
  
          const countryFlag = document.createElement("img");
          countryFlag.className = "country-flag";
          countryFlag.src = country.flags.svg;
          countryFlag.alt = `${country.name.common} Flag`;
  
          const countryName = document.createElement("p");
          countryName.className = "country-name";
          countryName.textContent = country.name.common;
  
          countryCard.appendChild(countryFlag);
          countryCard.appendChild(countryName);
  
          countryCard.addEventListener("click", () => {
            const details = `
              <h2>${country.name.common}</h2>
              <img id="country-flag" class="country-flag" src="${country.flags.svg}" alt="${country.name.common} Flag">
              <p>Capital: ${country.capital}</p>
              <p id="country-continent">Continent: ${country.region}</p>
              <p>Population: ${country.population}</p>
              <p id="country-languages">Languages: ${country.languages ? Object.values(country.languages).join(", ") : 'N/A'}</p>
              <p>Timezones: ${country.timezones.join(", ")}</p>
            `;
  
            detailsContent.innerHTML = details;
            detailsDialog.style.display = "block";
          });
  
          countryGrid.appendChild(countryCard);
        });
      }
  
      // Close dialog
      closeDialogButton.addEventListener("click", () => {
        detailsDialog.style.display = "none";
      });
  
      // Search functionality
      searchButton.addEventListener("click", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredCountries = countriesData.filter((country) =>
          country.name.common.toLowerCase().includes(searchTerm)
        );
        populateCountryGrid(filteredCountries);
      });
    });