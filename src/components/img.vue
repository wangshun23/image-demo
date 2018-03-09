<template>
  <div :style="{ width: obj.width + 'px', zIndex: this.obj.zIndex, height: obj.height + 'px', top: obj.top + 'px', left: obj.left + 'px'}" class="img-warp"  >
    <drag :file = "obj">
      <img :src="obj.src">
    </drag>
  </div>
</template>

<script>
import Drag from './drag.vue'
import {
  mapState
} from 'vuex'
export default {
  name: 'Img',
  components:{
    Drag
  },
  data() {
    return {
      obj: {}
    }
  },
  computed: {
    ...mapState([
      'files'
    ])
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
      zIndex: 0
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
