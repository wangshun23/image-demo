<template>
  <div :style="{ width: width + 'px', zIndex:zIndex, height: height + 'px', top: top + 'px', left: left + 'px'}" class="img-warp"  >
    <transform>
      <img :src="src"  :draggable="drag" @dragstart="dstart" @drag="ddrag" @click="testAlert()">
    </transform>
  </div>
</template>

<script>
import { getZIndex } from '../libs/max-zindex'
import transform from './transform.vue'

export default {
  name: 'Img',
  components:{
    transform
  },
  data() {
    return {
      drag: true,
      src: '',
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      rotate: 0,
      x: 0,
      y: 0,
      ox: 0,
      oy: 0,
      zIndex: getZIndex(),
      sx: 0,
      sy: 0
    }
  },
  props: {
    file: File
  },
  methods: {
    testAlert(){
      alert("编辑图片")
    },
    dstart(e){
      e.dataTransfer.setData("imgMove", true);
      this.zIndex = getZIndex()
      this.ox = e.offsetX
      this.oy = e.offsetY
    },
    ddrag(e){
      // console.log(e.pageX)
      if (_x == 0 && _y == 0) return
      const _x = e.pageX - this.ox - this.sx
      const _y = e.pageY - this.oy - this.sy
      this.left = _x
      this.top = _y
    }
  },
  created() {
    const stage = document.getElementById('stage')
    this.sx = stage.offsetLeft
    this.sy = stage.offsetTop
    let reader = new FileReader()
    reader.readAsDataURL(this.file)
    reader.onload = e => {
      let dom = new Image()
      let src = e.target.result
      dom.src = src
      this.src = src
      dom.onload = () => {
        this.width = dom.width
        this.height = dom.height
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
