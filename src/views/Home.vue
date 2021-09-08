<template>
  <main role="main">
    <div class="search flex container">
      <div
        class="flex flex-ai-c"
        contenteditable="true"
        wrap="off"
        placeholder="Search for a country..."
        :value="country"
        @input="updateCountry"
        @keyup="searchCountry"
      ></div>
      <div class="flex flex-ai-c" placeholder="Filter by region..."></div>
    </div>
    <!-- <p>{{ countries }}</p> -->
    <div class="dropdown flex container">
      <p>Africa</p>
      <p>America</p>
      <p>Asia</p>
      <p>Europe</p>
      <p>Oceania</p>
    </div>
  </main>
</template>

<script>
import { computed, ref } from '@vue/reactivity';
import { useStore } from 'vuex';

export default {
  name: 'Home',
  setup() {
    const store = useStore();
    let country = ref('');

    let updateCountry = (event) => {
      let value = event.target.innerText;
      store.commit('search/updateCountry', value);
    };

    const searchCountry = (event) => store.dispatch('search/searchCountry', event);
    const countries = computed(() => store.getters['search/country']);

    return {
      country,
      updateCountry,
      searchCountry,
      countries,
    };
  },
};
</script>

<style lang="scss" scoped>
@use '../assets/styles/main';

main {
  background-color: main.$very-light-gray;
  position: relative;
}
.search {
  box-sizing: border-box;
  flex-direction: column;
  font-size: main.$font-md;
  gap: 1rem;
  @include main.breakpoint-up(large) {
    font-size: main.$font-reg;
    flex-direction: row;
    justify-content: space-between;
  }

  > div {
    background-color: main.$white;
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
      white-space: nowrap;
      overflow: hidden;
      @include main.breakpoint-up(large) {
        width: 40%;
      }
      @include main.breakpoint-down(medium) {
        min-width: 100%;
      }

      &::after {
        content: '';
        background: url('../assets/images/search.svg') no-repeat;
        position: absolute;
        top: 0.825rem;
        left: 1.5rem;
        width: 1.3rem;
        height: 1.3rem;
      }
    }

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
  flex-direction: column;
  margin: 1rem;
  min-width: 50%;
  padding: 0.5rem 1.5rem;
  position: absolute;
  top: 7.5rem;

  @include main.breakpoint-up(large) {
    min-width: 13.5%;
    right: 5rem;
    top: 3.3rem;
  }

  > p {
    cursor: pointer;
    margin: 0.125rem;
  }
}
</style>
