import axios from 'axios';

const state = {
  countryModel: '',
  country: [],
};

const getters = {
  country: (state) => {
    return state.country;
  },
};

const actions = {
  searchCountry: async ({ state, commit }, event) => {
    if (event.keyCode === 13) {
      let name = state.countryModel;
      const response = await axios.get(`https://restcountries.eu/rest/v2/name/${name}`);

      if (state.country.length === 0) {
        response.data.forEach((element) => {
          let country = {
            name: element.name,
            population: element.population,
            region: element.region,
            capital: element.capital,
          };

          commit('setCountryDetails', country);
        });
      } else {
        state.country = [];
        response.data.forEach((element) => {
          let country = {
            name: element.name,
            population: element.population,
            region: element.region,
            capital: element.capital,
          };

          commit('setCountryDetails', country);
        });
      }
    }
  },
};

const mutations = {
  updateCountry: (state, payload) => {
    state.countryModel = payload;
  },
  setCountryDetails: (state, payload) => {
    state.country.push(payload);
  },
};

export default { namespaced: true, state, getters, actions, mutations };
