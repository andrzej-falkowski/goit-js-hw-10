'use strict';

import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_ADeftq3pSOEFTfTxTxFYj9MDoMSRaVw59G3MadcX3ISD8iXSTfJb5s325LeyWCAV';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(function (response) {
      if (Error.responce) {
        throw new Error('Oops! Something went wrong! Try reloading the page!');
      }
      return response.data;
    })
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(function (response) {
      if (Error.response) {
        throw new Error('Oops! Something went wrong! Try reloading the page!');
      }
      return response.data;
    });
}