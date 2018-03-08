<template>
  <div :style="{ width: trans.width + 'px', zIndex: this.trans.zIndex, height: trans.height + 'px', top: trans.top + 'px', left: trans.left + 'px'}" class="img-warp"  >
    <transform>
      <img :src="trans.src">
    </transform>
  </div>
</template>

<script>
import transform from './transform.vue'
import {
  mapState
} from 'vuex'
export default {
  name: 'Img',
  components:{
    transform
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState([
      'trans'
    ])
  },
  props: {
    file: File
  },
  methods: {
  },
  created() {

    // console.log(this.sx, this.sy)
    let reader = new FileReader()
    reader.readAsDataURL(this.file)
    reader.onload = e => {
      let dom = new Image()
      let src = e.target.result
      dom.src = src
      this.trans.src = src
      dom.onload = () => {
        this.trans.width = dom.width
        this.trans.height = dom.height
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
