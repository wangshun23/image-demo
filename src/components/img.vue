<template>
<div :style="{ width: width + 'px', zIndex:zIndex, height: height + 'px', top: top + 'px', left: left + 'px'}" class="img-warp"  @click="testAlert()">
  <img :src="src" width="100%" :draggable="drag" @dragstart="dstart" @drag="ddrag">
</div>
</template>

<script>
import { getZIndex } from '../libs/max-zindex'
export default {
  name: 'Img',
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
      dom: {},
      ox: 0,
      oy: 0,
      zIndex: getZIndex()
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
      // console.log("123")
      // e.preventDefault()
      this.ox = e.offsetX
      this.oy = e.offsetY
    },
    ddrag(e){

      let _x = e.pageX
      let _y = e.pageY
      if (_x == 0 && _y == 0) {
        return
      }
      _x -= this.ox
      _y -= this.oy

      this.left = _x
      this.top = _y
    }
  },
  created() {
    let reader = new FileReader()
    reader.readAsDataURL(this.file)
    reader.onload = e => {
      this.dom = new Image()
      this.src = e.target.result
      this.dom.src = e.target.result
      this.dom.onload = () => {
        this.width = this.dom.width
        this.height = this.dom.height
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
