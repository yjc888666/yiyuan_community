<template>
  <div>
    <div class="header">
      <div>
        <img src="../assets/fanhui.png" alt @click="$router.back()" />
      </div>
      <h2>更换手机号码</h2>
    </div>
    <div class="heredinput">
      <van-cell-group>
        <van-field
          label="中国大陆"
          v-model="phone"
          onfocus="this.placeholder=''"
          onblur="this.placeholder='请输入新手机号'"
          placeholder="请输入新手机号"
          clearable
        />
      </van-cell-group>
    </div>
    <div class="healebuttom">
      <button :disabled="State==false" :class="{btnBg:State}" @click="hanelecationCode">一键验证</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "replace",
  data() {
    return {
      phone: ""
    };
  },
  computed: {
    State() {
      return this.phone !== "";
    }
  },
  methods: {
     hanelecationCode() {
      var datae = { phone: this.phone };
      this.$axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/user/gainphone",
        data: datae,
        transformRequest: [
          function(data) {
            console.log(data);
            let ret = "";
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            return ret;
          }
        ],
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(
          function(res) {
            console.log(res);
            this.$toast(res.data.msg);
            if (res.data.result == true) {
              this.$router.push({
                name: `cationCode`,
                params: {
                  phone: this.phone
                }
              });
            }
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    }
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
.van-cell-group {
  width: 80%;
  margin: 0 auto;
  border-bottom: 1px solid #e5e5e5;
}
.heredinput {
  .px2rem(margin-top, 72);
}
/*button禁用时的背景颜色*/
button {
  background: #81d4fa;
}
/*button可用时的背景颜色*/
.btnBg {
  background: #03a9f4;
}
.healebuttom {
  display: flex;
  justify-content: center;
  button {
    .px2rem(margin-top, 100);
    border: 0px;
    width: 272px;
    height: 36px;
    border-radius: 20px;
    font-size: 16px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
}
.van-cell__value /deep/ .van-field__body{
  font-size: 16px !important;
}
</style>
<style>
.van-field__label  {
  font-size: 16px !important;
}
.van-cell__value{
  font-size: 16px;
}
</style>