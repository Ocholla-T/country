const state = {
  isOpen: false,
  regions: ['Africa', 'Americas', ' Asia', 'Europe', 'Oceania'],
  country: [],
}

const getters = {
  isOpen: (state) => state.isOpen,
  regions: (state) => state.regions,
}

const actions = {
  openDropdown: ({ state, commit }) => {
    state.isOpen = !state.isOpen
    commit('hasBeenOpened', state.isOpen)
  },
  filterCountries: async ({ rootGetters, rootState, dispatch }, payload) => {
    let region = payload.target.innerText

    if (rootState.search.countryModel.length !== 0) {
      const filteredCountries = rootGetters['allCountries/getAllCountries'].filter(
        (country) => country.region === `${region}`,
      )

      rootState.allCountries.allCountries = []
      filteredCountries.forEach((element) =>
        dispatch('allCountries/commitAllCountries', element, { root: true }),
      )
    }

    await dispatch('allCountries/getCountries', null, { root: true })

    const filteredCountries = rootGetters['allCountries/getAllCountries'].filter(
      (country) => country.region === `${region}`,
    )

    rootState.allCountries.allCountries = []

    filteredCountries.forEach((element) =>
      dispatch('allCountries/commitAllCountries', element, { root: true }),
    )
  },
  filterProperty: ({ state, rootGetters, dispatch }, payload) => {
    state.country = []
    dispatch('allCountries/getCountries', null, { root: true })
    const country = rootGetters['allCountries/getAllCountries'].filter(
      (country) => country.name === payload,
    )
    console.log(country)
    // commit('filteredCountry', country);
  },
}

const mutations = {
  hasBeenOpened: (state, payload) => (state.isOpen = payload),
  filteredCountry: (state, payload) => (state.country = payload),
}

export default { namespaced: true, state, getters, actions, mutations }
