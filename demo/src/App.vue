<template>
  <NavbarFront></NavbarFront>
  <router-view/>
</template>
<script>
import NavbarFront from '@/components/NavbarFront.vue'
export default {
  components: {
    NavbarFront
  }
}

</script>
<style lang="scss">
@import '~bootstrap/scss/bootstrap';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
