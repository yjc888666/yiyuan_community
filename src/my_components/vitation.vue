<template>
  <div class="nav-banner">
    <div id="popBox" v-if="showpop" @click="closebox">
      <img src="../assets/jianjian.png" alt />
      <span>点击上方去分享</span>
    </div>
    <!-- <div class="header">
      <div>
        <img src="../assets/jiantoua.png" alt @click="$router.back()" />
      </div>
      <p>邀请好友</p>
      <div class="header-sm">
        <span @click="dialog">活动说明</span>
      </div>
    </div> -->
    <van-nav-bar title="邀请好友" right-text="活动说明" left-arrow @click-left="$router.back()" @click-right="dialog" />
    <div class="banner">
      <!-- <img src="../assets/picimg-001.png" alt /> -->
      <h1>邀请1位好友</h1>
      <h2>
        赚
        <i style="color:#FFD500">31</i>&nbsp;元
      </h2>
      <!-- <div class="nav-copy"> -->
      <div id="code">
        我的邀请码：{{code.code_o}}
        <i @click="copy" class="tag-read" data-clipboard-target="#code" :data-clipboard-text="code.code_o">复制</i>
      </div>
      <!-- </div> -->
      <div class="nav-button">
        <span @click="shareToWechat">立刻邀请</span>
      </div>
    </div>
    <div class="jinbi">
      <i class="jinbi-box"></i>
      <h3>我的好友</h3>
      <dl v-for="item in friend" :key="item">
        <dt>
          <img :src="GLOBAL.basesURL + item.userhead" alt />
        </dt>
        <dd>
          <div>
            <p>{{item.name}}</p>
          </div>
          <!-- <button>点击进入</button> -->
          <p>
            累计收益
            <i>{{item.gold}}元</i>
          </p>
        </dd>
      </dl>
    </div>
    <div class="jinbin">
      <i class="jinbi-box"></i>
      <h3>规则说明</h3>
      <dl>
        <dd>
          <div>
            <p>1. 分享给好友，让好友通过您上分享链接下载注册，首次邀请立赚30元奖励；</p>
          </div>
        </dd>
      </dl>
      <dl>
        <dd>
          <div>
            <!-- ，您可以获得3元奖励，累计3天获得9元； -->
            <p>2. 好友每天认真阅读3篇文章（获得1金币）</p>
          </div>
        </dd>
      </dl>
      <dl>
        <dd>
          <div>
            <p>3. 好友每天阅读获得的金币，您可以获得双倍</p>
          </div>
        </dd>
      </dl>
      <dl>
        <dd>
          <div>
            <p>4. 邀请好友数量无上限，邀请越多奖励越多。</p>
          </div>
        </dd>
      </dl>
    </div>
    <div>
      <van-dialog v-model="show" title="活动说明" close-on-click-overlay confirmButtonColor="#1989fa">
        <div style="overflow-y:scroll white-space: nowrap;" class="sdsdsdsdsd">
          <p>1.每成功邀请一位新用户（以下或称“好友”）首次下载并使用本APP，您（以下或称为“邀请者”）有机会获得奖励现金红包。您可将活动页面通过微信或者面对面、链接等方式分享给好友且好友首次下载亿源社区后在日内填写邀请码的，则视为您邀请好友成功。（备注：邀请码为本平台为每位用户设立的独立ID号，用于邀请好友是使用）</p>
          <p>2.当被邀请成功的好友每天认真阅读3篇文章或视频则您将获得3元现金奖励（如为快速浏览、刷文章、刷视频的则视为无效，您将无权获得任何现金奖励），累计3天您共可获得9元奖励。如邀请者是首次邀请好友的，则立即另外获得额外奖励1元，每个发出邀请的用户仅限一次。（邀请好友奖励将根据好友的阅读情况分多天发放，且前述奖励在好友成功填写邀请码的30日内有效）。</p>
          <p>3.每个新用户只能被邀请一次，同一个登录账号、同一个手机号、同一个设备或同一提现账号，都视为同一个用户。注意：新用户（新手机、新账号）首次使用10天内才能填写邀请码。</p>
          <p>4.金币每天凌晨自动兑换成现金，放入您的本APP账户中。</p>
          <p>5.累计一定现金且达到提现额度后，可申请微信提现，提现一般3-5天到微信账户，如遇双休日、节假日或体现高峰期，提现到账时间可能会出现延迟，清耐心等待。</p>
          <p>6.如您使用微信登录，累计一定金额且达到提现额度后了直接申请提现，如您使用手机号登录，提现时会引导您绑定微信号，如您绑定的微信号曾登录过，二次绑定会丢失此微信号之前的信息，具体参见页面提示。</p>
        </div>
      </van-dialog>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Clipboard from 'clipboard'
