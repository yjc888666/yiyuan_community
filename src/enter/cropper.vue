<template>
    <div class="cropper">
        <div class="box">
            <vueCropper ref="Cropper">
            </vueCropper>
        </div>
    </div>
</template>
<script>
export default {
    name: 'cropper',
    methods:{
    },
}
</script>

<style scoped lang="less">
.px2rem(@name,@px){
    @{name}:@px / 75 * 1rem;
  }
  .cropper{
      width: 100%;
      height: 100vh;
      background: rgba(0, 0, 0, 0.7);
  }
  .box{
      width: 100%;
      height: 70%;
      background: #fff;

  }
</style>
