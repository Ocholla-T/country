const state = {
  isDark: false,
};

const getters = {};

const mutations = {
  changeThemeState: (state) => (state.isDark = !state.isDark),
};

const actions = {};

export default { namespaced: true, state, getters, actions, mutations };
