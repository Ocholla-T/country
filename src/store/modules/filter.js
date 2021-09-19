// import axios from 'axios';

const state = {
  isOpen: false,
  regions: ['Africa', 'Americas', ' Asia', 'Europe', 'Oceania'],
  countries: [],
};

const getters = {
  isOpen: (state) => state.isOpen,
  regions: (state) => state.regions,
};

const actions = {
  openDropdown: ({ state, commit }) => {
    state.isOpen = !state.isOpen;
    commit('hasBeenOpened', state.isOpen);
  },
  commitCountry: ({ commit }, element) => {
    let country = {
      flag: element.flag,
      name: element.name,
      population: element.population,
      region: element.region,
      capital: element.capital,
    };

    commit('allCountries/setAllCountries', country, { root: true });
    state.countries = [];
  },
  filterCountries: async ({ rootGetters, rootState, dispatch }, payload) => {
    let region = payload.target.innerText;

    await dispatch('allCountries/getCountries', null, { root: true });

    const filteredCountries = rootGetters['allCountries/getAllCountries'].filter(
      (country) => country.region === `${region}`,
    );

    rootState.allCountries.allCountries = [];

    filteredCountries.forEach((element) => dispatch('commitCountry', element));
  },
};

const mutations = {
  hasBeenOpened: (state, payload) => (state.isOpen = payload),
  setCountries: (state, payload) => state.countries.push(payload),
};

export default { namespaced: true, state, getters, actions, mutations };
