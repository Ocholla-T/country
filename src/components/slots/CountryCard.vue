<template>
  <div class="card" :class="isDark && 'card-dark'">
    <div class="card__flag">
      <slot name="country__flag"></slot>
    </div>
    <div class="card__text ">
      <h2><slot name="country__name"></slot></h2>
      <p><span>Population: </span><slot name="country__population"></slot></p>
      <p><span>Region: </span><slot name="country__region"></slot></p>
      <p><span>Capital: </span> <slot name="country__capital"></slot></p>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();
    const isDark = computed(() => store.getters['theme/isDark']);
    return {
      isDark,
    };
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/main';

.card {
  display: grid;
  grid-template-rows: 0.5fr 1fr;
  background-color: main.$white;
  box-shadow: 0px 1px 8px -4px main.$dark-gray;

  border-radius: 5px;
  box-sizing: border-box;
  overflow: hidden;

  &-dark {
    background-color: main.$dark-blue;
    box-shadow: none;
    color: main.$white;
  }
  // &__flag {
  //   > img {
  //     height: 100%;
  //     width: 100%;
  //   }
  // }

  &__text {
    padding: 2rem;
    width: 100%;
    @include main.breakpoint-up(large) {
      padding: 1rem;
    }
    > p {
      font-size: main.$font-md;
      > span {
        font-weight: 600;
      }
    }
  }
}
</style>
