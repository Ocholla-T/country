const state = {
  isDark: false,
};

const getters = {};

const mutations = {
  changeThemeState: (state) => {
    if (state.isDark === false) {
      state.isDark = true;
    } else {
      state.isDark = false;
    }
  },
};

const actions = {};

export default { namespaced: true, state, getters, actions, mutations };
