<template>
  <header role="banner">
    <NavigationBar />
  </header>

  <router-view />
</template>

<script>
import NavigationBar from '@/components/NavigationBar';
export default {
  components: {
    NavigationBar,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
