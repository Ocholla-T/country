<template>
  <main role="main">
    <header role="banner">
      <NavigationBar />
    </header>
  </main>
</template>

<script>
import NavigationBar from '@/components/NavigationBar';
export default {
  name: 'Home',
  components: {
    NavigationBar,
  },
};
</script>

<style lang="scss" scoped>
@use '../assets/styles/main';
</style>
