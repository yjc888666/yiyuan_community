<template>
  <div id="box">
    <div class="header">
      <div>
        <img src="../assets/fanhui.png" alt @click="tzzhuce" />
      </div>
      <h2>登录</h2>
    </div>
    <div class="box1">
      <van-tabs v-model="activeName" line-width="60px" color="#03A9F4" title-active-color="#03A9F4">
        <van-tab title="账号登录" name="a">
          <div class="phone">
            <ol>
              <li>
                <input type="text" placeholder="请输入邮箱/手机号" onfocus="this.placeholder=''" onblur="this.placeholder='请输入邮箱/手机号'" v-model="usermail" />
              </li>
              <li>
                <input type="password" placeholder="请确认密码" onfocus="this.placeholder=''" onblur="this.placeholder='请确认密码'" v-model="password" />
              </li>
              <li>
                <p>
                  <span @click="zhaohui">忘记密码?</span> |
                  <span @click="zhuce">注册账号</span>
                </p>
              </li>
            </ol>
            <div class="button">
              <button :disabled="btnState==false" :class="{btnBg:btnState}" @click="loginy">登录</button>
            </div>
          </div>
        </van-tab>
        <van-tab title="手机登录" name="b" style>
          <div class="elime">
            <ol>
              <li>
                <input type="text" placeholder="请输入手机号" onfocus="this.placeholder=''" onblur="this.placeholder='请输入手机号'" v-model="mobile" />
              </li>
              <li class="two">
                <input type="text" placeholder="请输入验证码" onfocus="this.placeholder=''" onblur="this.placeholder='请输入验证码'" v-model="codes" />
                <input class="buttona" :disabled="disabled" @click="yanzhengs" type="text" :value="getCode.txt" />
              </li>
            </ol>
            <div class="button">
              <button :disabled="State==false" :class="{btnBg:State}" @click="login">登录</button>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="lang-weixin">
      <h1>其他登录方式</h1>
      <ul>
        <li></li>
        <li @click="getCodes">
          <img src="../assets/lang-weixin.png" alt />
        </li>
        <li></li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import '../../static/flexible.debug'
