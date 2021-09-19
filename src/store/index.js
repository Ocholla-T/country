import { createStore } from 'vuex';
import theme from './modules/theme';
import search from './modules/search';
import filter from './modules/filter';
import allCountries from './modules/allCountries';

export default createStore({
  modules: {
    theme,
    search,
    filter,
    allCountries,
  },
});
