const state = {
  isOpen: false,
  regions: ['Africa', 'Americas', ' Asia', 'Europe', 'Oceania'],
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
  filterCountries: async ({ rootGetters, rootState, dispatch }, payload) => {
    let region = payload.target.innerText;

    if (rootState.search.countryModel.length !== 0) {
      const filteredCountries = rootGetters['allCountries/getAllCountries'].filter(
        (country) => country.region === `${region}`,
      );

      rootState.allCountries.allCountries = [];
      filteredCountries.forEach((element) =>
        dispatch('allCountries/commitAllCountries', element, { root: true }),
      );
    }

    await dispatch('allCountries/getCountries', null, { root: true });

    const filteredCountries = rootGetters['allCountries/getAllCountries'].filter(
      (country) => country.region === `${region}`,
    );

    rootState.allCountries.allCountries = [];

    filteredCountries.forEach((element) =>
      dispatch('allCountries/commitAllCountries', element, { root: true }),
    );
  },
};

const mutations = {
  hasBeenOpened: (state, payload) => (state.isOpen = payload),
};

export default { namespaced: true, state, getters, actions, mutations };
