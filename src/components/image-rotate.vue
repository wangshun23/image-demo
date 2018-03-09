<template>
  <div class="image-box">
    <img class="image" id="image"
      :src="imageSrc"
      :class="{'image-move': rotateFlag, 'image-ew': scaleFlag}"
      :style="{width: renderWidth, height: renderHeight, transform: renderRotate}"
      @load="loadAcion"
      @mousemove="mouseMoveAction"
      @mousedown="mouseDownAction"
      @mouseup="mouseUpAction"
      @mouseleave="mouseLeaveAction"
    />
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
      scaleRote: 0.1,
      scaleFlag: false,
      scaleWidth: true,
      scaleStart: 0,
      scaleEnd: 0
    }
  },
  computed: {
    renderStyl () {
      return {
        transform: `rotate(${this.angle}deg)`
      }
    },
    renderWidth () {
      return `${this.width}px`
    },
    renderHeight () {
      return `${this.height}px`
    },
    renderRotate () {
      return `rotate(${this.angle}deg)`
    },

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
        if(this.width/this.height >1) {
          this.scaleWidth = true
        } else {
          this.scaleWidth = false
        }

        let top = imageDom.offsetTop
        this.x0 = imageDom.offsetLeft + this.width/2
        this.y0 = imageDom.offsetTop + this.height/2
    },
    mouseMoveAction (e) {
      // console.log(e)
      let x = e.offsetX
      let y = e.offsetY
      // console.log(x, y)
      let xrRote = (this.width - x)/this.width
      let yrRote = y/this.height
      let xcRote = x/this.width
      let ycRote = y/this.height

      if(xrRote <= this.rotateRote && yrRote <= this.rotateRote) {
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
      } else if(xcRote <= this.scaleRote && ycRote <= this.scaleRote) {
        this.scaleFlag = true
        if(this.downFlag) {
          this.scaleEnd = this.scaleWidth?e.offsetX:e.offsetY
          let gap = this.scaleStart-this.scaleEnd
          if(this.scaleWidth) {
            let width = this.width + gap
            let height = this.height*(width/this.width)
            this.width = width
            this.height = height
          } else {
            let height = this.height + gap
            let width = this.width*(height/this.height)
            this.width = width
            this.height = height
          }
        }
      } else {
        this.rotateFlag = false
        this.scaleFlag = false
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
      if(this.scaleFlag) {
        this.scaleStart = this.scaleWidth?e.offsetX:e.offsetY
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
    getScale (e) {

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
  /*cursor: ew-resize;*/
  /*cursor: ns-resize;*/
}
.image-ew {
  cursor: nwse-resize;
}
</style>
