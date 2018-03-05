<template>
  <div>
    <div class="left_top abs"></div>
    <div class="right_top abs"></div>
    <div class="right_bottom abs"></div>
    <div class="left_bottom abs"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
}
</script>

<style>
.abs{
  position: absolute;
  width: 20px;
  height: 4px;
  background: #000000;
}
.abs::after{
  content: "";
  position: absolute;
  width: 20px;
  height: 4px;
  background: #000000;
  transform: rotate(90deg);
}
.left_top{
  top: -6px;
  left: -6px;
}
.left_top::after{
  top: 9px;
  left:-9px;
}
.right_top{
  top: -6px;
  right: -6px;
}
.right_top::after{
  top: 9px;
  left: 9px;
}
.right_bottom{
  bottom: -6px;
  right: -6px;
}
.right_bottom::after{
  top: -9px;
  left: 9px;
}
.left_bottom{
  bottom: -6px;
  left: -6px;
}
.left_bottom::after{
  top: -9px;
  left: -9px;
}

</style>
