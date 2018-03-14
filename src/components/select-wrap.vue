<template>
  <!-- <div class="page">
    <div class="wrapper">
      <ul class="edit-area">
        <li :style="{ position: 'absolute', width: obj.width + 'px', height: obj.height + 'px', zIndex: obj.zIndex, top: obj.top + 'px', left: obj.left + 'px', transform: renderRotate, opacity: 1 }"> -->

          <div class="select-wrap">
            <div class="rotate-circle" @mousemove="mouseMoveRotateAction" @mousedown="mouseDownRotateAction" @mouseup="mouseUpRotateAction" @mouseleave="mouseLeaveRotateAction"></div>
            <div class="rotate-line"></div>
            <div class="bar bar-m-line"></div>
            <div class="line-n" @mousemove="mouseMoveAction($event, 'n')" @mousedown="mouseDownAction($event, 'n')" @mouseup="mouseUpAction" @mouseleave="mouseLeaveAction">
              <div class="line-circle circle"></div>
            </div>
            <div class="line-e" @mousemove="mouseMoveAction($event, 'e')" @mousedown="mouseDownAction($event, 'e')" @mouseup="mouseUpAction" @mouseleave="mouseLeaveAction">
              <div class="line-circle circle"></div>
            </div>
            <div class="line-s" @mousemove="mouseMoveAction($event, 's')" @mousedown="mouseDownAction($event, 's')" @mouseup="mouseUpAction" @mouseleave="mouseLeaveAction">
              <div class="line-circle circle"></div>
            </div>
            <div class="line-w" @mousemove="mouseMoveAction($event, 'w')" @mousedown="mouseDownAction($event, 'w')" @mouseup="mouseUpAction" @mouseleave="mouseLeaveAction">
              <div class="line-circle circle"></div>
            </div>
            <div class="circle-nw circle" @mousemove="mouseMoveAction($event, 'nw')" @mousedown="mouseDownAction($event, 'nw')" @mouseup="mouseUpAction" @mouseleave="mouseLeaveAction"></div>
            <div class="circle-ne circle" @mousemove="mouseMoveAction($event, 'ne')" @mousedown="mouseDownAction($event, 'ne')" @mouseup="mouseUpAction" @mouseleave="mouseLeaveAction"></div>
            <div class="circle-se circle" @mousemove="mouseMoveAction($event, 'se')" @mousedown="mouseDownAction($event, 'se')" @mouseup="mouseUpAction" @mouseleave="mouseLeaveAction"></div>
            <div class="circle-sw circle" @mousemove="mouseMoveAction($event, 'sw')" @mousedown="mouseDownAction($event, 'sw')" @mouseup="mouseUpAction" @mouseleave="mouseLeaveAction"></div>
          </div>

        <!-- </li>
      </ul>
    </div>
  </div> -->

</template>

<script>

const imageSrc = "http://img.thebeastshop.com/apppictures/2018-03-06/992e7af9bf6b9ef9aaf9a0f88e43c83b.jpg"

import {
  mapState
} from 'vuex'

