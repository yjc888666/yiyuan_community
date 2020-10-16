<template>
  <div class="banner">

    <div class="nav-banner">

      <van-nav-bar title="累计赚取" right-text="收益说明" left-arrow @click-left="$router.back()" @click-right="dialog" />
      <h1 style="font-size:0.6rem">{{handleinfo.score_num}}金币</h1>
      <div class="itemItem">
        <div class="item-1">
          <p>
            今日金币
            <br />
            <i>{{handleinfo.score}}</i>
          </p>
        </div>
        <div>
          <div class="transfrom" @click="transfromMoney">
            <img src="../assets/account/transfrom.png" alt="">
          </div>
        </div>
        <div class="item-2">
          <p>
            现金收益
            <br />
            <i>{{handleinfo.gold}}</i>
          </p>
        </div>
      </div>
    </div>

    <div class="tab-buttom" @click="handledrawal">
      <i>提现</i>
    </div>
    <van-tabs v-model="active">

      <van-tab class="vant-line" title="金币收益">
        <van-list v-model="loadingLeft" :finished="finishedleft" finished-text="没有更多了" @load="onLoadLeft" :offset="offsetLeft">
          <ul class="tab-nav">
            <li v-for="items in lists" :key="items.id">
              <div class="a1">
                <i>{{items.title}}</i>

                <span class="tab-left">{{items.add_time | formatDate}}</span>
              </div>
              <div class="a2">
                <span>+{{items.score}}</span>
              </div>
            </li>
          </ul>
        </van-list>
      </van-tab>
      <van-tab title="现金收益">
        <van-list v-model="loadingRight" :finished="finishedRight" finished-text="没有更多了" @load="onLoadRight" :offset="offsetRight">
          <ul class="tab-nav">
            <li v-for="items in listst" :key="items.id">
              <div class="a1">
                <i>{{items.title}}</i>

                <span class="tab-left">{{items.add_time | formatDate}}</span>
              </div>
              <div class="a2">
                <span>+{{items.score}}</span>
              </div>
            </li>
          </ul>
        </van-list>
      </van-tab>
    </van-tabs>
    <div>
      <van-dialog v-model="show" title="收益说明" class="dialogtxt" close-on-click-overlay confirmButtonColor="#1989fa">
        <p>1.你可以通过完成本APP内提供的任务来内提供的任务来赚取金币、现金。</p>
        <p>2.金币每晚回自动兑换成现金，汇率受每日广告收益影响，会有浮动。</p>
        <p>3.若金币没有及时到账，别担心，可能会有延迟。</p>
        <p>4.用户可在平台发布文章，每发布一篇文章可获得200金币，若文章上热榜可再获得200金币，如果文章持续3天上热榜则可在原有的基础上再获得200金币。</p>
        <p>
          5.如果您连续30日未登录本APP，那么此前发放的奖励讲过期，
          <span>系统会在奖励到期前发送提现提醒，逾期未提现将视为用户自愿放弃提现的权利，我的账户里面的金额将被清零。</span>
        </p>
        <p>我们应用先进的人工智能分析您的行为，如发现造假等违规操作，我们有权阻止您使用（填写邀请码、领取金币、提现、奖励）以及取消您获得的奖励。</p>
      </van-dialog>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Dialog } from 'vant'

