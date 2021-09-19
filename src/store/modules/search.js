import axios from 'axios';

const state = {
  countryModel: '',
};

const getters = {};

const actions = {
  searchCountry: async ({ state, dispatch, rootState }, event) => {
    if (event.keyCode === 13) {
      let name = state.countryModel;
      const response = await axios.get(`https://restcountries.eu/rest/v2/name/${name}`);

      rootState.allCountries.allCountries = [];

      response.data.forEach((element) => {
        dispatch('allCountries/commitAllCountries', element, { root: true });
      });
    }
  },
};

const mutations = {
  // update for v-model
  updateCountryModel: (state, payload) => {
    state.countryModel = payload;
  },
};

export default { namespaced: true, state, getters, actions, mutations };
