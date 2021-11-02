import axios from 'axios';

const state = {
  allCountries: [],
};

const getters = {
  getAllCountries: (state) => state.allCountries,
};

const actions = {
  commitAllCountries: ({ commit }, element) => {
    let capital;
    Array.isArray(element.capital) ? (capital = element.capital.shift()) : null;

    let country = {
      flag: element.flags.svg,
      name: element.name.official,
      region: element.region,
      capital: capital,
    };

    commit('setAllCountries', country);
  },
  getCountries: async ({ dispatch }) => {
    let response = await axios.get('https://restcountries.com/v3.1/all');

    response.data.forEach((element) => {
      dispatch('commitAllCountries', element);
    });
  },
};

const mutations = {
  setAllCountries: (state, payload) => state.allCountries.push(payload),
};

export default { namespaced: true, state, getters, actions, mutations };
