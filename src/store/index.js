import { createStore } from 'vuex';
import theme from './modules/theme';
import search from './modules/search';

export default createStore({
  modules: {
    theme,
    search,
  },
});
