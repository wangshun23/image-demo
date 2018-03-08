<template>
  <div class="image-box">
    <img class="image" id="image"
    :src="imageSrc"
    :class="{'image-move': rotateFlag}" :style="renderStyl" @load="loadAcion" @mousemove="mouseMoveAction" @mousedown="mouseDownAction" @mouseup="mouseUpAction" @mouseleave="mouseLeaveAction"/>
    <div class="image-rotate"></div>
  </div>
</template>

<script>

const imageSrc = "http://img.thebeastshop.com/apppictures/2018-03-06/992e7af9bf6b9ef9aaf9a0f88e43c83b.jpg"

export default {
  name: 'image-rotate',
  components: {
  },
  data() {
    return {
      imageSrc: imageSrc,
      rotate: 0,
      width: 216,
      height: 226,
      angle: 0,
      x0: 0,
      y0: 0,
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      rotateRote: 0.25,
      rotateFlag: false,
      downFlag: false,
      angleStart: 0,
      angleEnd: 0,
    }
  },
  computed: {
    renderStyl () {
      return {
        transform: `rotate(${this.angle}deg)`
      }
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    loadAcion (e) {
      let imageDom = e.currentTarget
        // console.log(imageDom)
        // console.log(imageDom.width, imageDom.offsetLeft, imageDom.offsetTop, imageDom.pageX)
        this.width = imageDom.width
        this.height = imageDom.height
        let top = imageDom.offsetTop
        this.x0 = imageDom.offsetLeft + this.width/2
        this.y0 = imageDom.offsetTop + this.height/2
    },
    mouseMoveAction (e) {
      // console.log(e)
      let x = e.offsetX
      let y = e.offsetY
      // console.log(x, y)
      let xRote = (this.width - x)/this.width
      let yRote = y/this.height
      if(xRote <= this.rotateRote && yRote <= this.rotateRote) {
        this.rotateFlag = true
        if(this.downFlag) {
          let angleObj = this.getAngle(e)
          this.x2 = angleObj.x
          this.y2 = angleObj.y
          this.angleEnd = angleObj.angle
          let angleGap = this.angleStart - this.angleEnd
          let curAngle = this.angle + angleGap
          this.angle = curAngle%360
          // console.log(this.angle, "angle")
        }
      } else {
        this.rotateFlag = false
      }
    },
    mouseDownAction (e) {
      e.preventDefault()
      this.downFlag = true
      if(this.rotateFlag) {
        let angleObj = this.getAngle(e)
        this.x1 = angleObj.x
        this.y1 = angleObj.y
        this.angleStart = angleObj.angle
      }
    },
    mouseUpAction (e) {
      this.downFlag = false
    },
    mouseLeaveAction (e) {
      this.downFlag = false
    },
    getAngle (e) {
      let x = e.offsetX - this.width/2
      let y = this.height/2 - e.offsetY
      let to = Math.abs(y/x)
      let angle = Math.atan(to)/(2 * Math.PI)*360
      let angleObj = {
        x: x,
        y: y,
        angle: angle
      }
      // console.log(angleObj)
      return angleObj
    },

  }
}
</script>

<style>
.image-box {
  display: inline-block;
}
.image-rotate {
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
}
.image {
  display: inline-block;
  cursor: default;
}
.image-move {
  /*cursor: move;*/
  cursor: ne-resize;
}
</style>
