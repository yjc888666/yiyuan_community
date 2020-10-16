<template>
  <div class="grcenter_header">
    <!-- 普通登陆 -->

    <div v-if="showxinxi">
      <div class="toui">
        <div class="tutu">
          <div class="mo"></div>
          <img style="object-fit: cover;" :src="this.GLOBAL.basesURL+userhead !== this.GLOBAL.basesURL?this.GLOBAL.basesURL+userhead:require('../assets/moren.jpg')" alt />
        </div>
        <div class="xiaoxi"></div>
        <div class="geqian">
          <dl>
            <dt>
              <div class="tu" @click="handleportrait">
                <img style="object-fit: cover;" :src="this.GLOBAL.basesURL+userhead !== this.GLOBAL.basesURL?this.GLOBAL.basesURL+userhead:require('../assets/moren.jpg')" alt />
                <div class="my-field" v-if="handlefield">
                  <i>{{subject_type}}</i>
                </div>
              </div>
            </dt>
            <dd>
              <h1>{{msg}}</h1>
              <p @click="handleportrait">
                {{msgtwo == '' || msgtwo == '待完善'?'一句话描述自己':msgtwo}}
                <!-- <img
                  v-if="handleqianbi"
                  src="../assets/qianbi.png"
                  alt
                />-->
              </p>
            </dd>
          </dl>
        </div>
        <div class="grcenter_nav"></div>
      </div>
    </div>
    <!-- 微信登陆 -->
    <div v-if="showweixin">
      <div class="toui">
        <div class="tutu">
          <div class="mo"></div>
          <img style="object-fit: cover;" v-lazy="this.GLOBAL.basesURL+userhead" alt />
        </div>
        <div class="xiaoxi"></div>
        <div class="geqian">
          <dl>
            <dt>
              <div class="tu" @click="handleportrait">
                <img v-if="!userhead==''||!userhead==null " style="object-fit: cover;" v-lazy="this.GLOBAL.basesURL+userhead" alt />
                <img v-else style="object-fit: cover;" v-lazy="this.GLOBAL.basesURL+userhead" alt />
                <div class="my-field" v-if="handlefield">
                  <i>{{subject_type}}</i>
                </div>
              </div>
            </dt>
            <dd>
              <h1 v-if="msg!==null||msg!=''">{{msg}}</h1>
              <h1 v-else>{{nickname}}</h1>
              <!-- <p>{{msgtwo == '' || msgtwo == '待完善'?'一句话描述自己':msgtwo}}</p> -->
            </dd>
          </dl>
        </div>
        <div class="grcenter_nav"></div>
      </div>
    </div>
    <div class="land" v-if="!showweixin && !showxinxi">
      <p @click="land">登录</p>
    </div>

    <div class="gongneng">
      <dl @click="comment">
        <dt>
          <img src="../assets/tiezi.png" alt />
        </dt>
        <dd>我的帖子</dd>
      </dl>
      <dl @click="collection">
        <dt>
          <img src="../assets/guanzhu.png" alt />
        </dt>
        <dd>我的关注</dd>
      </dl>
      <dl @click="readingHistory">
        <dt>
          <img src="../assets/fensi.png" alt />
        </dt>
        <dd>粉丝</dd>
      </dl>

      <!-- <dl @click="collection">
        <dt>
          <img src="../assets/lishifa.png" alt />
        </dt>
        <dd>历史发布</dd>
      </dl>-->
      <dl class="Tips-nol" @click="handlewallet">
        <i class="Tips">{{Unread.length}}</i>
        <dt>
          <img src="../assets/xinxi.png" alt />
        </dt>
        <dd>信息</dd>
      </dl>
    </div>
    <div class="tisement" @click="handleguangao"></div>
    <div class="money" v-if="showPrise">
      <div class="item-1">
        <p>
          <i>{{handleinfo.gold}}</i>&nbsp;元
          <br />提现金额
        </p>
      </div>
      <div class="item-2">
        <p>
          <i>{{handleinfo.score_num}}</i>&nbsp;金币
          <br />金币余额
        </p>
        <div class="money-show">
          <div class="money-img">
            <img src="../assets/pic-000000.png" alt />
          </div>
          <div>
            <span @click="handlewithdrawal">去领钱</span>
          </div>
        </div>
      </div>
    </div>
    <div class="shezhi">
      <ul>
        <li @click="jinbi">
          <p>
            <!-- <img src="../assets/qian.png" alt /> -->
            我的金币
          </p>
          <span>
            <img src="../assets/youjiantou.png" alt />
          </span>
        </li>
        <li @click="handlerecord">
          <p>
            <!-- <img src="../assets/tixian.png" alt /> -->
            金币提取记录
          </p>
          <span>
            <img src="../assets/youjiantou.png" alt />
          </span>
        </li>
        <div class="Collection"></div>
        <li @click="handleCollection">
          <p>
            <!-- <img src="../assets/cang.png" alt /> -->
            我的收藏
          </p>
          <span>
            <img src="../assets/youjiantou.png" alt />
          </span>
        </li>
        <li @click="handleReply">
          <p>我的回复</p>
          <span>
            <img src="../assets/youjiantou.png" alt />
          </span>
        </li>
        <li @click="handlethumbs">
          <p>我的点赞</p>
          <span>
            <img src="../assets/youjiantou.png" alt />
          </span>
        </li>
        <li @click="handletbrowse">
          <p>我的浏览</p>
          <span>
            <img src="../assets/youjiantou.png" alt />
          </span>
        </li>
        <div class="Collection"></div>
        <li @click="authentication">
          <p>我的认证</p>
          <span>
            <img src="../assets/youjiantou.png" alt />
          </span>
        </li>
        <li @click="handlesetup">
          <p>设置</p>
          <span>
            <img src="../assets/youjiantou.png" alt />
          </span>
        </li>
        <li>
          <p>客服电话: 010-12345678</p>
          <span></span>
        </li>
        <div class="Collection"></div>
        <div class="Collection"></div>
        <div class="Collection"></div>
        <van-dialog v-model="show" title="标题" show-cancel-button>
          <img src="https://img.yzcdn.cn/vant/apple-3.jpg" />
        </van-dialog>
        <li v-if="showPrise">
          <button class="tuichus" @click="exit">退出登录</button>
        </li>
        <li v-if="showRentPrise">
          <div class="tuichu">
            <p @click="exitd">登录</p>
          </div>
        </li>
        <div class="Collection"></div>
        <div class="Collection"></div>
        <div class="Collection"></div>
      </ul>
      <!-- <div class="handlebutton">
        <button @click="exit">退出</button>
      </div>-->
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { Dialog } from 'vant'
export default {
  name: 'index',
  data() {
    return {
      msg: '',
      msgtwo: '',
      fans: 0,
      zan: 0,
      follow: 0,
      userhead: '',
      Unread: [], //未读消息
      handleinfo: {},
      subject_type: '',
      showPrise: false,
      showRentPrise: false,
      showxinxi: false,
      showweixin: false,
      showdeglu: false,
      weixinuserInfo: {},
      weiname: '', //微信名
      weiheadimgurl: '', //微信头像
      weiprovince: '', //微信省份
      city: '', //微信市级
      show: false,
      // handleqianbi: true,
      comtips: '',
      handlefield: true,
      weixinmobile: '',
      modiiofo: {},
      headimgurlss: '',
      handlenickname: '',
      showdegluone: false
    }
  },
  methods: {
    jinbi() {
      this.$router.push({ path: '/account' })
    },
    handlewithdrawal() {
      this.$router.push({ path: '/withdrawal' })
    },
    readingHistory() {
      this.$router.push({ path: '/fans' })
    },
    collection() {
      this.$router.push({ path: '/follow' })
    },
    comment() {
      this.$router.push({ path: '/history_release' })
    },
    land() {
      this.$router.push({ path: '/land' })
    },
    exitd() {
      this.$router.push({ path: '/land' })
    },
    handlesetup() {
      this.$router.push({ path: '/setup' })
    },
    handlewallet() {
      this.$router.push({ path: '/xiaoxi' })
    },
    authentication() {
      this.$router.push({ path: '/authentication' })
    },
    handleportrait() {
      this.$router.push({ path: '/personalData' })
    },
    handlerecord() {
      this.$router.push({ path: '/cashs' })
    },
    handleCollection() {
      this.$router.push({ path: '/collection' })
    },
    handleReply() {
      this.$router.push({ path: '/comment' })
    },
    handlethumbs() {
      this.$router.push({ path: '/thumbs' })
    },
    handletbrowse() {
      this.$router.push({ path: '/readingHistory' })
    },
    handleguangao() {
      this.$router.push({ path: '/coin' })
    },
    dialog() {
      Dialog.confirm({
        title: '微信绑定手机号',
        message: '您未绑定手机号，是否要绑定手机号？'
      })
        .then(() => {
          this.$router.push({
            path: '/Settings'
          })
        })
        .catch(() => {
          // on cancel
        })
    },
    // 个人信息查询
    info() {
      var id = { id: localStorage.getItem('userid') }
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/user/info',
        data: id
      }).then(res => {
        if (res.data.result) {
          this.msgtwo = res.data.pojo.description ? res.data.pojo.description : '待完善'
          if (res.data.pojo.land == 1) {
            this.msg = res.data.pojo.name
            this.userhead = res.data.pojo.userhead
          } else {
            this.msg = res.data.pojo.nickname
            this.userhead = res.data.pojo.headimgurl
          }
          this.zan = res.data.pojo.zan
          this.fans = res.data.pojo.fans
          this.follow = res.data.pojo.follow
          this.headimgurlss = res.data.pojo.headimgurl
          if (res.data.pojo.nickname) {
            this.handlenickname = res.data.pojo.nickname
          }
          var openid = localStorage.getItem('openid')
          if (openid) {
            this.showweixin = true
            this.showxinxi = false
          } else {
            this.showweixin = false
            this.showxinxi = true
          }
        }
        //
        if (res.data.result) {
          this.modiiofo = res.data.pojo
          this.weixinmobile = res.data.pojo.mobile
          window.localStorage.setItem('weixinmobile', res.data.pojo.mobile)
          if (res.data.msg == '未绑定手机号') {
            this.showdegluone = true
          } else {
            this.showdegluone = false
          }
        }
        //
        this.handleinfo = res.data.pojo
        if (res.data.login == null) {
          //如果账号密码未登陆
          this.showPrise = true
        } else {
          this.showPrise = false
        }
        if (res.data.msg == '用户未登陆' || res.data.msg == '查无此用户') {
          window.localStorage.clear()
          this.showdeglu = true
        } else {
          this.showdeglu = false
        }
      })
    },
    // 收益
    async handleProfit() {
      var id = { id: localStorage.getItem('userid') }
      const res = await axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/user/info',
        data: id
      })
      console.log(res.data.msg)

      // this.handleinfo = res.data.pojo
      // if (res.data.login == null) {
      //   //如果账号密码未登陆
      //   this.showPrise = true
      // } else {
      //   this.showPrise = false
      // }
      // if (res.data.msg == '用户未登陆' || res.data.msg == '查无此用户') {
      //   window.localStorage.clear()
      //   this.showdeglu = true
      // } else {
      //   this.showdeglu = false
      // }
    },
    // 入驻信息查询
    async handlesettled() {
      var id = { id: localStorage.getItem('userid') }
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/settled/get',
        data: id
      }).then(res => {
        if (res.data.msg == '用户未认证') {
          this.handlefield = false
        } else {
          this.handlefield = true
        }
        if (res.data.result) {
          if (res.data.pojo.subject_type == 1) {
            this.subject_type = '个人'
          } else if (res.data.pojo.subject_type == 2) {
            this.subject_type = '媒体'
          } else if (res.data.pojo.subject_type == 3) {
            this.subject_type = '群媒体'
          } else if (res.data.pojo.subject_type == 4) {
            this.subject_type = '企业'
          } else if (res.data.pojo.subject_type == 5) {
            this.subject_type = '机构'
          } else if (res.data.pojo.subject_type == 6) {
            this.subject_type = '其他组织'
          } else if (res.data.pojo.subject_type == 7) {
            this.subject_type = '政府'
          }
        } else {
          // if (res.data.msg == "用户未登陆") {
          //   this.showdeglu = true;
          // } else {
          //   this.showdeglu = false;
          // }
        }
      })
    },
    async handlesettledss() {
      if (JSON.parse(window.localStorage.getItem('arr'))) {
        var weixinuserInfo = JSON.parse(window.localStorage.getItem('arr'))
        this.weiname = weixinuserInfo.nickname
        this.weiheadimgurl = weixinuserInfo.headimgurl
        this.weiprovince = weixinuserInfo.province
        this.city = weixinuserInfo.city
      }
    },
    // 未读消息
    async handlestatest() {
      const res = await axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/message/signList'
      })
      if (res.data.pojo) {
        this.Unread = res.data.pojo
      }
    },
    async modiinfo() {
      var id = { id: localStorage.getItem('userid') }
      const res = await axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/user/info',
        data: id
      })

      // if (res.data.result) {
      //   this.modiiofo = res.data.pojo
      //   this.weixinmobile = res.data.pojo.mobile
      //   window.localStorage.setItem('weixinmobile', res.data.pojo.mobile)
      //   if (res.data.msg == '未绑定手机号') {
      //     this.showdegluone = true
      //   } else {
      //     this.showdegluone = false
      //   }
      // }
    },
    // 退出
    exit() {
      this.$dialog
        .confirm({
          title: '退出确认',
          message: '退出当前账号，将不能同步收藏，发布和评论等'
        })
        .then(() => {
          this.$axios({
            method: 'post',
            url: this.GLOBAL.baseURL + '/user/exit'
          }).then(res => {
            if (res.data.result) {
              this.$store.commit('zhuangtai', false)
              localStorage.removeItem('zhuangtai')
              localStorage.removeItem('token')
              localStorage.removeItem('renzheng')
              localStorage.removeItem('arr')
              localStorage.removeItem('openid')
              window.localStorage.clear()
              this.$router.go(0)
              this.$toast('退出成功')
            }
          })
        })
        .catch(() => {})
    }
  },
  created() {
    this.info()
    // this.handleProfit()
    this.handlesettled()
    this.handlesettledss()
    this.handlestatest()
    // this.modiinfo()
    var toss = localStorage.getItem('token')
    if (toss) {
      this.showdeglu = false
    } else {
      this.showdeglu = true
    }
  },
  mounted() {
    var ut = window.localStorage.removeItem('kong')
    if (ut == undefined) {
      window.localStorage.removeItem('t')
      window.localStorage.removeItem('x')
      window.localStorage.removeItem('v')
      window.localStorage.removeItem('u')
      window.localStorage.removeItem('ur')
      window.localStorage.removeItem('ut')
      window.localStorage.removeItem('id')
      window.localStorage.removeItem('ids')
      window.localStorage.removeItem('idt')
    }
  },
  activated() {},
  deactivated() {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name == 'land' || from.name == 'confirmLogin') {
        to.meta.keepAlive = false

        return
      }
      {
        to.meta.keepAlive = true

        return
      }
    })
  }
}
</script>
<style scoped lang="less">
.px2rem(@name, @px) {
  @{name}: @px / 75 * 1rem;
}
.shezhi::after {
  content: '';
  display: block;
  width: 100%;
  .px2rem(height, 120);
  background: #f3f3f3;
}

