<template>
  <section class="main" :class="isDark && 'main-dark'">
    <div class="back__button  flex flex-jc-c flex-ai-c">
      <router-link to="/">Back</router-link>
    </div>
    <div class="main__image">
      <!-- <img :src="flag" :alt="`This is the ${country} flag`" /> -->
      <!-- <p>{{ flag }}</p> -->
    </div>
  </section>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { onBeforeMount } from '@vue/runtime-core';
export default {
  name: 'Detail',
  setup() {
    const route = useRoute();
    const store = useStore();
    const isDark = computed(() => store.getters['theme/isDark']);

    onBeforeMount(() => {
      store.dispatch('filter/filterProperty', route.params.name);
    });

    return {
      isDark,
    };
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/main';

p {
  font-size: main.$font-md;
}

.main {
  background-color: main.$very-light-gray;
  padding: 2rem 1rem;
  text-decoration: none;
  > a {
    color: main.$very-dark-blue-text;
  }

  &-dark {
    background-color: main.$very-dark-blue;
    > a {
      color: main.$very-dark-blue-text;
    }
  }
}

.back__button {
  background-color: main.$white;
  border-radius: 5px;
  box-shadow: 0px 0px 8px -3px main.$dark-gray;
  cursor: pointer;
  height: 1rem;
  padding: 0.5rem 1rem;
  width: 4rem;
  &::before {
    content: '';
    background: url('../assets/images/arrow-back.svg') no-repeat;
    height: 1.1rem;
    width: 1.1rem;
    flex-shrink: 0;
  }

  > a {
    color: main.$very-dark-blue-text;
    margin-left: 0.5rem;
    text-decoration: none;
  }
}
</style>