import '../../static/flexible_css.debug'
export default {
  name: 'lodin',
  data() {
    return {
      activeName: 'a',
      mobile: '',
      code: '',
      disabled: false,
      isshow: false,
      usermail: '',
      password: '',
      code: '',
      codes: '',
      getCode: {
        txt: '获取验证码'
      }
    }
  },
  computed: {
    btnState() {
      return this.usermail !== '' && this.password !== ''
    },
    State() {
      return this.mobile !== '' && this.codes !== ''
    }
  },
  methods: {
    zhaohui() {
      this.$router.push({
        path: '/zhanghao'
      })
    },
    tzzhuce() {
      this.$router.push({
        path: '/my'
      })
    },
    zhuce() {
      this.$router.push({
        path: '/register'
      })
    },
    phone() {
      this.isshow = false
    },
    elime() {
      this.isshow = true
    },
    yanzhengs: function() {
      if (this.mobile == '' || this.mobile == null) {
        this.$toast('请输入手机号')
      } else if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
      } else {
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
          url: this.GLOBAL.baseURL + '/user/phonelandsend',
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
        }).then(function(res) {
          console.log(res)
        })
      }
    },
    loginy: function() {
      if (this.usermail == '' || this.usermail == null) {
        this.$toast('请输入用户账号')
      } else if (this.password == '' || this.password == null) {
        this.$toast('请输入用户密码')
      } else {
        this.$axios({
          method: 'post',
          url: this.GLOBAL.baseURL + '/user/landbymailphone',
          data: {
            usermail: this.usermail,
            password: this.password
          }
        }).then(res => {
          console.log(res)
          if (res.data.result) {
            this.$toast('登录成功')
            this.$store.commit('zhuangtai', res.data.result)
            localStorage.setItem('token', res.data.pojo.sessionid)
            this.$store.commit('name', res.data.pojo.name)
            localStorage.setItem('zhuangtai', res.data.result)
            localStorage.setItem('name', res.data.pojo.name)
            localStorage.setItem('userhead', res.data.pojo.userhead)
            localStorage.setItem('userid', res.data.pojo.id)
            if (sessionStorage.getItem('redicet_url')) {
              this.$router.push({
                path: sessionStorage.getItem('redicet_url')
              })
            } else {
              this.$router.push({
                path: '/my'
              })
            }
          } else {
            this.$toast(res.data.msg)
          }
          this.$axios({
            method: 'post',
            url: this.GLOBAL.baseURL + '/settled/status'
          }).then(res => {
            console.log(res)
            localStorage.setItem('renzheng', res.data.msg)
          })
        })
      }
    },
    zhucee: function() {
      this.$router.replace({
        path: '/zhucejindu'
      })
    },
    login() {
      if (this.mobile == '' || this.mobile == null) {
        this.$toast('请输入手机号')
      } else if (this.codes == '' || this.codes == null) {
        this.$toast('请输入验证码')
      } else if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
      } else {
        this.$axios({
          method: 'post',
          url: this.GLOBAL.baseURL + '/user/getlandphone',
          data: {
            mobile: this.mobile,
            code: this.codes
          },
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
          if (res.data.result) {
            this.$toast('登录成功')
            this.$store.commit('zhuangtai', res.data.result)
            localStorage.setItem('token', res.data.pojo.sessionid)
            this.$store.commit('name', res.data.pojo.name)
            localStorage.setItem('zhuangtai', res.data.result)
            localStorage.setItem('name', res.data.pojo.name)
            localStorage.setItem('userhead', res.data.pojo.userhead)
            localStorage.setItem('userid', res.data.pojo.id)
            if (sessionStorage.getItem('redicet_url')) {
              this.$router.push({
                path: sessionStorage.getItem('redicet_url')
              })
            } else {
              this.$router.push({
                path: '/my'
              })
            }
          } else {
            this.$toast(res.data.msg)
          }
        })
      }
    },
    // 授权登录
    getCodes() {
      var local = window.location.href // 获取页面url
      var appid = 'wx35df9de41b8995f9'

      window.location.href =
        // 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx35df9de41b8995f9&redirect_uri=http%3a%2f%2fbnb.yidonghuayuan.com%2ftest%2f%23%2fconfirmLogin&response_type=code&scope=snsapi_userinfo&connect_redirect=1&state=STATE#wechat_redirect'
        'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx35df9de41b8995f9&redirect_uri=http%3a%2f%2fbnb.yidonghuayuan.com%2f%23%2fconfirmLogin&response_type=code&scope=snsapi_userinfo&connect_redirect=1&state=STATE#wechat_redirect'
    },
    // 截取code
    getUrlCode() {
      // 截取url中的code方法
      var url = location.search
      var theRequest = {}
      if (url.indexOf('?') != -1) {
        var str = url.substr(url.indexOf('?') + 1)
        var strs = str.split('&')
        theRequest.code = strs[0].split('=')[1]
        theRequest.state = strs[1].split('=')[1]
        this.code = theRequest.code
      }
      return theRequest
    }
  },
  created() {}
}
</script>
<style scoped lang="less">
.px2rem(@name, @px) {
  @{name}: @px / 75 * 1rem;
}
.lang-weixin {
  h1 {
    text-align: center;
    font-size: 14px;
    font-family: SourceHanSansCN-Normal, SourceHanSansCN;
    font-weight: 400;
    color: rgba(109, 114, 120, 1);
    .px2rem(padding-top, 188);
  }
  ul {
    display: flex;
    align-items: center;
    li {
      width: 20%;
      .px2rem(height, 50);
      float: left;
      margin: 0 auto;
      .px2rem(padding-top, 68);
      img {
        width: 40px;
        height: 40px;
        margin: 0 auto;
        display: flex;
        align-items: center;
      }
    }
  }
}

.header {
  width: 99%;
  .px2rem(height, 110);
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
    font-family: SourceHanSansCN-Normal, SourceHanSansCN;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
  }
}

.box1 {
  margin: 0 auto;
  .px2rem(margin-top, 100);
}

.phone {
  .px2rem(width, 540);
  margin: 0 auto;
  ol {
    li:last-child {
      border: none;
      color: #03a9f4;
      display: flex;
      justify-content: flex-end;
    }

    li {
      .px2rem(height, 100);
      border-bottom: 1px solid #f6f6f6;
      display: flex;
      align-items: flex-end;
      input {
        width: 100%;
        .px2rem(height, 50);
        border: none;
        .px2rem(font-size, 28);
        background: #fff;
      }
    }
    li:nth-child(3) {
      p {
        .px2rem(padding-bottom, 28);
      }
    }
  }
}

.elime {
  .px2rem(width, 550);
  margin: 0 auto;
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
        .px2rem(font-size, 28);
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
    .px2rem(font-size, 30);
    color: #fff;
    border-radius: 2px;
  }
}
</style>
<style lang="less">
.van-tabs__wrap /deep/.van-tab--active {
  color: #03a9f4;
}
.van-ellipsis {
  font-size: 18px !important;
}
.van-tabs__nav /deep/.van-tabs__line {
  background-color: #fff;
}
.van-dialog__message {
  text-align: left;
  white-space: normal;
}
</style>