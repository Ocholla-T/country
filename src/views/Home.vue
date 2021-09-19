<template>
  <main ref="main" role="main" :class="isDark ? 'main-dark' : 'main-light'">
    <div class="search search-light flex container">
      <div
        class="flex flex-ai-c"
        contenteditable="true"
        wrap="off"
        placeholder="Search for a country..."
        :value="country"
        @input="updateCountryModel"
        @keyup="searchCountry"
      ></div>
      <div
        class="filter flex flex-ai-c"
        placeholder="Filter by region..."
        @click="openDropdown"
      ></div>
    </div>
    <transition name="dropdown">
      <div :class="isDark && 'dropdown-dark'" class="dropdown flex container" v-if="isOpen">
        <p v-for="(region, index) in regions" :key="index" @click="filterCountries">{{ region }}</p>
      </div>
    </transition>
    <div class="country ">
      <CountryCard v-for="(country, index) in allCountries" :key="index">
        <template v-slot:country__flag>
          <img :src="country.flag" :alt="'This is the ' + country.name + ' flag'" />
        </template>
        <template v-slot:country__name>
          {{ country.name }}
        </template>
        <template v-slot:country__population>
          {{ country.population }}
        </template>
        <template v-slot:country__region>
          {{ country.region }}
        </template>
        <template v-slot:country__capital>
          {{ country.capital }}
        </template>
      </CountryCard>
    </div>
  </main>
</template>

<script>
import CountryCard from '@/components/slots/CountryCard';
import { computed, ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import { onBeforeMount } from '@vue/runtime-core';

export default {
  name: 'Home',
  components: {
    CountryCard,
  },
  setup() {
    const store = useStore();
    const country = ref('');
    const main = ref(null);
    const isDark = computed(() => store.getters['theme/isDark']);
    const allCountries = computed(() => store.getters['allCountries/getAllCountries']);
    const isOpen = computed(() => store.getters['filter/isOpen']);
    const regions = computed(() => store.getters['filter/regions']);

    onBeforeMount(() => {
      store.dispatch('allCountries/getCountries');
    });

    let updateCountryModel = (event) => {
      let value = event.target.innerText;
      store.commit('search/updateCountryModel', value);
    };

    let searchCountry = (event) => store.dispatch('search/searchCountry', event);
    let openDropdown = () => store.dispatch('filter/openDropdown');
    let filterCountries = (event) => store.dispatch('filter/filterCountries', event);

    return {
      main,
      country,
      allCountries,
      isOpen,
      regions,
      isDark,
      openDropdown,
      updateCountryModel,
      searchCountry,
      filterCountries,
    };
  },
};
</script>

<style lang="scss" scoped>
@use '../assets/styles/main';

main {
  position: relative;
}

.main-light {
  background-color: main.$very-light-gray;
}

.main-dark {
  background-color: main.$very-dark-blue;
  > .search {
    > div {
      background-color: main.$dark-blue;
      box-shadow: none;
      color: main.$white;

      &::after {
        filter: brightness(0) invert(1);
      }
    }
  }
}

.search-light {
  > div {
    background-color: main.$white;
    color: main.$dark-gray;
  }
}
.search {
  box-sizing: border-box;
  flex-direction: column;
  font-size: main.$font-md;
  font-weight: 600;
  gap: 1rem;
  @include main.breakpoint-up(large) {
    font-size: main.$font-reg;
    flex-direction: row;
    justify-content: space-between;
  }

  > div {
    border-radius: 5px;
    box-shadow: 0px 0px 8px -3px main.$dark-gray;
    cursor: pointer;
    font-size: main.$font-reg;
    height: 3rem;
    max-width: 70%;
    padding: 0.5rem 4rem;
    position: relative;

    &:empty:before {
      content: attr(placeholder);
    }

    //textarea styling
    &:first-of-type {
      margin-top: 1rem;
      overflow: hidden;
      white-space: nowrap;
      @include main.breakpoint-up(large) {
        width: 40%;
      }
      @include main.breakpoint-down(medium) {
        min-width: 100%;
      }

      &::after {
        content: '';
        background: url('../assets/images/search.svg') no-repeat;
        height: 1.3rem;
        left: 1.5rem;
        position: absolute;
        top: 0.825rem;
        width: 1.3rem;
      }
    }

    // filter dropdown
    &:last-of-type {
      margin-top: 0.5rem;
      padding-left: 1.5rem;
      @include main.breakpoint-up(large) {
        width: 20%;
      }

      &::after {
        content: '';
        background: url('../assets/images/down.svg') no-repeat;
        height: 1.2rem;
        position: absolute;
        right: 1rem;
        top: 0.8rem;
        width: 1.2rem;
      }

      &:hover {
        color: main.$very-dark-blue-text;
        opacity: 0.75;
      }
    }
  }
}

.dropdown {
  background-color: main.$white;
  border-radius: 5px;
  box-shadow: 0px 0px 8px -3px main.$dark-gray;
  color: main.$dark-gray;
  flex-direction: column;
  font-weight: 600;
  margin: 1rem;
  min-width: 50%;
  padding: 1rem 1.5rem;
  position: absolute;
  top: 9.5rem;

  @include main.breakpoint-up(large) {
    min-width: 12.7%;
    right: 7rem;
    top: 4.3rem;
  }

  > p {
    cursor: pointer;
    margin: 0.125rem;

    &:hover {
      color: main.$very-dark-blue-text;
    }
  }

  &-dark {
    background-color: main.$dark-blue;
    box-shadow: none;
    color: main.$white;

    > p {
      &:hover {
        color: main.$dark-gray;
      }
    }
  }
}

// dropdown animation
.dropdown-enter-active {
  animation: fade-in 250ms ease-in;
}
.dropdown-leave-active {
  animation: fade-out 250ms ease-in-out;
}

.country {
  display: grid;
  grid-auto-flow: row;
  gap: 2rem;
  margin: 1rem 2rem;
  @include main.breakpoint-up(large) {
    grid-template-columns: repeat(4, 1fr);
    gap: 3rem;
    padding: 1rem 8.5rem;
  }
}
</style>
