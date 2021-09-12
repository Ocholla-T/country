const state = {
  isDark: false,
};

const getters = {
  isDark: (state) => state.isDark,
};

const mutations = {
  changeThemeState: (state) => (state.isDark = !state.isDark),
};

const actions = {};

export default { namespaced: true, state, getters, actions, mutations };
