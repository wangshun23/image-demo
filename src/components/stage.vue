<template>
  <div class="stage" id="stage">
    <slot></slot>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
export default {
  name: 'Img',
  data() {
    return {
    }
  },
  computed: {
    ...mapState([
      'trans'
    ])
  },
  methods: {

  },
  mounted() {
    const stage = document.getElementById('stage')
    this.trans.stage.x = stage.offsetLeft
    this.trans.stage.y = stage.offsetTop
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
