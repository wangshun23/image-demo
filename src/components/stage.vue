<template>
  <div class="stage" id="stage">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'Img',
  data() {
    return {
    }
  },
  props: {

  },
  methods: {

  },
  created() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stage{
  margin: 20px auto;
  position: relative;
  width: 375px;
  border: 2px solid #333333;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 667px;
}
</style>