import wxapi from '../commom/wxapi'
import { Dialog } from 'vant'
var shares = null
export default {
  name: 'vitaion',
  data() {
    return {
      code: {}, //邀请码
      friend: [], //邀请好友
      showpop: false,
      show: false
    }
  },
  methods: {
    shareToWechat() {
      this.showpop = true
    },
    closebox() {
      this.showpop = false
    },
    // 现金收益
    async handleInvitation() {
      const res = await axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/invitation/earnings'
      })
      // this.handleinfo = res.data.pojo
      // console.log(res)
    },
    // 邀请码
    async handleInvitationcode() {
      var id = { id: localStorage.getItem('userid') }
      const res = await axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/user/info',
        data: id
      })
      this.code = res.data.pojo
      // console.log(this.code);
      // console.log(res)
    },
    // 邀请好友查询
    async handlefriend() {
      const res = await axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/invitation/earnings'
      })
      this.friend = res.data.pojo
      // console.log(res)
    },
    // 复制
    copy: function() {
      var _this = this
      var clipboard = new Clipboard('.tag-read')

      clipboard.on('success', e => {
        this.$toast('复制成功')
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        Message({
          message: '该浏览器不支持自动复制',
          type: 'warning'
        })
        // 释放内存
        clipboard.destroy()
      })
    },
    wxRegCallback() {
      // 用于微信JS-SDK回调
      this.wxShareTimeline()
      this.wxShareAppMessage()
    },
    wxShareTimeline() {
      // 微信自定义分享到朋友圈
      let option = {
        title: '邀请一位好友得10金币',
        link: window.location.href,
        type: 'link',
        imgUrl: 'http://47.94.215.133/images/logo.png',
        success: () => {
          alert('分享成功')
        },
        error: () => {
          alert('已取消分享')
        }
      }
      // 将配置注入通用方法
      wxapi.ShareTimeline(option)
    },
    wxShareAppMessage() {
      // 微信自定义分享给朋友
      let option = {
        title: '邀请一位好友得10金币',
        desc: '邀请一位好友得10金币',
        link: window.location.href,
        type: 'link',
        imgUrl: 'http://47.94.215.133/images/logo.png',
        success: () => {
          alert('分享成功')
        },
        error: () => {
          alert('已取消分享')
        }
      }
      // 将配置注入通用方法
      wxapi.ShareAppMessage(option)
    },
    dialog() {
      this.show = true
    }
  },
  created() {
    this.handleInvitation() //现金收益
    this.handleInvitationcode() //邀请码
    this.handlefriend() //邀请好友查询
  },
  mounted() {
    wxapi.wxRegister(this.wxRegCallback)
  }
}
</script>


