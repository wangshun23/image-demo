<template>
<div id="app">
  <div id="preview">
    <image-rotate />
  </div>
</div>
</template>

<script>
import imageRotate from './components/image-rotate'

export default {
  name: 'App',
  components: {
    imageRotate
  },
  data() {
    return {}
  },
  computed: {
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style>
html,
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  padding: 0;
  margin: 0;
}

#preview {
  position: relative;
  width: 500px;
  overflow: hidden;
  height: 500px;
  left: 100px;
  top: 100px;
  padding: 100px;
}
/*.image {
  transform: rotate(15deg);
}*/
</style>
