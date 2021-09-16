import axios from 'axios';

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
      name: element.name,
      population: element.population,
      region: element.region,
      capital: element.capital,
    };

    commit('setCountries', country);
    state.countries = [];
  },
  filterCountries: async ({ state, dispatch, rootState }, payload) => {
    let region = payload.target.innerText;
    let response = await axios.get(`https://restcountries.eu/rest/v2/region/${region}`);

    // filters all countries in the world according to region
    if (state.countries.length === 0 && rootState.search.country.length === 0) {
      response.data.forEach((element) => {
        dispatch('commitCountry', element);
      });
    }
    // filters searched countries according to their region
    else if (rootState.search.country.length !== 0) {
      state.countries = [];

      let countriesFilteredByRegion = rootState.search.country.filter(
        (element) => element.region === `${region}`,
      );

      // commits the countries to a mutation
      countriesFilteredByRegion.forEach((element) => {
        dispatch('commitCountry', element);
      });
    }
  },
};

const mutations = {
  hasBeenOpened: (state, payload) => (state.isOpen = payload),
  setCountries: (state, payload) => state.countries.push(payload),
};

export default { namespaced: true, state, getters, actions, mutations };
