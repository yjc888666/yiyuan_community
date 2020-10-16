<template>
  <div>
    <div class="header">
      <div>
        <img src="../assets/fanhui.png" alt @click="$router.back()" />
      </div>
      <h2>验证手机号</h2>
    </div>
    <div class="Verification">
      <ul>
        <li>
          <p>
            您的账号当前处于安全环境
            <br />修改手机号前先进行安全验证
          </p>
        </li>
        <li>
          <span>+86 {{handlejilao}}</span>
        </li>
        <li @click="handlecation">
          <button>修改手机号</button>
        </li>
        <!-- <li>切换账号</li> -->
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Verification",
  data() {
    return {
      handlastinfo:"",
      handlejilao:''
    };
  },
  methods: {
    handlecation() {
      this.$router.push({
        path: "/replacetion"
      });
    },
    //个人信息
    async verinfo() {
      var id = { id: localStorage.getItem("userid") };
      const res = await axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/user/info",
        data: id
      });
      this.handlastinfo = res.data.pojo.mobile;
       this.handlejilao = this.handlastinfo.substr(0, 3) + "****" + this.handlastinfo.substr(7);
    },
  },
  created(){
    this.verinfo();
  }
};
</script>

<style scoped lang="less">
.px2rem(@name, @px) {
  @{name}: @px / 75 * 1rem;
}
.header {
  width: 99%;
  .px2rem(height, 110);
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f6f6f6;
  // box-shadow: 0px 0px 5px 1px #f6f6f6;
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
    .px2rem(font-size, 40);
    font-family: SourceHanSansCN-Normal, SourceHanSansCN;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
  }
}
.Verification {
  li:first-child {
    .px2rem(margin-top, 80);
    color: #333333;
    text-align: center;
    .px2rem(font-size, 32);
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
  }
  li:nth-child(2) {
    .px2rem(margin-top, 60);
    font-family: Roboto-Regular, Roboto;
    font-weight: 400;
    .px2rem(font-size, 32);
    color: rgba(51, 51, 51, 1);
    text-align: center;
  }
  li:nth-child(3) {
    .px2rem(width, 500);
    margin: 0 auto;
    button {
      .px2rem(margin-top, 48);
      .px2rem(width, 500);
      .px2rem(height, 72);
      border: 0px;
      .px2rem(font-size, 32);
      border-radius: 20px;
      background: rgba(3, 169, 244, 1);
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
  li:nth-child(4) {
    .px2rem(margin-top, 30);
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    .px2rem(font-size, 28);
    text-align: center;
  }
}
</style>