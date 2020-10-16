<template>
  <div id="zhanghao">
    <div class="header">
      <div>
        <img src="../assets/fanhui.png" alt @click="fanhui" />
      </div>
      <h2>输入账号</h2>
    </div>
    <ul>
      <li>
        <input type="text" placeholder="请输入账号" v-model="shoujiyouxiang" />
      </li>
      <li>
        <button :disabled="State==false" :class="{btnBg:State}" @click="queding">确定</button>
      </li>
    </ul>

    <van-popup v-model="isshow">
      <div class="div" style="width:312px">
        <slide-verify
          :l="42"
          :r="10"
          :w="310"
          :h="155"
          @success="onSuccess"
          @fail="onFail"
          @refresh="onRefresh"
          :slider-text="text"
        ></slide-verify>
      </div>
    </van-popup>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "zhanghao",
  data() {
    return {
      text: "右滑验证",
      isshow: false,
      shoujiyouxiang: "",
      disabled: false
    };
  },
  computed: {
    State() {
      return this.shoujiyouxiang !== "";
    }
  },
  methods: {
    fanhui() {
      this.$router.push({
        path: "/land"
      });
    },
    queding() {
      localStorage.setItem("shoujihao", this.shoujiyouxiang);
      this.$axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/user/pwdsetsend",
        data: {
          pushmail: this.shoujiyouxiang
        },
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
      }).then(res => {
        if (res.data.result) {
          this.isshow = true;
        } else {
          this.$toast(res.data.msg);
        }
      });
    },
    onSuccess() {
      this.isshow = false;
      this.$toast("验证成功");
      this.$router.push({
        path: "/shenfen"
      });
    },
    onFail() {
      this.$toast("验证失败");
    },
    onRefresh() {
      this.msg = "";
    }
  }
};
</script>
<style scoped lang="less">
.px2rem(@name, @px) {
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
  h2 {
    text-align: center;
    .px2rem(padding-right, 100);
    flex: 1;
    .px2rem(font-size, 35);
    font-weight: 400;
  }
}
ul {
  width: 70%;
  margin: 0 auto;
  li:last-child {
    border: none;
  }
  li {
    .px2rem(margin-top, 30);
    border-bottom: 1px solid #f3f3f3;
    display: flex;
    align-items: center;
    input {
      width: 100%;
      .px2rem(height, 50);
      border: none;
      .px2rem(font-size, 28);
      background: #fff;
    }
    button {
    .px2rem(margin-top, 40);
      width: 100%;
      border: none;
    //   background: #03a9f4;
      .px2rem(height, 80);
      border-radius: 2px;
      color: #fff;
      .px2rem(font-size, 30);
    }
  }
}
/*button禁用时的背景颜色*/
button {
  background: #cccccc;
}
/*button可用时的背景颜色*/
.btnBg {
  background: #03a9f4;
}
</style>