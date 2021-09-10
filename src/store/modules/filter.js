const state = {
  isClicked: false,
};

const getters = {
  isClicked: (state) => state.isClicked,
};

const actions = {
  clicked: ({ state, commit }) => {
    state.isClicked = !state.isClicked;

    commit('hasBeenClicked', state.isClicked);
  },
};

const mutations = {
  hasBeenClicked: (state, payload) => (state.isClicked = payload),
};

export default { namespaced: true, state, getters, actions, mutations };
