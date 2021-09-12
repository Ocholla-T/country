<template>
  <main ref="main" role="main" :class="isDark ? 'main-dark' : 'main-light'">
    <div ref="search" class="search search-light flex container">
      <div
        class="flex flex-ai-c"
        contenteditable="true"
        wrap="off"
        placeholder="Search for a country..."
        :value="country"
        @input="updateCountry"
        @keyup="searchCountry"
      ></div>
      <div
        class="filter flex flex-ai-c"
        placeholder="Filter by region..."
        @click="openDropdown"
      ></div>
    </div>
    <!-- <p>{{ countries }}</p> -->
    <transition name="dropdown">
      <div :class="isDark && 'dropdown-dark'" class="dropdown flex container" v-if="isOpen">
        <p v-for="(region, index) in regions" :key="index">{{ region }}</p>
      </div>
    </transition>
  </main>
</template>

<script>
import { computed, ref } from '@vue/reactivity';
import { useStore } from 'vuex';

export default {
  name: 'Home',
  setup() {
    const store = useStore();
    const country = ref('');
    const main = ref(null);
    const isDark = computed(() => store.getters['theme/isDark']);
    const countries = computed(() => store.getters['search/country']);
    const isOpen = computed(() => store.getters['filter/isOpen']);
    const regions = computed(() => store.getters['filter/regions']);

    let updateCountry = (event) => {
      let value = event.target.innerText;
      store.commit('search/updateCountry', value);
    };

    let searchCountry = (event) => store.dispatch('search/searchCountry', event);
    let openDropdown = () => store.dispatch('filter/openDropdown');

    return {
      main,
      country,
      countries,
      isOpen,
      regions,
      isDark,
      openDropdown,
      updateCountry,
      searchCountry,
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
  padding: 0.5rem 1.5rem;
  position: absolute;
  top: 7.5rem;

  @include main.breakpoint-up(large) {
    min-width: 12.7%;
    right: 7rem;
    top: 3.3rem;
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
  }
}

// dropdown animation
.dropdown-enter-active {
  animation: fade-in 250ms ease-in;
}
.dropdown-leave-active {
  animation: fade-out 250ms ease-in-out;
}
</style>
