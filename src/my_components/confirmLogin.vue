<template>
  <div>
    <div class="title">
      <span>微信登录</span>
    </div>
    <div class="logo">
      <img src="../assets/app-logo.png" alt="">
      <span>亿源社区申请获取以下权限：</span>
    </div>
    <div class="hr">

    </div>
    <div class="content">
      <span></span>
      <p>获得你的公开信息（昵称、头像、地 区及性别）</p>
    </div>
    <div class="button">
      <button class="button1" @click="toLand">拒绝</button>
      <button class="button2" @click="confirm">允许</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      code: ''
    }
  },
  created() {},
  methods: {
    toLand() {
      this.$router.replace({
        path: '/land'
      })
    },
    confirm() {
      this.handleweixin()
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
    },
    // 微信用户信息
    async handleweixin() {
      this.getUrlCode()
      const res = await axios({
        method: 'get',
        url: this.GLOBAL.baseURL + '/wxLog/callBack?code=' + this.code
      })
      console.log(res)

      if (res.data.msg == '操作成功') {
        localStorage.setItem('arr', JSON.stringify(res.data.pojo))
        localStorage.setItem('token', res.data.pojo.sessionid)
        localStorage.setItem('openid', res.data.pojo.openid)
        localStorage.setItem('weixinsj', res.data.pojo.mobile)
        var weixinsj = localStorage.getItem('weixinsj')
        console.log(weixinsj)
        if (!weixinsj) {
          console.log('没有..跳走了')
          this.$router.replace({
            path: '/Settings'
          })
        } else {
          console.log('有..就不去')
          this.$toast(' 登录成功')
          if (sessionStorage.getItem('redicet_url')) {
            this.$router.push({
              path: sessionStorage.getItem('redicet_url')
            })
          } else {
            this.$router.push({
              path: '/my'
            })
          }
        }
      } else {
        this.$toast(res.data.msg)
        this.$router.push('/land')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.title {
  margin-top: 61px;
  margin-left: 7.8%;
  span {
    font-size: 23px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
}
.logo {
  margin-top: 24px;
  display: flex;
  padding-left: 7.8%;

  flex-direction: row;
  align-items: center;
  img {
    width: 42px;
  }
  span {
    margin-left: 5px;
    font-size: 18px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
}
.hr {
  margin-top: 18px;
  margin-left: 7.8%;
  margin-right: 8%;
  border-bottom: 1px solid #999999;
}
.content {
  margin-top: 12px;
  margin-left: 7.8%;
  display: flex;
  flex-direction: row;
  align-items: center;
  span {
    width: 8px;
    height: 8px;
    background-color: #999999;
    border-radius: 50%;
  }
  p {
    margin-left: 10px;
    width: 267px;
    height: 50px;
    font-size: 16px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 25px;
  }
}
.button {
  margin-left: 7.8%;
  margin-right: 8%;
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  button {
    width: 73px;
    height: 38px;
    border: none;
    border-radius: 4px;
    margin-left: 5%;
    font-size: 18px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
  }
  .button1 {
    background-color: #ebebeb;
  }
  .button2 {
    background-color: #03a9f4;
    color: rgba(255, 255, 255, 1);
  }
}
</style>