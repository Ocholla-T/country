<template>
  <nav class="nav container flex flex-ai-c flex-jc-sb" id="navigation" role="navigation">
    <p>Where in the world?</p>
    <div class="nav__theme flex flex-jc-c flex-ai-c">
      <div class="nav__icon"></div>
      <p>Dark Mode</p>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavigationBar',
  setup() {
    return {};
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
  box-shadow: 0px 1px 8px 0px main.$dark-gray;
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

    @include main.breakpoint-up(large) {
      gap: 0.5rem;
      font-size: main.$font-reg;
    }
  }
  &__icon {
    background: no-repeat url('../assets/images/moon-outline.svg');
    min-width: 1.25rem;
    min-height: 1.25rem;
  }
}
</style>
