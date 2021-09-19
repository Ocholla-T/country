import axios from 'axios';

const state = {
  allCountries: [],
};

const getters = {
  getAllCountries: (state) => state.allCountries,
};

const actions = {
  commitAllCountries: ({ commit }, element) => {
    let country = {
      flag: element.flag,
      name: element.name,
      population: element.population,
      region: element.region,
      capital: element.capital,
    };

    commit('setAllCountries', country);
  },
  getCountries: async ({ dispatch }) => {
    let response = await axios.get('https://restcountries.eu/rest/v2/all');

    response.data.forEach((element) => {
      dispatch('commitAllCountries', element);
    });
  },
};

const mutations = {
  setAllCountries: (state, payload) => state.allCountries.push(payload),
};

export default { namespaced: true, state, getters, actions, mutations };
