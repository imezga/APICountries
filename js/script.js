const countryList = document.querySelector('.country-list');
const input = document.getElementById('country-input');
const modeButton = document.querySelector('.mode-button');
const header = document.querySelector('header');
const select = document.querySelector('select');
const moon = document.getElementById('moon');
const countryDetails = document.getElementById('country-details');
const main = document.querySelector('main');
const inputCountry = document.querySelector('input');

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://restcountries.com/v3.1/all')
    .then((response) => response.json())
    .then((response) => listCountries(response))
    .catch((error) => console.log(error));
});

input.addEventListener('input', (e) => {
  const value = e.target.value;
  select.value = 'Filter by Region';

  fetch(`https://restcountries.com/v3.1/name/${value}`)
    .then((response) => response.json())
    .then((response) => listCountries(response))
    .catch((error) => console.log(error));
});

modeButton.addEventListener('click', () => {
  if (document.body.className === 'light-bg') {
    document.body.className = 'dark-bg dark-text';
    moon.className = 'fa-solid fa-moon';
    header.className = 'dark';
    main.className = 'dark-bg';
    document.querySelectorAll('.country').forEach((e) => {
      e.className = 'country dark';
    });
    select.className = 'dark dark-text';
    inputCountry.className = 'dark dark-text';
    countryDetails.className = 'dark dark-text';
  } else {
    document.body.className = 'light-bg';
    moon.className = 'fa-solid fa-moon';
    header.className = 'light';
    main.className = 'light-bg';
    document.querySelectorAll('.country').forEach((e) => {
      e.className = 'country light';
    });
    select.className = 'light light-text';
    inputCountry.className = 'light light-text';
    countryDetails.className = 'light light-text';
  }
});

select.addEventListener('change', (e) => {
  const value = e.target.value;

  fetch(`https://restcountries.com/v3.1/region/${value}`)
    .then((response) => response.json())
    .then((response) => listCountries(response))
    .catch((error) => console.log(error));
});

const listCountries = (response) => {
  let countries = '';
  response.map((country) => {
    const { name, population, region, capital, flags } = country;
    countries += `
      <div class="country" data-name=${name.common}>
        <img src=${flags.svg} alt=${name.common}>
        <div class="content">
          <h2>${name.common}</h2>

          <div class="parags">
            <p><span>Population: </span>${population}</p>
            <p><span>Region: </span>${region}</p>
            <p><span>Capital: </span>${capital}</p>
          </div>
        </div>
      </div>
      `;
  });
  countryList.innerHTML = countries;
  const allListedCountries = document.querySelectorAll('.country');
  allListedCountries.forEach((e) => {
    if (document.body.className === 'light-bg') {
      e.className = 'country light';
    } else {
      e.className = 'country dark';
    }
    e.addEventListener('click', (e) => {
      const value = e.target.parentElement.dataset.name;

      fetch(`https://restcountries.com/v3.1/name/${value}`)
        .then((response) => response.json())
        .then((response) => getSelectedInfo(response))
        .catch((error) => console.log(error));
    });
  });
};

const getSelectedInfo = (response) => {
  const { name, population, region, capital, flags, subregion, tld } = response[0];

  countryDetails.innerHTML = `
  <div class="button-wrapper">
          <button class="light" id="back">
            Back
            <i class="fa-solid fa-arrow-left-long"></i>
          </button>
        </div>
  <div class="wrap">
  <img class='details-flag' src=${flags.svg} alt=${name.common} />
  <div class="details-content">
    <h2>${name.common}</h2>
    <div class="parags-wrapper">
      <div class="details-parags">
        <p><span>Native Name: </span>${name.nativeName.common}</p>
        <p><span>Population: </span>${population}</p>
        <p><span>Region: </span>${region}</p>
        
      </div>
      <div class="details-parags">
        <p><span>Capital: </span>${capital}</p>
        <p><span>Sub Region: </span>${subregion}</p>
        <p><span>Top Level Domain: </span>${tld}</p>
      </div>
    </div>
    </div>
  </div>
  `;
  const backButton = document.getElementById('back');
  backButton.addEventListener('click', () => {
    countryDetails.style.display = 'none';
    countryDetails.innerHTML = '';
    document.body.style.overflow = 'auto';
  });
  countryDetails.style.display = 'block';
  document.body.style.overflow = 'hidden';
};