<style scoped lang="less">
.px2rem(@name, @px) {
  @{name}: @px / 75 * 1rem;
}
#popBox {
  position: fixed;
  height: 100%;

  width: 100%;
  display: flex;
  background: #4a4a4a;
  opacity: 0.9;
  z-index: 1000;
  img {
    .px2rem(height, 200);
    .px2rem(width, 200);
    .px2rem(margin-left, 501);
  }
  span {
    position: absolute;
    color: #fff;
    .px2rem(font-size, 50);
    .px2rem(top, 150);
    .px2rem(left, 150);
  }
}
.header {
  width: 100%;
  .px2rem(height, 110);
  border-bottom: 1px solid #f6f6f6;
  // box-shadow: 0px 0px 5px 1px #f6f6f6;
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
  p {
    text-align: center;
    flex: 1;
    .px2rem(font-size, 33);
    .px2rem(padding-left, 40);
  }
  span {
    position: absolute;
    .px2rem(font-size, 32);
    // .px2rem(padding-left, 40);
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: rgba(3, 169, 244, 1);
  }
  .header-sm {
    .px2rem(width, 150);
  }
}
.nav-banner {
  background: #f4f5f7;
}
.banner {
  .px2rem(height, 481);
  background: #f4f5f7 url(../assets/picimg-001.png) no-repeat;
  background-size: 100%;
  h1 {
    .px2rem(font-size, 73);
    color: #ffffff;
    text-align: center;
    .px2rem(padding-top, 48);
  }
  h2 {
    .px2rem(font-size, 94);
    color: #ffffff;
    text-align: center;
  }
}
i {
  font-style: normal;
}
.sdsdsdsdsd {
  height: 400px;
  padding: 20px;
  overflow-y: scroll;
  p {
    color: #666666;
    .px2rem(font-size, 28);
    font-family: SourceHanSansCN-Normal, SourceHanSansCN;
    font-weight: 400;
    .px2rem(margin-top, 14);
    .px2rem(letter-spacing, 4);
  }
}
.van-button {
  width: 100%;
}
.nav-button {
  margin: 0 auto;
  text-align: center;
  .px2rem(height, 58);
  .px2rem(width, 360);
  background: #ffd500;
  .px2rem(border-radius, 28);
  .px2rem(font-size, 38);
  .px2rem(margin-top, 38);

  span {
    text-decoration: none;
    color: #a34303;
    .px2rem(font-size, 38);
    font-family: 思源黑体;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 600;
  }
}
.jinbi {
  background: #fff;
  .px2rem(margin-top, 20);
  h3 {
    .px2rem(font-size, 28);
    .px2rem(padding-left, 30);
    .px2rem(line-height, 90);
  }
  i {
    color: #fa5c12;
  }
  dl {
    display: flex;
    .px2rem(height, 105);
    dd {
      border-bottom: 1px solid #f3f3f3;
      .px2rem(margin-right, 20);
      width: 85%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div {
        .s1 {
          .px2rem(font-size, 21);
        }
        p {
          display: flex;
          align-items: center;
          .px2rem(font-size, 25);
          span {
            color: #fa6400;
          }
          img {
            .px2rem(margin-left, 20);
            .px2rem(margin-right, 20);
            .px2rem(width, 35);
            .px2rem(height, 40);
          }
        }
      }
    }
    dt {
      width: 15%;
      display: flex;
      align-items: center;
      img {
        display: block;
        margin: 0 auto;
        .px2rem(width, 67);
        .px2rem(height, 67);
      }
    }
  }
}
.jinbin {
  .px2rem(height, 471);
  background: #fff;
  .px2rem(margin-top, 20);
  h3 {
    .px2rem(font-size, 28);
    .px2rem(padding-left, 30);
    .px2rem(line-height, 90);
  }
  dl {
    display: flex;
    .px2rem(height, 50);
    .px2rem(padding-left, 35);
    .px2rem(padding-bottom, 36);
    // .px2rem(padding-right, 31);
    dd {
      .px2rem(margin-right, 20);
      width: 96%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div {
        .s1 {
          .px2rem(font-size, 21);
        }
        p {
          display: flex;
          align-items: center;
          .px2rem(font-size, 28);
          span {
            color: #fa6400;
          }
          img {
            .px2rem(margin-left, 20);
            .px2rem(margin-right, 20);
            .px2rem(width, 35);
            .px2rem(height, 40);
          }
        }
      }
    }
    dt {
      width: 15%;
      display: flex;
      align-items: center;
      img {
        display: block;
        margin: 0 auto;
        .px2rem(width, 67);
        .px2rem(height, 67);
      }
    }
  }
}
.nav-bottom {
  .px2rem(height, 173);
  .px2rem(margin-top, 20);
  background: #fff;
  display: flex;
  text-align: center;
  .px2rem(padding-top, 38);
  img {
    .px2rem(width, 67);
    .px2rem(height, 67);
  }
  .item-1 {
    flex: 1;
  }
  .item-2 {
    flex: 1;
  }
  .item-3 {
    flex: 1;
  }
}
#code {
  .px2rem(padding-top, 14);
  .px2rem(height, 25);
  margin: 0 auto;
  text-align: center;
  .px2rem(font-size, 25);
  width: 100%;
  color: #ffffff;
  i {
    .px2rem(margin-left, 10);
    .px2rem(font-size, 21);
    .px2rem(width, 67);
    .px2rem(height, 29);
    border: 0.02rem solid #fff;
    .px2rem(border-radius, 10);
    .px2rem(padding, 8);
  }
}
.nav-dd {
  i {
    font-style: normal;
    .px2rem(margin-bottom, 28);
    font-weight: bold;
    // color: rgba(255, 255, 255, 1);
    .px2rem(font-size, 35);
    display: flex;
    justify-content: center;
    align-items: conter;
  }
}
/deep/ .van-nav-bar__title.van-ellipsis {
  font-size: 0.48rem;
  font-family: SourceHanSansCN-Medium, SourceHanSansCN;
  font-weight: 500;
}
/deep/ .van-nav-bar__text {
  font-size: 0.43rem;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: rgba(3, 169, 244, 1);
}
</style>
<style>
.van-nav-bar__text {
  color: red;
}
.van-nav-bar .van-icon {
  color: #666;
}
.van-dialog__message {
  text-align: left;
  white-space: normal;
}
</style>
