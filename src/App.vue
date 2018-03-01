<template>
  <div id="app">
    <input type="file" onchange="demo(this)">
  </div>
</template>

<script>
import Img from './components/img'

export default {
  name: 'App',
  components: {
    Img
  },
  data() {
    return {
      images: []
    }
  }
}
</script>

<style>
html,body{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  padding: 0;
  margin: 0;
}

#app {
  position: relative;
  width: 750px;
  border: 2px solid #333333;
  overflow: hidden;
}
</style>
