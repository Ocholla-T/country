<template>
  <nav
    ref="nav"
    class="nav nav-light container flex flex-ai-c flex-jc-sb"
    id="navigation"
    role="navigation"
  >
    <p>Where in the world?</p>
    <div class="nav__theme flex flex-jc-c flex-ai-c" @click="changeTheme">
      <div class="nav__icon"></div>
      <p>Dark Mode</p>
    </div>
  </nav>
</template>

<script>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';

export default {
  name: 'NavigationBar',
  setup() {
    const store = useStore();
    const nav = ref(null);

    const isDark = computed(() => store.state.theme.isDark);

    function changeTheme() {
      store.commit('changeThemeState');
      if (isDark.value === true) {
        nav.value.classList.add('nav-dark');
        nav.value.classList.remove('nav-light');
      } else {
        nav.value.classList.add('nav-light');
        nav.value.classList.remove('nav-dark');
      }
    }

    return {
      isDark,
      nav,
      changeTheme,
    };
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/main';

#navigation {
  @include main.breakpoint-down(medium) {
    padding: 1rem;
  }

  > p {
    font-weight: 750;
  }
}

.nav {
  @include main.breakpoint-up(large) {
    > p {
      font-size: 1.5rem;
    }
  }

  &__theme {
    gap: 0.25rem;
    max-height: 1.4375rem;
    font-weight: 600;
    font-size: main.$font-md;
    cursor: pointer;

    @include main.breakpoint-up(large) {
      gap: 0.5rem;
      font-size: main.$font-reg;
    }
  }
  &__icon {
    min-width: 1.25rem;
    min-height: 1.25rem;
  }

  &-light {
    background-color: main.$white;
    box-shadow: 0px 1px 8px 0px main.$dark-gray;
    color: main.$very-dark-blue-text;
    transition: all 250ms ease-in;
    > div {
      > div {
        background: no-repeat url('../assets/images/moon-outline.svg');
      }
    }
  }

  &-dark {
    box-shadow: 0px 1px 8px 0px main.$very-dark-blue-text;
    background-color: main.$dark-blue;
    color: main.$white;
    transition: all 250ms ease-in;
    > div {
      > div {
        background: no-repeat url('../assets/images/moon-sharp.svg');
        filter: brightness(0) invert(1);
      }
    }
  }
}
</style>