.money {
  .px2rem(height, 180);
  background: linear-gradient(180deg, rgba(249, 65, 12, 1) 0%, rgba(253, 214, 42, 1) 100%);
  .item-1 {
    float: left;
    width: 50%;
    text-align: center;
    .px2rem(padding-top, 70);
    color: #fff;
    p {
      .px2rem(font-size, 25);
      line-height: 22px;
    }
  }
  .item-2 {
    position: relative;
    text-align: center;
    width: 50%;
    float: right;
    .px2rem(padding-top, 70);
    color: #fff;
    p {
      .px2rem(font-size, 25);
    }
  }
  i {
    font-style: normal;
    .px2rem(padding-left, 15);
    .px2rem(font-size, 35);
    font-family: Roboto-Medium, Roboto;
  }
  .money-show {
    .px2rem(width, 145);
    .px2rem(height, 40);
    background: #fff;
    position: absolute;
    display: table;
    .px2rem(top, 25);
    .px2rem(right, 28);
    border-radius: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: normal;
    img {
      width: 69%;
      height: 17px;
      float: left;
      .px2rem(margin-top, 4);
      .px2rem(margin-bottom, 2);
    }
    span {
      color: #2c2c2c;
      .px2rem(font-size, 24);
      background: url(../assets/icon-53.png) no-repeat right;
      background-size: 18%;
      .px2rem(padding-right, 14);
      display: table-cell;
      vertical-align: middle;
    }
  }
}
.money-img {
  display: flex;
  justify-content: center;
}
.shezhi {
  background: #fff;
  ul {
    width: 100%;
    margin: 0 auto;
    li:last-child {
      border: none;
    }
    li {
      padding-left: 16px;
      padding-right: 17px;
      .px2rem(height, 95);
      border-bottom: 1px solid #f3f3f3;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      font-family: SourceHanSansCN-Normal, SourceHanSansCN;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      p {
        display: flex;
        align-items: center;
        .px2rem(font-size, 28);

        font-family: SourceHanSansCN-Normal, SourceHanSansCN;
        font-weight: 400;
      }
      img {
        .px2rem(width, 32);
        .px2rem(height, 32);
        .px2rem(margin-right, 30);
      }
      span {
        .px2rem(width, 30);
        .px2rem(height, 30);
        img {
          width: 100%;
        }
      }
    }
  }
}
.tuichu {
  margin: 0 auto;
  li {
    margin-bottom: 50px;
  }
  button {
    text-align: center;
    .px2rem(font-size, 30);
    color: #03a9f4;
    background: #fff;
    border: 0px;
  }
}
.tuichus {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: 0px;
  color: #03a9f4;
  .px2rem(font-size, 28);
}
.land {
  width: 100%;
  .px2rem(height, 350);
  overflow: hidden;
  background: #fff;
  p {
    .px2rem(width, 350);
    .px2rem(font-size, 33);
    .px2rem(line-height, 165);
    text-align: center;
    margin: 0 auto;
    .px2rem(margin-top, 92.5);
    background: url(../assets/land.png) no-repeat;
    background-size: 100%;
    font-family: SourceHanSansCN-Normal, SourceHanSansCN;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
}
.weixinshouone {
  p {
    .px2rem(margin-top, 40);
    .px2rem(margin-bottom, 40);
    text-align: center;
  }
}
.tutu {
  position: absolute;
  overflow: hidden;
  width: 100%;
  z-index: -1;
  .px2rem(height, 420);
  .mo {
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(0, 0, 0, 0.3);
  }
  img {
    position: absolute;
    width: 100%;
    .px2rem(height, 420);
    z-index: -5;
    filter: blur(5px);
  }
}
.tisement {
  display: flex;
  align-items: center;
  img {
    .px2rem(height, 130);
    width: 90%;
    text-align: center;
    margin: 0 auto;
  }
}
.grcenter_header {
  position: absolute;
  z-index: -1000;
  width: 100%;
  height: 100vh;
  background: #f3f3f3;

  .xiaoxi {
    color: #fff;
    width: 100%;
    .px2rem(height, 80);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    dl {
      .px2rem(min-width, 40);
      .px2rem(margin-right, 40);
      dt {
        text-align: center;
        margin: 0 auto;
        .px2rem(width, 40);
        img {
          width: 100%;
        }
      }
      dd {
        .px2rem(font-size, 24);
        text-align: center;
      }
    }
    .news {
      background: #fff;
      .px2rem(width, 30);
      .px2rem(height, 30);
      border-radius: 50%;
      color: #b6b7b8;
      text-align: center;
      .px2rem(margin-left, -10);
      .px2rem(margin-top, 12);
      .px2rem(font-size, 24);
    }
  }
  .geqian {
    position: relative;
    color: #fff;
    .px2rem(padding-top, 48);
    dl {
      display: flex;
      align-items: center;
      dt {
        width: 28%;

        .tu {
          margin: 0 auto;
          .px2rem(width, 120);
          .px2rem(height, 120);
          border-radius: 50%;
          position: relative;
          border: none; // overflow: hidden;
          background: #666;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
      }
      dd {
        width: 72%;
        .px2rem(padding-right, 40);
        h1 {
          .px2rem(font-size, 38);
          .px2rem(line-height, 100);
          font-family: SourceHanSansCN-Normal, SourceHanSansCN;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
        p {
          .px2rem(font-size, 26);
          .px2rem(min-height, 60);
          .px2rem(letter-spacing, 1);
          .px2rem(padding-left, 4);
          img {
            content: '';
            display: inline-block;
            .px2rem(width, 26);
            .px2rem(height, 26);
            // background: url(../assets/qianbi.png) no-repeat;
            background-size: 100%;
          }
        }
      }
    }
    .nav-hhhh {
      height: 500px;
      width: 100px;
    }
    .my-field {
      height: 25px;
      position: absolute;
      right: -8%;
      top: 67%;
      background: #ff8200;
      border-radius: 50%;
      line-height: 24px;
      i {
        font-style: normal;
        font-size: 10px;
        padding: 0px 3px 0px 3px;
      }
    }
  }
  .grcenter_nav {
    color: #fff;
    .px2rem(height, 130);
    z-index: 10px;
    ul {
      height: 80%;
      align-items: center;
      display: flex;
      justify-content: space-around;
      li {
        .px2rem(font-size, 26);
        text-align: center;
        p {
          .px2rem(font-size, 28);
        }
        span {
          display: block;
          .px2rem(margin-bottom, 10);
          color: #03a9f4;
          .px2rem(font-size, 32);
        }
      }
    }
  }
  .gongneng {
    background: #fff;
    display: flex;
    justify-content: space-around;
    .px2rem(height, 194);
    align-items: center;
    .px2rem(margin-top, 16);
    border-bottom: 1px solid #f6f6f6;
    box-shadow: 0px 0px 5px 1px #f6f6f6;
    dl {
      .px2rem(margin-top, 20);
      dt {
        // .px2rem(width, 60);
        // .px2rem(height, 68);
        margin: 0 auto;
        text-align: center;
        height: 40px;
        img {
          width: 50%;
          height: 90%;
        }
      }
      dd {
        text-align: center;
        .px2rem(line-height, 65);
        .px2rem(font-size, 28);
        font-family: SourceHanSansCN-Normal, SourceHanSansCN;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
    }

    .Tips-nol {
      position: relative;
      .Tips {
        position: absolute;
        .px2rem(width, 25);
        .px2rem(height, 25);
        .px2rem(right, 24);
        .px2rem(top, 4);
        font-style: normal;
        text-align: center;
        background: rgba(254, 32, 21, 1);
        border: 1px solid rgba(255, 255, 255, 1);
        border-radius: 10px;
        color: #fff;
        font-family: Roboto-Regular, Roboto;
      }
    }
  }
}
.Collection {
  background: #f4f5f7;
  width: 100%;
  height: 10px;
}
.van-hairline--top /deep/ .van-button__text {
  font-size: 16px;
}
</style>
<style>
.van-button__text {
  font-size: 16px !important;
  /* color: #03a9f5 !important; */
}
.van-dialog__header {
  padding-top: 12px !important;
}
.van-dialog__message--has-title {
  font-size: 14px !important;
  text-align: left !important;
}
</style>