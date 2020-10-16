<template>
  <div class="setup">
    <div class="banner">
      <img src="../assets/jinbi1.png" alt="">
      <div class="post-ss">
        <div class="post-left">
          <img v-lazy="GLOBAL.basesURL +touxiang" alt="">

        </div>

        <p class="post-right">{{gold.score_num}}<i>金币</i></P>
      </div>
      <div class="post-s1">
        <!-- <a href="#" @click="handleSee">点击查看</a> -->
        <p @click="handleSee">点击查看</p>
      </div>
      <!-- <img src="../assets/myjinbi.png" alt=""> -->
    </div>
    <div class="jinbirenwu">
      <div class="hudabao">
        <h3>金币任务</h3>
      </div>
      <dl>
        <dt><img src="../assets/签到+.png" alt=""></dt>
        <dd>
          <div>
            <p>每日签到
              <!-- <img src="../assets/pic-0009.png" alt="">
                            <span>+1金币</span> -->
            </p>
            <span class="s1">连续签到一周，可领取10个金币</span>
          </div>
          <button :disabled='disabled' @click="handleSign">签到</button>
        </dd>
      </dl>
      <dl>
        <dt><img src="../assets/pic-0004.png" alt=""></dt>
        <dd>
          <div>
            <p>邀请好友
              <!-- <img src="../assets/jinbi3.png" alt=""> -->
              <!-- <span style="color:red">31元</span> -->
            </p>
            <span class="s1">首次邀请好友送1金币</span>
          </div>
          <button @click="handleInvitation">去邀请</button>
        </dd>
      </dl>
      <dl>
        <dt><img src="../assets/pic-0001.png" alt=""></dt>
        <dd>
          <div>
            <p>关注用户 <img src="../assets/pic-0009.png" alt="">
              <span>+1金币</span>
            </p>
            <span class="s1">完成{{comelist.attention_num}}/4次</span>
          </div>
          <button :disabled="comelist.attention_num==4?true:false" @click="hanlefollow">{{comelist.attention_num==4?'已完成':'去关注'}}</button>
        </dd>
      </dl>
      <dl>
        <dt><img src="../assets/pic-0002.png" alt=""></dt>
        <dd>
          <div>
            <p>点赞 <img src="../assets/pic-0009.png" alt="">
              <span>+1金币</span>
            </p>
            <span class="s1">完成{{comelist.zan_num}}/10次</span>
          </div>
          <button :disabled="comelist.zan_num==10?true:false" @click="handlecomplete">{{comelist.zan_num>10?'已完成':'去完成'}}</button>
        </dd>
      </dl>
      <dl>
        <dt><img src="../assets/pic-0003.png" alt=""></dt>
        <dd>
          <div>
            <p>分享内容 <img src="../assets/pic-0009.png" alt="">
              <span>+1金币</span>
            </p>
            <span class="s1">完成{{comelist.share_num}}/5次</span>
          </div>
          <button :disabled="comelist.share_num==5?true:false" @click="handleshare">{{comelist.share_num==5?'已完成':'去完成'}}</button>
        </dd>
      </dl>
      <dl>
        <dt><img src="../assets/pic-0008.png" alt=""></dt>
        <dd>
          <div>
            <p>发表评论<img src="../assets/pic-0009.png" alt="">
              <span>+1金币</span>
            </p>
            <span class="s1">完成{{comelist.commentadd_num}}/10次</span>
          </div>
          <button :disabled="comelist.commentadd_num==10?true:false" @click="handlePublish">{{comelist.commentadd_num==10?'已完成':'去完成'}}</button>
        </dd>
      </dl>

    </div>
    <div class="jinbiren">
      <h3>文章收益</h3>
      <dl>
        <dt><img src="../assets/pic-0006.png" alt=""></dt>
        <dd>
          <div>
            <p>发布文章 <img src="../assets/pic-0009.png" alt="">
              <span>+700金币</span>
            </p>
            <span class="s1">已完成{{comelist.forum_num}}/1次</span>
          </div>
          <button :disabled="comelist.forum_num==1?true:false" @click="handlearticle">{{comelist.forum_num==1?'已完成':'去完成'}}</button>
        </dd>
      </dl>
      <dl>
        <dt><img src="../assets/pic-0007.png" alt=""></dt>
        <dd>
          <div>
            <p>上热榜 <img src="../assets/pic-0009.png" alt="">
              <span>1金币</span>
            </p>
            <span class="s1">持续是那个热榜3天可增加1金币</span>
          </div>
          <button>去完成</button>
        </dd>
      </dl>

    </div>
    <div class="jinbi">
      <h3>积分兑换商城</h3>
      <dl>
        <dt><img src="../assets/pic-0005.png" alt=""></dt>
        <dd>
          <div>
            <p>商城</p>
          </div>
          <button>点击进入</button>
        </dd>
      </dl>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'coin',
  data() {
    return {
      comelist: {}, //点赞数量 关注数量 评论数量
      gold: {}, //金币
      disabled: false,
      hanleputong: false,
      handleweixin: false,
      touxiang: ''
    }
  },
  methods: {
    fanhui() {
      this.$router.push({
        path: '/my'
      })
    },
    handleInvitation() {
      this.$router.push({
        path: '/vitation'
      })
    },
    handleSee() {
      this.$router.push({
        path: '/account'
      })
    },
    handlecomplete() {
      this.$router.push({
        path: '/onepage'
      })
    },
    handlescompletes() {
      this.$router.push({
        path: '/onepage'
      })
    },
    handlePublish() {
      this.$router.push({
        path: '/onepage'
      })
    },
    handlearticle() {
      this.$router.push({
        path: '/release'
      })
    },
    hanlefollow() {
      this.$router.push({
        path: '/onepage'
      })
    },
    handleshare() {
      this.$router.push({
        path: '/onepage'
      })
    },
    async handleIncomelist() {
      var id = { id: '' }
      const res = await axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/user/info',
        data: id
      })
      this.comelist = res.data.pojo
      var openid = localStorage.getItem('openid')
      if (openid) {
        this.handleweixin = true
      } else {
        this.hanleputong = true
      }
    },

    // 签到
    handleSign() {
      if (this.disabled == true) {
        this.disabled = !this.disabled
      } else {
        this.$axios({
          method: 'post',
          url: this.GLOBAL.baseURL + '/usersign/sign'
        }).then(res => {
          if (res.data.msg == '用户未登录') {
            this.$router.push({
              path: '/land'
            })
          } else {
            this.$toast(res.data.msg)
          }
        })
      }
    },
    // 现金收益
    async goldcoin() {
      var id = { id: '' }
      const res = await axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/user/info',
        data: id
      })
      this.gold = res.data.pojo
      if (res.data.pojo.land == 1) {
        this.touxiang = res.data.pojo.userhead
      } else {
        this.touxiang = res.data.pojo.headimgurl
      }
    }
  },
  created() {
    this.handleIncomelist() //邀请
    // this.handleshare();//分享
    this.goldcoin() //金币
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
  }
}
</script>

