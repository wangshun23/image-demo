<template>
  <div :style="{ width: obj.width + 'px', zIndex: obj.zIndex, height: obj.height + 'px', top: obj.top + 'px', left: obj.left + 'px', transform: renderRotate}" class="img-warp"  >
    <drag :file = "obj">
      <img :src="obj.src">
    </drag>
    <swrap :obj="obj" />
  </div>
</template>

<script>
import Drag from './drag.vue'
import Swrap from './select-wrap.vue'

import {
  mapState
} from 'vuex'
export default {
  name: 'Img',
  components:{
    Drag,
    Swrap
  },
  data() {
    return {
      obj: {}
    }
  },
  computed: {
    ...mapState([
      'files'
    ]),
    renderRotate () {
      return `rotate(${this.obj.rotate}deg)`
    },
  },
  props: {
    file: File
  },
  methods: {
  },
  created() {
    this.obj = {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      src: '',
      rotate: 0,
      zIndex: 0,
    }
    this.files.push(this.obj)
    let reader = new FileReader()
    reader.readAsDataURL(this.file)
    reader.onload = e => {
      let dom = new Image()
      let src = e.target.result
      dom.src = src
      this.obj.src = src
      dom.onload = () => {
        this.obj.width = dom.width
        this.obj.height = dom.height

        this.obj.left = dom.offsetLeft
        this.obj.top = dom.offsetTop
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.img-warp {
  position: absolute;
}
</style>
