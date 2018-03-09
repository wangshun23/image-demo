<template>
  <div class="drag" :draggable="drag" @dragstart="dstart" @drag="ddrag">
    <slot></slot>
  </div>
</template>

<script>
import { getZIndex } from '../libs/max-zindex'

import {
  mapState
} from 'vuex'
export default {
  data(){
    return {
      drag: true,
      ox: 0,
      oy: 0,
      sx: 0,
      sy: 0
    }
  },
  props: {
    file: Object
  },
  computed: {
    ...mapState([
      'stage'
    ])
  },
  created() {
    // console.log('d', this)
  },
  methods:{
    dstart(e){
      e.dataTransfer.setData("imgMove", true);
      this.file.zIndex = getZIndex()
      this.ox = e.offsetX
      this.oy = e.offsetY
    },
    ddrag(e){
      // console.log(e.pageX)
      if (_x == 0 && _y == 0) return
      const _x = e.pageX - this.ox - this.stage.x
      const _y = e.pageY - this.oy - this.stage.y
      this.file.left = _x
      this.file.top = _y
    }
  }
}
</script>

<style>
</style>
