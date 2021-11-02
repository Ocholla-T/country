<template>
  <router-link
    class="card"
    :class="isDark && 'card-dark'"
    :to="{ name: 'Detail', params: { name: links } }"
    tag="div"
  >
    <div class="card__flag">
      <slot name="country__flag"></slot>
    </div>
    <div class="card__text ">
      <div class="card__text__title">
        <h2><slot name="country__name"></slot></h2>
      </div>
      <div class="card__text__body">
        <p><span>Region: </span><slot name="country__region"></slot></p>
        <p><span>Capital: </span> <slot name="country__capital"></slot></p>
      </div>
    </div>
  </router-link>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
export default {
  props: {
    link: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const links = computed(() => props.link);
    const isDark = computed(() => store.getters['theme/isDark']);
    return {
      isDark,
      links,
    };
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/main';

.card {
  background-color: main.$white;
  border-radius: 5px;
  box-shadow: 0px 0px 8px -3px main.$dark-gray;
  color: main.$very-dark-blue-text;

  text-decoration: none;

  &-dark {
    background-color: main.$dark-blue;
    box-shadow: none;

    color: main.$white;
  }

  &__text {
    margin: 0 1rem;
    position: relative;
    &__body {
      position: relative;
      bottom: 0;
    }
  }
}
</style>
