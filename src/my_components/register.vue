<template>
  <div class="box">
    <div class="header">
      <div>
        <img src="../assets/fanhui.png" alt @click="tzland" />
      </div>
      <h2>注册</h2>
    </div>
    <div class="zhuce">
      <van-tabs v-model="activeName" line-width="60px" color="#03A9F4" title-active-color="#03A9F4">
        <van-tab title="手机注册" name="a">
          <div class="phone">
            <ol>
              <li>
                <input type="text" placeholder="请输入手机号" v-model="mobile" />
              </li>
              <li class="two">
                <input type="text" placeholder="请输入验证码" v-model="pid" />
                <input
                  class="buttona"
                  :disabled="aaa"
                  @click="yanzheng"
                  type="text"
                  :value="getCode.txte"
                />
              </li>
              <li>
                <input type="password" placeholder="请设置密码" v-model="password" />
              </li>
              <li>
                <input type="password" placeholder="请确认密码" v-model="passwords" />
              </li>
              <li>
                <input type="text" placeholder="邀请码" v-model="code_t" />
              </li>
              <li>
                <van-checkbox v-model="checked" checked-color="#03a9f4" >
                  同意
                   <img
                    slot="icon"
                    slot-scope="props"
                    :src="props.checked ? activeIcon : inactiveIcon"
                  >
                  <span @click="handleagreement">《亿源社区用户协议》</span>
                </van-checkbox>
              </li>
            </ol>
            <div class="button">
              <button :disabled="State==false" :class="{btnBg:State}" @click="next">立即注册</button>
            </div>
          </div>
        </van-tab>
        <van-tab title="邮箱注册" name="b" style>
          <div class="elime">
            <ol>
              <li>
                <input type="text" placeholder="请输入邮箱号" v-model="useremail" />
              </li>
              <li class="two">
                <input type="text" placeholder="请输入验证码" v-model="pids" />
                <input
                  class="buttona"
                  :disabled="bbb"
                  @click="yanzhengs"
                  type="text"
                  :value="getCode.txt"
                />
              </li>
              <li>
                <input type="password" placeholder="请输入密码" v-model="passworddd" />
              </li>
              <li>
                <input type="text" placeholder="邀请码" v-model="code_d" />
              </li>
              <li>
                <van-checkbox v-model="checkeddsd" checked-color="#03a9f4">
                  同意
                   <img
                    slot="icon"
                    slot-scope="props"
                    :src="props.checked ? activeIcon : inactiveIcon"
                  >
                  <span @click="handleagreement">《亿源社区用户协议》</span>
                </van-checkbox>
              </li>
            </ol>
            <div class="button">
              <button :disabled="btnState==false" :class="{btnBg:btnState}" @click="nexttwo">注册邮箱</button>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "index",
  data() {
    return {
      activeName: "a",
      isshow: false,
      aaa: false,
      bbb: false,
      password: "",
      passwords: "",
      checked: false,
      activeIcon: 'http://47.92.85.1/images/blue.png',
      inactiveIcon: 'http://47.92.85.1/images/gray.png',
      checkeddsd: false,
      useremail: "",
      passworddd: "",
      mobile: "", //手机号
      pid: "",
      pids: "", //验证码
      code_t: "",
      code_d: "",
      getCode: {
        txt: "获取验证码",
        txte: "获取验证码"
      }
    };
  },
  computed: {
    State() {
      return (
        this.password !== "" &&
        this.passwords !== "" &&
        this.pid !== "" &&
        this.checked !== false
      );
    },
    btnState() {
      return (
        this.useremail !== "" &&
        this.pids !== "" &&
        this.passworddd !== "" &&
        this.checkeddsd !== false
      );
    }
  },
  methods: {
    tzland() {
      this.$router.push({
        path: "/land"
      });
    },
    handleagreement() {
      this.$router.push({
        path: "/agreement"
      });
    },
    phone() {
      this.isshow = false;
    },
    elime() {
      this.isshow = true;
    },
    yanzhengs() {
      var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (this.useremail == "" || this.useremail == null) {
        this.$toast("请输入邮箱");
      } else if (!reg.test(this.useremail)) {
        this.$toast("请输入正确的邮箱");
      } else {
        this.bbb = true;
        this.getCode.txt = "获取中...";
        var seconds = 60;
        var time = setInterval(() => {
          --seconds;
          this.getCode.txt = seconds + "s";
          if (seconds <= 0) {
            clearInterval(time);
            this.bbb = false;
            this.getCode.txt = "获取验证码";
          }
        }, 1000);
        var datab = { useremail: this.useremail };
        this.$axios({
          method: "post",
          url: this.GLOBAL.baseURL + "/user/gainmail",
          data: datab,
          transformRequest: [
            function(data) {
              console.log(data);
              var ret = "";
              for (var it in data) {
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
          console.log(res);
          if (res.data.result) {
            this.$toast(res.data.msg);
          } else {
            this.$toast(res.data.msg);
          }
        });
      }
    },
    yanzheng() {
      console.log(1);
      if (this.mobile == "" || this.mobile == null) {
        this.$toast("请输入手机号");
      } else if (!/^1[345789]\d{9}$/.test(this.mobile)) {
        this.$toast("请输入正确的手机号");
      } else {
        this.aaa = true;
        this.getCode.txte = "获取中...";
        var seconds = 60;
        var time = setInterval(() => {
          --seconds;
          this.getCode.txte = seconds + "s";
          if (seconds <= 0) {
            clearInterval(time);
            this.aaa = false;
            this.getCode.txte = "获取验证码";
          }
        }, 1000);
        var datae = { mobile: this.mobile };
        this.$axios({
          method: "post",
          url: this.GLOBAL.baseURL + "/user/gainmobile",
          data: datae,
          transformRequest: [
            function(data) {
              console.log(data);
              var ret = "";
              for (var it in data) {
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
            this.$toast(res.data.msg);
          } else {
            this.$toast(res.data.msg);
          }
        });
      }
    },
    // 邮箱注册
    nexttwo() {
      var date = {
        password: this.passworddd,
        usermail: this.useremail,
        pid: this.pids,
        code_t: this.code_d
      };
      var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (this.useremail == "" || this.useremail == null) {
        this.$toast("请输入邮箱");
      } else if (!reg.test(this.useremail)) {
        this.$toast("请输入正确的邮箱");
      } else if (this.pids == "" || this.pids == null) {
        this.$toast("请输入验证码");
      } else if (this.passworddd == "" || this.passworddd == null) {
        this.$toast("请输入密码");
      } else if (this.passworddd.length < 6) {
        this.$toast("密码不能少于6位数");
      } else if (!this.checkeddsd) {
        this.$toast("请阅读选相关协议并勾选");
      } else {
        this.$axios({
          method: "post",
          url: this.GLOBAL.baseURL + "/user/mailregister",
          data: date
        }).then(res => {
          if (res.data.result) {
            this.$toast("注册成功！");
            this.$router.push({
              path: "/land"
            });
          } else {
            this.$toast(res.data.msg);
          }
        });
      }
    },
    // 手机注册
    next() {
      if (this.mobile == "" || this.mobile == null) {
        this.$toast("手机号不能为空");
      } else if (this.mobile.length < 11) {
        this.$toast("请输入正确的手机号");
      } else if (this.pid == "" || this.pid == null) {
        this.$toast("验证码不能为空");
      } else if (this.password == "" || this.password == null) {
        this.$toast("密码不能为空");
      } else if (this.password.length < 6) {
        this.$toast("密码不能少于6位数");
      } else if (this.passwords == "" || this.passwords == null) {
        this.$toast("请确认密码");
      } else if (this.password != this.passwords) {
        this.$toast("两次密码输入不一致");
      } else if (!this.checked) {
        this.$toast("请阅读选相关协议并勾选");
      } else {
        var date = {
          mobile: this.mobile,
          pid: this.pid,
          password: this.password,
          code_t: this.code_t
        };
        this.$axios({
          method: "post",
          url: this.GLOBAL.baseURL + "/user/mobileregister",
          data: date
        }).then(res => {
          console.log(res)
          if (res.data.result) {
            this.$toast("注册成功！");
            this.$router.push({
              path: "/land"
            });
          } else {
            this.$toast(res.data.msg);
          }
        });
      }
    }
  }
};
</script>
<style scoped lang="less">
.px2rem(@name, @px) {
  @{name}: @px / 75 * 1rem;
}

/*button禁用时的背景颜色*/
button {
  background: #cccccc;
}
/*button可用时的背景颜色*/
.btnBg {
  background: #03a9f4;
}
.header {
  width: 100%;
  .px2rem(height, 120);
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
    .px2rem(font-size, 40);
    color: #333333;
    font-weight: 400;
  }
}

.zhuce {
  margin-top: 50px;
  ul {
    .px2rem(height, 100);
    .px2rem(margin-top, 50);
    display: flex;
    align-items: center;
    justify-content: space-between;
    li {
      .px2rem(font-size, 35);
    }
  }
}

.phone {
  .px2rem(width, 530);
  margin: 0 auto;
  ol {
    li:last-child {
      border-bottom: none;
    }
    li {
      .px2rem(height, 80);
      .px2rem(font-size, 28);
      border-bottom: 1px solid #f6f6f6;
      display: flex;
      align-items: flex-end;
      input:first-child {
        width: 70%;
        .px2rem(height, 44);
        border: none;
      }
      .buttona {
        width: 30%;
        .px2rem(height, 44);
        border: none;
        text-align: center;
        background: #fff;
        border-radius: 3px;
        color: #03a9f4;
        .px2rem(font-size, 24);
      }
    }
    span {
      color: #03a9f4;
    }
  }
}

.elime {
  .px2rem(width, 540);
  margin: 0 auto;
  ol {
    li:last-child {
      border-bottom: none;
    }
    li {
      .px2rem(font-size, 28);
      .px2rem(height, 80);
      border-bottom: 1px solid #f6f6f6;
      display: flex;
      align-items: flex-end;
      input:first-child {
        width: 70%;
        .px2rem(height, 44);
        border: none;
      }
      .buttona {
        width: 30%;
        .px2rem(height, 44);
        border: none;
        text-align: center;
        background: #fff;
        border-radius: 3px;
        color: #03a9f4;
        .px2rem(font-size, 24);
      }
    }
    span {
      color: #03a9f4;
    }
  }
}

.button {
  .px2rem(width, 500);
  margin: 0 auto;
  button {
    width: 100%;
    .px2rem(height, 80);
    .px2rem(margin-top, 150);
    border: none;
    color: #fff;
    border-radius: 2px;
    .px2rem(font-size, 30);
  }
}
.van-checkbox{
  img{
    width: 20px;
  }
}
</style>
<style lang="less">
.van-tabs__wrap /deep/.van-tab--active {
  color: #03a9f4;
  font-size: 18px;
}
.van-tabs__nav /deep/ .van-ellipsis {
  font-size: 18px;
}
.van-tabs__nav /deep/.van-tabs__line {
  background-color: #fff;
}
</style>