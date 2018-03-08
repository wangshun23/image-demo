<template>
<div id="app" @dragenter="_onDragEnter" @dragover="_onDragOver" @dragleave="_onDragLeave" @drop="_onDrop">
  <stage>
    <Img v-for="file in filelist" :file="file"></Img>
  </stage>
</div>
</template>

<script>
import Img from './components/img'
import Stage from './components/stage'

export default {
  name: 'App',
  components: {
    Img,
    Stage
  },
  data() {
    return {
      filelist: []
    }
  },
  methods: {

    _onDragEnter(e) {
      const imgMoveState = e.dataTransfer.getData("imgMove")
      if(imgMoveState) return
      console.log('释放鼠标立即上传.......')
    },
    _onDragOver(e) {
      e.preventDefault()
    },
    _onDragLeave(e) {
      const imgMoveState = e.dataTransfer.getData("imgMove")
      if(imgMoveState) return
      console.log('将文件拖拽至此区域，即可上传......')
    },
    _onDrop(e) {
      e.preventDefault()
      const imgMoveState = e.dataTransfer.getData("imgMove")
      if(imgMoveState) return
      var files = e.dataTransfer.files
      var len = files.length;
      for (var i = 0; i < len; i++) {
        this.filelist.push(files[i])
      }
    }

  }
}
</script>

<style>
html,
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  padding: 0;
  margin: 0;
}

#preview {

}
</style>
