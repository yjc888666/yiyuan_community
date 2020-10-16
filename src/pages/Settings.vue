<template>
  <div>
    <!-- 导航头部 -->
    <div class="header">
      <div>
        <img src="../assets/jiantoua.png" alt @click="handleback" />
      </div>
      <p>绑定手机号</p>
    </div>
    <div class="elime">
      <ol>
        <li>
          <input type="text" placeholder="请输入手机号" onfocus="this.placeholder=''" onblur="this.placeholder='请输入手机号'" v-model="mobile" />
        </li>
        <li class="two">
          <input type="text" placeholder="请输入验证码" onfocus="this.placeholder=''" onblur="this.placeholder='请输入验证码'" v-model="code" />
          <input class="buttona" :disabled="disabled" type="text" :value="getCode.txt" @click="yanzhengs" />
        </li>
      </ol>
      <div class="weixinbutton">
        <button :disabled="State==false" :class="{btnBg:State}" @click="handlestying">立即绑定</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Settings',
  data() {
    return {
      mobile: '',
      code: '',
      getCode: {
        txt: '获取验证码'
      },
      disabled: false
    }
  },
  computed: {
    State() {
      return this.mobile !== '' && this.code !== ''
    }
  },
  methods: {
    handleback() {
      window.localStorage.clear()
      this.$router.replace({
        path: '/land'
      })
    },
    yanzhengs: function() {
      this.disabled = true
      this.getCode.txt = '获取中...'
      let seconds = 60
      let self = this
      let time = setInterval(function() {
        --seconds
        self.getCode.txt = seconds + 's'
        if (seconds <= 0) {
          clearInterval(time)
          self.disabled = false
          self.getCode.txt = '获取验证码'
        }
      }, 1000)
      var datae = { mobile: this.mobile }
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/wxLog/weChatMobile',
        data: datae,
        transformRequest: [
          function(data) {
            console.log(data)
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }
        ],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        this.$toast(res.data.msg)
      })
    },
    handlestying() {
      if (this.mobile == '' || this.mobile == null) {
        this.$toast('请输入手机号')
      } else if (this.code == '' || this.code == null) {
        this.$toast('请输入验证码')
      } else if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
      } else {
        var datae = { mobile: this.mobile, code: this.code }
        this.$axios({
          method: 'post',
          url: this.GLOBAL.baseURL + '/wxLog/binding',
          data: datae,
          transformRequest: [
            function(data) {
              console.log(data)
              let ret = ''
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }
          ],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(res => {
            console.log(res)
            if (res.data.msg == '绑定成功') {
              localStorage.setItem('arr', JSON.stringify(res.data.pojo))
              localStorage.setItem('token', res.data.pojo.sessionid)
              localStorage.setItem('openid', res.data.pojo.openid)
              localStorage.setItem('weixinsj', res.data.pojo.mobile)
              this.$toast(res.data.msg)
              this.$router.replace({
                path: '/land'
              })
            } else {
              this.$toast(res.data.msg)
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      }
    }
  }
}
</script>

<style scoped lang="less">
.px2rem(@name,@px) {
  @{name}: @px / 75 * 1rem;
}
.header {
  width: 100%;
  .px2rem(height, 110);
  display: flex;
  align-items: center;
  background: #fff;
  // .px2rem(padding-bottom, 30);
  border-bottom: 1px solid #f6f6f6;
  div {
    .px2rem(width, 84);
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
    .px2rem(font-size, 38);
  }
}
.elime {
  .px2rem(width, 550);
  margin: 0 auto;
  .px2rem(margin-top, 60);
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
        .px2rem(height, 60);
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
.weixinbutton {
  .px2rem(width, 500);
  margin: 0 auto;
  button {
    width: 100%;
    .px2rem(height, 80);
    .px2rem(margin-top, 100);
    .px2rem(margin-bottom, 80);
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