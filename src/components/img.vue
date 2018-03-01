<template>
  <div :style="{ width: width + 'px', height: height + 'px', top: top + 'px', left: left + 'px'}" class="img-warp">
    <img :src="src" width="100%">
  </div>
</template>

<script>
export default {
  name: 'Img',
  data () {
    return {
      src: '',
      width: 0,
      height: 0,
      top: 0,
      left: 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .img-warp{
    position: absolute;
  }
</style>