export default {
  name: 'select-wrap',
  components: {
  },
  props: {
    obj: Object
  },
  data() {
    return {
      imageSrc: imageSrc,
      rotate: 0,
      width: 216,
      height: 226,
      downFlag: false,
      downRotateFlag: false,
      angleStart: 0,
      angleEnd: 0,
      scaleFlag: false,
      scaleWidth: true,
      scaleStart: 0,
      scaleEnd: 0,

      angle: 0,
      rotateFlag: false,
      rotateRote: 0.25,
      scaleRote: 0.1,

      // obj: {}
    }
  },
  computed: {
    // renderStyl () {
    //   return {
    //     transform: `rotate(${this.obj.angle}deg)`
    //   }
    // },
    // renderWidth () {
    //   return `${this.width}px`
    // },
    // renderHeight () {
    //   return `${this.height}px`
    // },
    // renderRotate () {
    //   return `rotate(${this.obj.angle}deg)`
    // },
    // ...mapState([
    //   'stage'
    // ]),
  },
  created () {
    // this.obj = {
    //   width: 216,
    //   height: 226,
    //   top: 20,
    //   left: 20,
    //   src: '',
    //   rotate: 0,
    //   zIndex: 0
    // }
  },
  mounted () {
  },
  methods: {
    loadAcion (e) {
      if(this.obj.width/this.obj.height >1) {
        this.scaleWidth = true
      } else {
        this.scaleWidth = false
      }
    },
    mouseMoveRotateAction (e) {
      if(this.downRotateFlag) {
        this.angleEnd = this.getAngle(e)
        // let angleGap = this.angleEnd - this.angleStart
        let angleGap = this.angleStart - this.angleEnd
        console.log(angleGap, "angleGap")
        let curAngle = this.angle + angleGap
        console.log(curAngle, "curAngle")
        this.obj.rotate = curAngle%360
        // console.log(this.angle, "this.angle")
      }
    },
    mouseDownRotateAction (e) {
      e.preventDefault()
      console.log(e)
      this.downRotateFlag = true
      this.angleStart = this.getAngle(e)
    },
    mouseUpRotateAction (e) {
      this.downRotateFlag = false
    },
    mouseLeaveRotateAction (e) {
      this.downRotateFlag = false
    },
    mouseMoveAction (e, direction) {
      if(this.downFlag) {
        this.scaleEnd = this.getScale(e, direction)
        console.log(this.scaleStart, this.scaleEnd)

        let gap = 0
        if(direction === "w" || direction === "n") {
          gap = this.scaleStart - this.scaleEnd
        } else if(direction === "e" || direction === "s"){
          gap = this.scaleEnd-this.scaleStart
        } else {
          if(this.scaleWidth) {
            if(direction === "nw" || direction === "sw") {
              gap = this.scaleStart - this.scaleEnd
            } else if(direction === "ne" || direction === "se") {
              gap = this.scaleEnd-this.scaleStart
            }
          } else {
            if(direction === "nw" || direction === "ne") {
              gap = this.scaleStart - this.scaleEnd
            } else if(direction === "sw" || direction === "se") {
              gap = this.scaleEnd-this.scaleStart
            }
          }
        }
        console.log(gap, "gap")

        if(direction === "n") {
          this.obj.top -= gap
          this.obj.height += gap
        } else if(direction === "s") {
          this.obj.height += gap
        } else if(direction === "w"){
          this.obj.left -= gap
          this.obj.width += gap
        } else if(direction === "e") {
          this.obj.width += gap
        } else {
          let width = 0,
              height = 0,
              widthGap = 0,
              heightGap = 0
          if(this.scaleWidth) {//width size big
            width = this.obj.width + gap
            height = this.obj.height*(width/this.obj.width)
            widthGap = gap
            heightGap = height - this.obj.height
          } else {//height size big
            height = this.obj.height + gap
            width = this.obj.width*(height/this.obj.height)
            heightGap = gap
            widthGap = width - this.obi.width
          }
          console.log(width, height, widthGap, heightGap)
          if(direction === "nw") {
            // this.changeSize({
            //   left: widthGap,
            //   top: heightGap
            // })
            this.obj.left -= widthGap
            this.obj.top -= heightGap
          } else if(direction === "ne") {
            this.obj.top -= heightGap
          } else if (direction === "sw") {
            this.obj.left -= widthGap
          }
          this.obj.width = width
          this.obj.height = height
          // this.changeSize({
          //   width: width,
          //   height: height
          // })
        }

      }
    },
    mouseDownAction (e, direction) {
      e.preventDefault()
      console.log(e, direction)

      this.downFlag = true
      this.scaleStart = this.getScale(e, direction)

      if(this.scaleStart === 0) {
        this.downFlag = false
      }
    },
    mouseUpAction (e) {
      this.downFlag = false
    },
    mouseLeaveAction (e) {
      this.downFlag = false
    },
    getAngle (e) {
      let to = Math.abs(e.y/e.x)
      let angle = Math.atan(to)/(2 * Math.PI)*360
      // console.log(angle)
      return angle
    },
    getScale (e, direction) {
      let scale = ""
      if(direction === "n" || direction === "s") {
        scale = e.y
      } else if(direction === "e" || direction === "w") {
        scale = e.x
      } else {
        scale = this.scaleWidth?e.x:e.y
      }
      return scale
    },
    changeSize ({width, height, left, top}) {
      console.log(width, height, left, top)
      if(width) {
        let tempI = 0
        for(let i=0;i<width;i++) {
          this.obj.width += i
          tempI = i
        }
        this.obj.width += (width - tempI)
      }
      if(height) {
        let tempI = 0;
        for(let i=0;i<height;i++) {
          this.obj.height += i
          tempI = i
        }
        this.obj.height += (height - tempI)
      }
      if(left) {
        let tempI = 0;
        for(let i=0;i<left;i++) {
          this.obj.left -= i
          tempI = i
        }
        this.obj.left -= (left - tempI)
      }
      if(top) {
        let tempI = 0;
        for(let i=0;i<top;i++) {
          this.obj.top -= i
          tempI = i
        }
        this.obj.top -= (top - tempI)
      }
    },

  }
}
</script>

