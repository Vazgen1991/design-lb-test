<template>
  <div id="app">
    <header-component/>
    <main-content/>


  </div>
</template>

<script>

import {HeaderComponent, MainContent} from "./components";

export default {
  name: 'App',
  components: {
    HeaderComponent,
    MainContent
  }
}
</script>

<style lang="scss">

#app {

}

</style>
