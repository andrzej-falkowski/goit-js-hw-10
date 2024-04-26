'use strict';

import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';

const catInfo = document.querySelector('.cat-info');
const breedSelect = document.querySelector('.breed-select');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

fetchBreeds()
  .then(data => {
    const markup = data.map(breed => {
      loaderEl.classList.add('is-hidden');
      breedSelect.hidden = false;
      return `<option value="${breed.id}">${breed.name}</option>`;
    });
    breedSelect.insertAdjacentHTML('beforeend', markup);
    new SlimSelect({
      select: breedSelect,
      settings: {
        placeholderText: 'Search for a cat',
      },
    });
  })
  .catch(error => {
    loaderEl.classList.add('is-hidden');
    errorEl.classList.remove('is-hidden');
    console.log(error);
  });

breedSelect.addEventListener('change', event => {
  const breedId = event.target.value;
  catInfo.classList.add('is-hidden');
  loaderEl.classList.remove('is-hidden');
  fetchCatByBreed(breedId)
    .then(data => {
      createCatDesc(data);
    })
    .catch(error => {
      loaderEl.classList.add('is-hidden');
      errorEl.classList.remove('is-hidden');
      console.log(error);
    });
});

function createCatDesc(data) {
  const { url, breeds } = data[0];
  const catDesc = `<div class="img-wrapper">
  <img src="${url}" alt="cat" />
  </div>
  <div class="desc-wrapper">
  <h2>${breeds[0].name}</h2> 
  <p>${breeds[0].description}</p> 
  <p class="temperament"><span class="highlighted">Temperament: </span>${breeds[0].temperament}</p>
  </div>`;
  catInfo.innerHTML = catDesc;
  loaderEl.classList.add('is-hidden');
  catInfo.classList.remove('is-hidden');
}