<style scoped lang="less">
.px2rem(@name, @px) {
  @{name}: @px / 75 * 1rem;
}
.setup {
  background: #f4f5f7;
}
.header {
  width: 100%;
  .px2rem(height, 110);
  background: #fff;
  border-bottom: 1px solid #f6f6f6;
  box-shadow: 0px 0px 5px 1px #f6f6f6;
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
    .px2rem(font-size, 38);
    font-weight: 400;
  }
}

.banner {
  position: relative;
  background: #ffffff;
  img:first-child {
    width: 100%;
  }
  img:last-child {
    display: block;
    width: 90%;
    margin: 0 auto;
  }
}
.post-ss {
  position: absolute;
  display: table;
  // .px2rem(width, 149);
  // width: 25%;
  width: fit-content;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  .px2rem(height, 35);
  background: rgba(255, 255, 255, 1);
  .px2rem(border-radius, 45);
  .px2rem(left, 52);
  .px2rem(top, 25);
  .px2rem(padding, 5);
  color: #f94e2b;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: normal;
  .post-left {
    width: 20px;
    border-radius: 50%;
    float: left;

    img {
      width: 85%;
      height: 16px;
      border-radius: 50%;
    }
  }
  .post-right {
    float: right;
    display: table-cell;
    vertical-align: middle;
    .px2rem(padding-left, 8);
    .px2rem(font-size, 28);
    // .px2rem(padding-top, 4);
  }
  p {
    font-size: 10px;
  }
  i {
    font-style: normal;
    .px2rem(font-size, 28);
    color: #000;
  }
}
.post-s1 {
  position: absolute;
  .px2rem(width, 181);
  background: rgba(221, 59, 0, 1);
  .px2rem(border-radius, 45);
  .px2rem(left, 52);
  display: table;
  .px2rem(top, 360);
  p {
    color: #ffffff;
    .px2rem(padding, 6);
    text-align: center;
    .px2rem(font-size, 29);
    font-family: SourceHanSansCN-Bold, SourceHanSansCN;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
  }
}
.jinbirenwu {
  background: #fff;
  .hudabao {
    h3 {
      .px2rem(font-size, 33);
      .px2rem(padding-left, 30);
      .px2rem(padding-top, 20);
      .px2rem(padding-bottom, 20);
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 600;
      color: rgba(0, 0, 0, 1);
    }
  }

  dl {
    display: flex;
    .px2rem(height, 115);
    dd {
      border-bottom: 1px solid #f3f3f3;
      .px2rem(margin-right, 20);
      width: 85%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div {
        .s1 {
          .px2rem(font-size, 24);
          font-weight: Roboto;
          color: #6d7278;
          .px2rem(line-height, 52);
        }
        p {
          display: flex;
          align-items: center;
          .px2rem(font-size, 29);
          font-family: SourceHanSansCN-Medium, SourceHanSansCN;
          font-weight: 600;
          color: rgba(0, 0, 0, 1);
          .px2rem(margin-top, 16);
          span {
            color: #fa6400;
          }
          img {
            .px2rem(margin-left, 20);
            .px2rem(margin-right, 20);
            .px2rem(width, 35);
            .px2rem(height, 35);
          }
        }
      }
      button {
        .px2rem(width, 120);
        .px2rem(padding, 5);
        border: 1px solid #fa6400;
        background: #fff;
        color: #fa6400;
        .px2rem(border-radius, 45);
        .px2rem(font-size, 24);
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
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

.jinbiren {
  background: #fff;
  .px2rem(margin-top, 20);
  h3 {
    .px2rem(font-size, 30);
    .px2rem(padding-left, 30);
    .px2rem(line-height, 90);
  }
  dl {
    display: flex;
    .px2rem(height, 115);

    dd {
      border-bottom: 1px solid #f3f3f3;
      .px2rem(margin-right, 20);
      width: 85%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div {
        .s1 {
          .px2rem(font-size, 24);
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #6d7278;
          line-height: 28px;
        }
        p {
          display: flex;
          align-items: center;
          .px2rem(font-size, 29);
          font-family: SourceHanSansCN-Medium, SourceHanSansCN;
          font-weight: 600;
          color: rgba(0, 0, 0, 1);
          span {
            color: #fa6400;
          }
          img {
            .px2rem(margin-left, 20);
            .px2rem(margin-right, 20);
            .px2rem(width, 35);
            .px2rem(height, 35);
          }
        }
      }
      button {
        .px2rem(width, 120);
        .px2rem(padding, 5);
        border: 1px solid #fa6400;
        background: #fff;
        color: #fa6400;
        .px2rem(border-radius, 45);
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
.jinbi {
  background: #fff;
  .px2rem(margin-top, 20);
  .px2rem(margin-bottom, 120);
  h3 {
    .px2rem(font-size, 29);
    .px2rem(padding-left, 30);
    .px2rem(line-height, 90);
  }
  dl {
    display: flex;
    .px2rem(height, 115);

    dd {
      border-bottom: 1px solid #f3f3f3;
      .px2rem(margin-right, 20);
      width: 85%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div {
        .s1 {
          .px2rem(font-size, 24);
        }
        p {
          display: flex;
          align-items: center;
          .px2rem(font-size, 32);
          font-family: SourceHanSansCN-Medium, SourceHanSansCN;
          font-weight: 600;
          color: rgba(0, 0, 0, 1);
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
      button {
        .px2rem(width, 120);
        .px2rem(height, 45);
        border: 1px solid #fa6400;
        background: #fff;
        color: #fa6400;
        .px2rem(border-radius, 45);
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
</style>