<style>
.page{
  position: absolute;
  width: 500px;
  height: 500px;
  /*top: 50%;
  left: 50%;
  margin-top: 250px;
  margin-left: 250px;*/
}

.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.wrapper ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.wrapper ul.edit-area {
  position: absolute;
  width: 500px;
  height: 500px;
  left: 0;
  top: 0;
}

.wrapper ul li {
  color: #676767;
  line-height: 1;
  background: none;
  list-style: none!important;
  margin: 0!important;
  padding: 0;
  transition: padding .5s;
  min-height: 1px;
  min-width: 1px;
  width: 100%;
  -webkit-user-select: none;
}

.select-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.select-wrap div {
  position: absolute;
}

.select-wrap .circle {
  width: 12px;
  height: 12px;
  background-color: #fff;
  border: 1px solid #59c7f9;
  border-radius: 12px;
}

.select-wrap .rotate-circle {
  width: 12px;
  height: 12px;
  border-radius: 12px;
  top: -28px;
  left: 50%;
  margin-left: -6px;
  background-color: #44cb83;
  border: none;
  cursor: ne-resize;
  /*cursor: url("http://as.eqh5.com/c/images/mouserotate-70a3d7.ico") 10 10,default;*/
}

.select-wrap .rotate-line {
  width: 1px;
  height: 18px;
  top: -18px;
  left: 50%;
  margin-left: -.5px;
  background-color: #44cb83;
}

.select-wrap .bar-m-line {
  height: 100%;
  border-left: 1px dashed #44cb83;
  top: 0;
  left: 50%;
  margin-left: -.5px;
  display: none;
}

.select-wrap .line-n {
  cursor: ns-resize;
  width: 100%;
  height: 5px;
  top: -4px;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjNFNTdCOEI5NjEzMTFFNDkyNzVFOTE5QzlCOURDN0MiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjNFNTdCOEM5NjEzMTFFNDkyNzVFOTE5QzlCOURDN0MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCM0U1N0I4OTk2MTMxMUU0OTI3NUU5MTlDOUI5REM3QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCM0U1N0I4QTk2MTMxMUU0OTI3NUU5MTlDOUI5REM3QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoT1H8MAAAAGUExURQih7wAAAIpv3OoAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII=") repeat-x bottom;

}
.select-wrap .line-n .line-circle {
  position: absolute;
  left: 50%;
  top: -2px;
  margin-left: -6px;
}

.select-wrap .line-e {
  cursor: ew-resize;
  width: 5px;
  height: 100%;
  top: 0;
  right: -4px;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjNFNTdCOEI5NjEzMTFFNDkyNzVFOTE5QzlCOURDN0MiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjNFNTdCOEM5NjEzMTFFNDkyNzVFOTE5QzlCOURDN0MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCM0U1N0I4OTk2MTMxMUU0OTI3NUU5MTlDOUI5REM3QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCM0U1N0I4QTk2MTMxMUU0OTI3NUU5MTlDOUI5REM3QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoT1H8MAAAAGUExURQih7wAAAIpv3OoAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII=") repeat-y 0;

}
.select-wrap .line-e .line-circle {
  position: absolute;
  top: 50%;
  right: -2px;
  margin-top: -5px;
}

