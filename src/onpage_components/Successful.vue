<template>
  <div>
    <div class="header">
      <div>
        <img src="../assets/fanhui.png" alt @click="$router.back()" />
      </div>
      <h2>更换手机号码</h2>
    </div>
    <div class="Successful">
      <img src="../assets/Success.png" alt />
    </div>
    <div class="naisi">
      <h2>恭喜您成功更换手机号！</h2>
      <p>
        <span>{{count}}s</span>后自动返回，
        <i @click="handlesuccess">立即返回</i>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Successful",
  data() {
    return {
    count:"",//倒计时
    };
  },
  methods: {
    handlesuccess(){
      this.$router.push({
         path:'/setup'
      })
    },
    goGrdoupRecor(){
    const TIME_COUNT = 4;
    if(!this.timer){
      this.count = TIME_COUNT;
      this.show = false;
      this.timer = setInterval(()=>{
        if(this.count > 0 && this.count <= TIME_COUNT){
          this.count--;
        }else{
          this.show = true;
          clearInterval(this.timer);
          this.timer = null;
          //跳转的页面写在此处
          this.$router.push({
            path:"/setup"
          })
        }
      },1000)
    }
  }
  },
  created() {
    this.goGrdoupRecor();
  }
};
</script>

<style scoped lang="less">
.px2rem(@name,@px) {
  @{name}: @px / 75 * 1rem;
}
.header {
  width: 100%;
  .px2rem(height, 110);
  background: #fff;
  display: flex;
  align-items: center;
   border-bottom: 1px solid #f6f6f6;
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
  h2 {
    text-align: center;
    .px2rem(padding-right, 100);
    flex: 1;
    .px2rem(font-size, 36);
    font-family: SourceHanSansCN-Normal, SourceHanSansCN;
    font-weight: 400;
  }
}
.Successful {
  .px2rem(margin-top, 120);
  display: flex;
  justify-content: center;
  img {
    width: 100px;
    height: 100px;
  }
}
.naisi {
  h2 {
    .px2rem(font-size, 40);
    .px2rem(margin-top, 80);
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    text-align: center;
  }
  p {
    .px2rem(margin-top, 12);
    .px2rem(font-size, 28);
    text-align: center;
    color: #b1b1b1;
    span {
      color: #03a9f4;
    }
    i {
      .px2rem(font-size, 32);
      color: #03a9f4;
      font-style: normal;
    }
  }
}
</style>