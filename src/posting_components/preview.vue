<template>
  <div>
    <div class="header">
      <div>
        <img src="../assets/jiantoua.png" alt @click="onClickLeft" />
      </div>

      <p>预览</p>
    </div>
    <div class="previewTitle">
      <span>
        {{title}}
      </span>
    </div>
    <div class="preview" v-html="c">{{c}}</div>
  </div>
</template>

<script>
export default {
  name: 'preview',
  data() {
    return {
      c: '',
      title: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.replace({
        path: '/release'
      })
      sessionStorage.removeItem('html')
    }
  },
  created() {
    console.log(JSON.parse(sessionStorage.getItem('html')))
    this.c = JSON.parse(sessionStorage.getItem('html')).content
    this.title = JSON.parse(sessionStorage.getItem('html')).title
  }
  // beforeRouteLeave(to, from, next) {
  //   to.meta.keepAlive = true
  //   console.log(from.name)
  //   sessionStorage.removeItem('html')
  //   next()
  // }
}
</script>

<style  lang="less" >
.px2rem(@name,@px) {
  @{name}: @px / 75 * 1rem;
}
.header {
  width: 100%;
  .px2rem(height, 110);
  border-bottom: 1px solid #f6f6f6;
  display: flex;
  align-items: center;
  div {
    .px2rem(width, 100);
    .px2rem(height, 50);
    display: flex;
    align-items: center;
    img {
      .px2rem(width, 35);
      margin: 0 auto;
    }
  }
  p {
    text-align: center;
    .px2rem(padding-right, 100);
    flex: 1;
    .px2rem(font-size, 33);
  }
}
.preview {
  padding: 12px;
  letter-spacing: 1px;
  .px2rem(font-size, 32);
  line-height: 22px;
  img {
    width: 100%;
  }
}
.previewTitle {
  width: 100%;
  font-size: 20px;
  margin: 0 10px 0 10px;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
}
</style>

