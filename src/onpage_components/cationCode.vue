<template>
  <div class="tioncode">
    <div class="header">
      <div>
        <img src="../assets/fanhui.png" alt @click="$router.back()" />
      </div>
      <h2>输入短信验证码</h2>
    </div>
    <ul class="cationnav">
      <li>
        <p>已发送短信验证码至+86 {{phone}}</p>
      </li>
      <li>
        <input type="text" maxlength="6" v-model="code"/>
      </li>
      <div class="Countdown">
        <input
          class="buttona"
          :disabled="disabled"
          type="text"
          :value="getCode.txt"
          @click="yanzhengs"
        />
      </div>
      <li>
        <div style="background: #e5e5e5;" ref="abc" class="botom"></div>
        <div style="background: #e5e5e5;" ref="abcd" class="botom"></div>
        <div style="background: #e5e5e5;" ref="abce" class="botom"></div>
        <div style="background: #e5e5e5;" ref="abcf" class="botom"></div>
        <div style="background: #e5e5e5;" ref="abcg" class="botom"></div>
        <div style="background: #e5e5e5;" ref="abch" class="botom"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "cationCode",
  data() {
    return {
      getCode: {
        txt: "获取验证码"
      },
      disabled: false,
      handlastinfo: "",
      phone: "",
      code: "",
    };
  },
   watch:{
   code: function(text) {
     if(text.length == 6){
       this.handleupdatePhone()
     }else if(text.length == 1){
        this.$refs.abc.style.background = "#03A9F4"
     }else if(text.length == 2){
        this.$refs.abcd.style.background = "#03A9F4"
     }else if(text.length == 3){
        this.$refs.abce.style.background = "#03A9F4"
     }else if(text.length == 4){
        this.$refs.abcf.style.background = "#03A9F4"
     }else if(text.length == 5){
        this.$refs.abcg.style.background = "#03A9F4"
     }
   }
  },
  methods: {
    endyanzhengs: function() {
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
    },
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
      this.$axios({
        method: "get",
        url: this.GLOBAL.baseURL + "/user/gainOldPhone",
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
      }).then(function(res) {
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
        console.log(res)
      });
    },
    //个人信息
    async cationinfo() {
      var id = { id: localStorage.getItem("userid") };
      const res = await axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/user/info",
        data: id
      });
      this.handlastinfo = res.data.pojo.mobile;
      // console.log(this.handlastinfo);
    },
    getRouterData() {
      this.phone = this.$route.params.phone;
      // console.log(this.phone);
    },
    handleupdatePhone(){
      var datae = { phone: this.phone,code: this.code };
      this.$axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/user/updatePhone",
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
            this.$toast(res.data.msg);
            if (res.data.result == true) {
              this.$router.push({
               path:'/Successful',
              });
            }
          }.bind(this)
        )
        .catch(function(error) {
          // console.log(error);
        });
    }
  },
  created() {
    this.cationinfo();
    this.getRouterData();
    this.handleupdatePhone()
    this.endyanzhengs()
  },
  mounted () {
   　　 console.log(this.$refs.abc.style.background)
        // this.$refs.abc.style.background = "#000"
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
    .px2rem(font-size, 36);
    font-family: SourceHanSansCN-Normal, SourceHanSansCN;
    font-weight: 400;
  }
}
.cationnav{
  padding-left: 20px;
}
.tioncode {
  ul {
    li:first-child {
      .px2rem(margin-top, 86);
      p {
        text-align: center;
        .px2rem(font-size, 32);
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
      }
    }
    li:nth-child(2) {
      .px2rem(margin-top, 86);
      text-align: center;
      input {
        border: 0px;
        width: 78%;
        letter-spacing: 45px;
        .px2rem(font-size, 32);
        padding-left: 32px;
      }
    }
    li:last-child {
      width: 90%;
      height: 10px;
      margin: 0 auto;
      .botom {
        .px2rem(width, 70);
        height: 1px;
        background: #e5e5e5;
        float: left;
        margin-left: 18px;
      }
    }
  }
}
.Countdown {
  position: relative;
  input {
    .px2rem(width, 150);
    position: absolute;
    .px2rem(margin-top, 26);
    .px2rem(right, 112);
    border: 0px;
    .px2rem(font-size, 28);
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    background: #fff;
    text-align: right;
  }
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
    background: #03a9f4;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
}
</style>