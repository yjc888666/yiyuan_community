<template>
  <div class="Tying">
    <div class="header">
      <div>
        <img src="../assets/fanhui.png" alt @click="$router.back()" />
      </div>
      <h2>注销账号</h2>
    </div>
    <div class="elime">
      <ol>
        <li>
        <div class="field-div">
          <span>{{handmodiinfo}}</span>
        </div>
        </li>
        <li class="two">
          <input
            type="text"
            placeholder="请输入验证码"
            onfocus="this.placeholder=''"
            onblur="this.placeholder='请输入验证码'"
            v-model="code"
          />
          <input
            class="buttona"
            :disabled="disabled"
            type="text"
            :value="getCode.txt"
            @click="yanzhengs"
          />
        </li>
      </ol>
      <div class="button">
        <button :disabled="State==false" :class="{btnBg:State}" @click="handlestying">注销</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Tying",
  data() {
    return {
      code: "",
      getCode: {
        txt: "获取验证码"
      },
      disabled: false,
      handmodiinfo:''
    };
  },
  computed: {
    State() {
      return this.code !== "";
    }
  },
  methods: {
    // 接收验证码
    yanzhengs: function() {
      this.disabled = true;
      this.getCode.txt = "获取中...";
      let seconds = 60;
      let self = this;
      let time = setInterval(function() {
        --seconds;
        self.getCode.txt = seconds + "s";
        if (seconds <= 0) {
          clearInterval(time);
          self.disabled = false;
          self.getCode.txt = "获取验证码";
        }
      }, 1000);
      var datae = { mobile: localStorage.getItem('weixinmobile') };
      this.$axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/user/phonelandsend",
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
      }).then(function(res) {
      });
    },
    // 注销
    handlestying() {
     if (this.code == "" || this.code == null) {
        this.$toast("请输入验证码");
      }else {
        var datae = { mobile: localStorage.getItem('weixinmobile'), code: this.code };
        this.$axios({
          method: "post",
          url: this.GLOBAL.baseURL + "/user/logout",
          data: datae,
          transformRequest: [
            function(data) {
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
              // this.$toast("注销成功");
          this.$toast(res.data.msg);
              if (res.data.result == true) {
                localStorage.clear();
                this.$router.push({
                  path: "/langlogin"
                });
              }
            }.bind(this)
          )
          .catch(function(error) {
            // console.log(error);
          });
      }
    },
      // 个人信息
    async modiinfo() {
      var id = { id: localStorage.getItem("userid") };
      const res = await axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/user/info",
        data: id
      });
      this.handmodiinfo = res.data.pojo.mobile;
      // console.log(this.handmodiinfo);
    }
  },
  created() {
    this.modiinfo();
  }
};
</script>

<style  scoped lang="less">
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
.field-div {
  .px2rem(margin-left, 30);
  span {
    .px2rem(font-size, 32);
    .px2rem(line-height, 60);
    color: #999999;
    margin-bottom: 5px;
  }
}
.elime {
  .px2rem(width, 550);
  margin: 0 auto;
  .px2rem(margin-top, 100);
  span {
    .px2rem(font-size, 32);
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: rgba(132, 132, 132, 1);
  }
  ol {
    li {
      .px2rem(height, 90);
      border-bottom: 1px solid #f6f6f6;
      display: flex;
      align-items: flex-end;
      input:first-child {
        width: 70%;
        .px2rem(height, 50);
        border: none;
  .px2rem(margin-left, 30);
        .px2rem(font-size, 30);
      }
      .buttona {
        width: 30%;
        .px2rem(height, 44);
        border: none;
        text-align: center;
        background: #fff;
        border-radius: 4px;
        color: #03a9f4;
        .px2rem(font-size, 25);
        
      }
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
.button {
  .px2rem(width, 500);
  margin: 0 auto;
  button {
    width: 100%;
    .px2rem(height, 80);
    .px2rem(margin-top, 100);
    border: none;
    // background: #03a9f4;
    .px2rem(font-size, 36);
    color: #fff;
    border-radius: 4px;
  }
  p {
    .px2rem(margin-top, 20);
    .px2rem(font-size, 24);
    text-align: center;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
}
</style>