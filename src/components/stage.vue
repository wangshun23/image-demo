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
  name: 'Stage',
  data() {
    return {
    }
  },
  computed: {
    ...mapState([
      'stage'
    ])
  },
  methods: {

  },
  mounted() {
    // const stage = document.getElementById('stage')
    // console.log(this.$el.offsetTop)
    this.stage.x = this.$el.offsetLeft
    this.stage.y = this.$el.offsetTop
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
