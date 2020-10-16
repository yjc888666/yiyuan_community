<template>
  <div class="setup">
    <div class="header">
      <div>
        <img src="../assets/fanhui.png" alt @click="fanhui" />
      </div>
      <h2>设置</h2>
    </div>
    <div class="setupone">
      <ul>
        <li @click="handleediting">
          <p>资料编辑</p>
          <span>
            <img src="../assets/youjiantou.png" alt />
          </span>
        </li>
        <li @click="handlesetting">
          <p>账号安全设置</p>
          <span>
            <img src="../assets/youjiantou.png" alt />
          </span>
        </li>
      </ul>
    </div>
    <div class="setuptwo">
      <ul>
        <li>
          <p>检查版本</p>
          <span>
            <i>1.0.0</i>
          </span>
        </li>
        <li>
          <p>关于亿源社区</p>
          <span>
            <img src="../assets/youjiantou.png" alt />
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "setup",
  data() {
    return {};
  },
  methods: {
    fanhui() {
      this.$router.push({
        path: "/my"
      });
    },
    handleediting(){
      this.$router.push({
        path: "/personalData"
      });
    },
    handlesetting(){
       this.$router.push({
        path: "/personal"
      });
    },
      async handlestatest() {
      const res = await axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/message/signList"
      });
      if (res.data.msg == "用户未登录") {
         this.$router.push({
            path: "/land"
          });
      }
    },
  },
  created(){
    this.handlestatest()
  }
};
</script>

<style scoped lang="less">
.px2rem(@name,@px) {
  @{name}: @px / 75 * 1rem;
}
.setup {
  background: #f4f5f7;
  height: 810px;
}
.header {
  width: 100%;
  .px2rem(height, 110);
  background: #fff;
  display: flex;
  align-items: center;
   border-bottom: 1px solid #f6f6f6;
  box-shadow: 0px 0px 5px 1px #f6f6f6;
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
.setupone {
  margin-top: 8px;
  background: #fff;
  li {
    height: 56px;
    background: #fff;
    line-height: 56px;
    border-bottom: 1px solid #f3f3f3;
    p {
      .px2rem(font-size, 28);
    .px2rem(margin-left, 32);
      float: left;
      font-family: SourceHanSansCN-Normal, SourceHanSansCN;
    font-weight: 400;
    }
    span {
    .px2rem(margin-right, 32);
      img {
        .px2rem(width, 32);
        .px2rem(margin-top, 32);
    .px2rem(margin-right, 32);
        .px2rem(height, 32);
        float: right;
      }
    }
  }
  :last-child {
    border-bottom: 0px;
  }
}
.setuptwo {
  margin-top: 8px;
  background: #fff;
  li {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #f3f3f3;
    p {
      .px2rem(font-size, 28);
    .px2rem(margin-left, 32);
      float: left;
    }
    span {
    .px2rem(margin-right, 32);
      img {
        .px2rem(width, 32);
    .px2rem(margin-right, 32);
        .px2rem(margin-top, 32);
        .px2rem(height, 32);
        float: right;
      }
    }
    i{
    .px2rem(margin-right, 32);
      font-style:normal;
      float: right;
      .px2rem(font-size, 28);
      color: #848484;
    }
  }
  :last-child {
    border-bottom: 0px;
  }
}
</style>
<style>
.van-switch {
  float: right;
  margin-top: 10px;
}
</style>