import { formatDate } from '../commom/common.js'
export default {
  filters: {
    formatDate(time) {
      time = time * 1000
      let date = new Date(time)
      // console.log(new Date(time))
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  name: 'account',
  data() {
    return {
      active: 2,
      handleinfo: {}, //收益
      lists: [], //金币列表
      listst: [], // 现金列表
      show: false,
      loadingLeft: false,
      loadingRight: false,
      finishedleft: false,
      finishedRight: false,
      offsetLeft: 200,
      offsetRight: 200,
      pageLeft: 0,
      pageRight: 0
    }
  },
  methods: {
    onLoadLeft() {
      this.handlelist()
    },
    onLoadRight() {
      this.handlecash()
    },
    // 收益
    async info() {
      // console.log(this.handleinfo)

      var id = { id: localStorage.getItem('userid') }
      const res = await axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/user/info',
        data: id
      })
      this.handleinfo = res.data.pojo
    },
    // 金币收益列表
    async handlelist() {
      this.pageLeft = this.pageLeft + 1
      const res = await axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/pointNote/find',
        data: {
          page: this.pageLeft,
          size: 15
        },
        transformRequest: [
          function(data) {
            // console.log(data)
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

      if (res.data.result == true) {
        this.lists = this.lists.concat(res.data.pojo.list)

        // console.log(this.lists)
      } else if (res.data.result == false) {
        this.finishedleft = true
      }
      this.loadingLeft = false
    },
    // 现金收益列表
    async handlecash() {
      this.pageRight = this.pageRight + 1
      const res = await axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/moneynote/findMoneyNote',
        data: {
          page: this.pageRight,
          size: 15
        },
        transformRequest: [
          function(data) {
            // console.log(data)
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
      // this.$toast(res.data.msg);
      if (res.data.msg == '用户未登录') {
        this.$router.push({
          path: '/land'
        })
      } else if (res.data.result == true) {
        this.listst = this.listst.concat(res.data.pojo.list)
        console.log(res.data.pojo)
      } else if (res.data.result == false) {
        console.log(res)
        this.finishedRight = true
      }
      this.loadingRight = false
    },
    // 收益说明
    dialog() {
      this.show = true
    },
    handledrawal() {
      this.$router.push({
        path: '/withdrawal'
      })
    },
    //转化现金
    async transfromMoney() {
      if (this.handleinfo.score == 0) {
        this.$toast('您没有金币可以转换')
      } else {
        const res = await axios({
          method: 'post',
          url: this.GLOBAL.baseURL + '/moneynote/conversion'
        })
        console.log(res)
        if (res.data.result == true) {
          this.$toast(res.data.msg)
          this.$router.go(0)
        }
      }
    }
  },
  created() {
    this.info()
  }
}
</script>
<style  lang="less" scoped>
.px2rem(@name, @px) {
  @{name}: @px / 75 * 1rem;
}

.banner {
  background: #f4f5f7;
}
.van-nav-bar {
  background-color: transparent;
  border-bottom: 0px;
}
.van-hairline--bottom::after {
  border-bottom-width: 0px;
}

.van-tabs--line /deep/ .van-tabs__wrap {
  border-bottom: 1px solid #eaeaea;
  height: 44px;
}
.dialogtxt {
  padding: 20px 20px 0 20px;
  p {
    color: #666666;
    .px2rem(font-size, 28);
    font-family: SourceHanSansCN-Normal, SourceHanSansCN;
    font-weight: 400;
    .px2rem(margin-top, 14);
    .px2rem(letter-spacing, 4);
  }
  span {
    color: #000;
  }
}
.van-icon {
  color: #fff;
  .px2rem(font-size, 40);
}
.van-nav-bar__text {
  color: #fff;
  .px2rem(font-size, 32);
}
.nav-banner {
  width: 100%;
  .px2rem(height, 440);
  background: url(../assets/Ellipse.png) no-repeat;
  background-size: contain;
  h1 {
    text-align: center;
    .px2rem(font-size, 26);
    color: #fff;
  }
  .item-1 {
    display: flex;
    .px2rem(padding-left, 150);

    color: #fff;
    p {
      .px2rem(font-size, 28);
    }
  }
  .item-2 {
    display: flex;
    .px2rem(padding-right, 150);

    color: #fff;
    p {
      .px2rem(font-size, 28);
    }
  }
  i {
    font-style: normal;
    .px2rem(margin-bottom, 24);
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    .px2rem(font-size, 40);
    display: flex;
    justify-content: center;
    align-items: conter;
  }
}
.sfsss {
  height: 60px;
  justify-content: center;
  align-items: center;
  line-height: normal;
}
.van-tabs {
  .px2rem(padding-top, 25);
}
.tab-left {
  color: #999;
}
.tab-nav {
  position: relative;
  .px2rem(font-size, 18);
  i {
    padding-left: 20px;
    font-size: 16px;
    font-style: normal;

    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 600;
  }
  span {
    padding-left: 20px;

    font-family: Roboto-Regular, Roboto;
    font-weight: 400;
    font-size: 14px;
  }
  li {
    display: flex;
    background: #fff;
    border-bottom: 1px solid #eaeaea;
  }
  .a1 {
    display: flex;
    height: 58px;
    flex-direction: column;
    width: 70%;
    justify-content: space-evenly;
  }
  .a2 {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-left: 30px;
    align-items: center;
    width: 30%;
    font-size: 17px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: rgba(250, 92, 18, 1);
    text-align: center;
    span {
      font-size: 14px;
    }
  }
}

.tab-buttom {
  display: table;
  width: 94px;
  background: #fff;
  // .px2rem(height, 60);
  border-radius: 14px;
  margin: 0 auto;
  .px2rem(margin-top, -30);
  box-shadow: 0px 0px 3px 0px #fa5c12;
  i {
    display: table-cell;
    vertical-align: middle;
    padding-left: 30px;
    padding-top: 4px;
    padding-bottom: 4px;
    font-style: normal;
    font-size: 18px;
    color: #fa5c12;
  }
}
.transfrom {
  cursor: pointer;

  img {
    width: 32px;
    height: 32px;
  }
}
/deep/ .van-tabs__wrap .van-tab--active {
  color: #fa5c12;
  font-size: 14px;
}
/deep/ span.van-ellipsis {
  font-size: 17px;
  font-family: SourceHanSansCN-Medium, SourceHanSansCN;
  font-weight: 600;
  // color: rgba(250, 92, 18, 1);
}
/deep/.van-list {
  margin-top: 0px;
}
/deep/ .van-tabs__line {
  display: none;
}
.itemItem {
  height: 140px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

/deep/ .van-nav-bar__title.van-ellipsis {
  font-size: 0.48rem;
  font-family: SourceHanSansCN-Medium, SourceHanSansCN;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
/deep/.van-nav-bar .van-icon {
  color: #ffffff;
}
/deep/ .van-nav-bar__text {
  font-size: 0.43rem;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
</style>


