<template>
  <div>
    <div class="header">
      <div>
        <img src="../assets/fanhui.png" alt @click="$router.back()" />
      </div>
      <h2>填写验证码</h2>
    </div>
    <div class="fillin">
      <p>
        我们已经发送了
        <span>验证码</span>到你那的手机：
      </p>
      <h2>{{handleinfo}}</h2>
      <div class="elime">
        <ol>
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
              @click="yanzhengs"
              type="text"
              :value="getCode.txt"
            />
          </li>
        </ol>
        <div class="button">
          <button :disabled="State==false" :class="{btnBg:State}" @click="handlefillin">下一步</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "fillin",
  data() {
    return {
      code: "",
      getCode: {
        txt: "获取验证码"
      },
      disabled: false,
      handleinfo: {},
      handmodiinfos:{}
    };
  },
  computed: {
    State() {
      return this.code !== "";
    }
  },
  methods: {
    handlefillin() {
      var datae = { pushmail: this.handleinfo,code: this.code };
      this.$axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/user/pwdsetreceive",
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
      }).then(function (res) {
        console.log(res)
        localStorage.setItem('gg',res.data.pojo)
        if(res.data.result== true){
          this.$router.push('/Lastsetup');
        }
      }.bind(this)).catch(function (error) { 
        console.log(error);
      });
    },
    // 获取验证码
    yanzhengs: function() {
      var datae = { pushmail: localStorage.getItem('mobidlessa') };
      this.$axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/user/pwdsetsend",
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
      }).then(res => {
        console.log(res)
          this.$toast(res.data.msg);
            if (res.data.result == true) {
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
        }
      })
    },
    //个人信息
    async leinfo() {
      var id = { id: localStorage.getItem("userid") };
      const res = await axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/user/info",
        data: id
      });
      
      this.handleinfo = res.data.pojo.mobile;
    },
    getmobild(){
      this.handmodiinfos = this.$router.params.handmodiinfo
      console.log(this.handmodiinfos)
    }
  },
  created() {
    this.leinfo();
    this.yanzhengs()
    this.getmobild()
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
.fillin {
  p {
    text-align: center;
    .px2rem(font-size, 28);
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    span {
      .px2rem(font-size, 28);
      color: #03a9f4;
    }
  }
  h2 {
    .px2rem(margin-top, 40);
    text-align: center;
  }
}
.elime {
  .px2rem(width, 550);
  margin: 0 auto;
  .px2rem(margin-top, 100);
  span {
    .px2rem(font-size, 28);
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
        .px2rem(height, 80);
        border: none;
        .px2rem(font-size, 30);
      }
      .buttona {
        width: 30%;
        .px2rem(height, 44);
        border: none;
        text-align: center;
        background: #fff;
        border-radius: 3px;
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
    border-radius: 2px;
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