.select-wrap .line-s {
  cursor: ns-resize;
  width: 100%;
  height: 5px;
  bottom: -4px;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjNFNTdCOEI5NjEzMTFFNDkyNzVFOTE5QzlCOURDN0MiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjNFNTdCOEM5NjEzMTFFNDkyNzVFOTE5QzlCOURDN0MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCM0U1N0I4OTk2MTMxMUU0OTI3NUU5MTlDOUI5REM3QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCM0U1N0I4QTk2MTMxMUU0OTI3NUU5MTlDOUI5REM3QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoT1H8MAAAAGUExURQih7wAAAIpv3OoAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII=") repeat-x top;

}
.select-wrap .line-s .line-circle {
  position: absolute;
  left: 50%;
  bottom: -2px;
  margin-left: -6px;
}

.select-wrap .line-w {
  cursor: ew-resize;
  width: 5px;
  height: 100%;
  top: 0;
  left: -4px;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjNFNTdCOEI5NjEzMTFFNDkyNzVFOTE5QzlCOURDN0MiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjNFNTdCOEM5NjEzMTFFNDkyNzVFOTE5QzlCOURDN0MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCM0U1N0I4OTk2MTMxMUU0OTI3NUU5MTlDOUI5REM3QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCM0U1N0I4QTk2MTMxMUU0OTI3NUU5MTlDOUI5REM3QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoT1H8MAAAAGUExURQih7wAAAIpv3OoAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII=") repeat-y 100%;

}
.select-wrap .line-w .line-circle {
  position: absolute;
  top: 50%;
  left: -1px;
  margin-top: -5px;
}

.select-wrap .circle-nw {
  top: -5px;
  left: -5px;
  cursor: nwse-resize;
}

.select-wrap .circle-ne {
  top: -5px;
  right: -6px;
  cursor: nesw-resize;
}

.select-wrap .circle-se {
  bottom: -5px;
  right: -6px;
  cursor: nwse-resize;
}

.select-wrap .circle-sw {
  bottom: -5px;
  left: -5px;
  cursor: nesw-resize;
}

  /*ul

    &.edit-area

    li

      .select-wrap

        div

        .circle

        .rotate-circle

        .rotate-line

        .bar-m-line

        .line-n
          cursor ns-resize
          width 100%
          height 5px
          top -4px
          background url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFW…MAAAAGUExURQih7wAAAIpv3OoAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII=) repeat-x bottom
          .line-circle
            position absolute
            left 50%
            top -2px
            margin-left -6px
        .line-e
          cursor ew-resize
          width 5px
          height 100%
          top 0
          right -4px
          background url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFW…MAAAAGUExURQih7wAAAIpv3OoAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII=) repeat-y 0
          .line-circle
            position absolute
            top 50%
            right -2px
            margin-top -5px
        .line-s
          cursor ns-resize
          width 100%
          height 5px
          bottom -4px
          background url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFW…MAAAAGUExURQih7wAAAIpv3OoAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII=) repeat-x top
          .line-circle
            position absolute
            left 50%
            bottom -2px
            margin-left -6px
        .line-w
          cursor ew-resize
          width 5px
          height 100%
          top 0
          left -4px
          background url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFW…MAAAAGUExURQih7wAAAIpv3OoAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII=) repeat-y 100%
          .line-circle
            position absolute
            top 50%
            left -1px
            margin-top -5px
        .circle-nw
          top -5px
          left -5px
          cursor nwse-resize
        .circle-ne
          top -5px
          right -6px
          cursor nesw-resize
        .circle-se
          bottom -5px
          right -6px
          cursor nwse-resize
        .circle-sw
          bottom -5px
          left -5px
          cursor nesw-resize*/



 /*.image-box {
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
   cursor: ne-resize;
 }
 .image-ew {
   cursor: nwse-resize;
 }*/
</style>
