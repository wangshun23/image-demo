<template>
<div id="app">
  <div id="preview">
    <select-wrap />
  </div>
</div>
</template>

<script>
import selectWrap from './components/select-wrap'

export default {
  name: 'App',
  components: {
    selectWrap
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
  width: 600px;
  overflow: hidden;
  height: 600px;
  left: 100px;
  top: 100px;
  padding: 50px;
  border: 1px solid red;
}
/*.image {
  transform: rotate(15deg);
}*/
</style>
