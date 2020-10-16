<template>
  <div class="box">
    <div id="popBox" v-if="showpop" @click="closebox">
      <img src="../assets/jianjian.png" alt="">
      <span>点击上方去分享</span>
    </div>
    <div class="xiangqing">
      <i @click="backHome"><img src="../assets/fanhui.png" alt=""></i>
      <h1 :title="title">{{title}}</h1>
      <div class="touxiang">
        <p>
          <span><img style="object-fit: cover;" :src="GLOBAL.basesURL + userheads" preview="0" preview-text="" alt=""></span>
          <ul>
            <li>{{username}}</li>
            <li class="li1">{{time}}</li>
          </ul>
        </p>
        <button :class="{'btn':ifcare}" @click="btn($event)">{{ifcare?'已':''}}关注</button>
      </div>
    </div>
    <div class="ql-editor" v-html="content">
      <!-- 文章内容 -->
    </div>
    <div class="information">
      <h2>内容推荐</h2>
      <ul>
        <li v-for="(item,index) in recommendData" :key='index' @click="todetails(item.id)">
          <div class="information-left2" v-if="item.uploadPic==null ||item.uploadPic==[] ||item.uploadPic.length==0">
            <p>{{item.title}}</p>
          </div>
          <div class="information-left" v-else>
            <p>{{item.title}}</p>
          </div>

          <div class="information-right" v-if="item.uploadPic!=null &&item.uploadPic!=[] &&item.uploadPic.length!=0">
            <img :src=" GLOBAL.basesURL + item.uploadPic[0]" alt="">
          </div>
        </li>

      </ul>
    </div>
    <div class="pinglun">
      <p>评论</p>
      <div class="ping" v-for="(item,index) in pinglunList" :key="index">
        <dl>
          <dt>
            <span>
              <img style="object-fit: cover;" :src="GLOBAL.basesURL + item.userhead" alt="">
            </span>
          </dt>
          <dd>
            <p>{{item.username}}</p>
            <div class="div1">
              {{item.content}}
            </div>
            <div class="div2">
              <div>{{item.time}}</div>
              <ul>
                <li><span>{{item.zan?item.zan:'0'}}</span><img src="../assets/zan.png" alt="" @click="zanzan(item.id)"></li>
                <li><span>评论</span><img src="../assets/pinglun.png" alt="" @click="huifu(item.fuid,item.id,item.username)"></li>
              </ul>
            </div>
            <div class="pinghuifu">
              <p v-for="(items,index) in pinglunListerzi" :key="index" v-if="item.id == items.tid">{{items.username}}: <span class="sss">{{items.content}}</span><span class="s1"></span></p>
            </div>
          </dd>
        </dl>
      </div>
    </div>
    <div class="footer" v-show="!isshow">
      <p>
        <input type="text" onfocus="this.placeholder=''" onblur="this.placeholder='写评论'" placeholder="写评论" @click="dianji">
      </p>
      <ul>
        <li @click="dianji"><img src="../assets/pinglun.png" alt=""></li>
        <li @click="shareToWechat"><img src="../assets/zhuanfa.png" alt=""></li>
        <li @click="shoucang"><img class="handleshoucang" src="../assets/shoucangss.png" alt="" v-show="ifcollect"><img class="handleshoucang" src="../assets/shoucangs.png" alt="" v-show="!ifcollect"></li>
        <li @click="dianzan"><img src="../assets/zan.png" alt="" v-show="!zan"><img src="../assets/zanzan.png" alt="" v-show="zan"></li>
      </ul>

    </div>
    <van-popup v-model="isshow" position="bottom">
      <div class="div">
        <div>
          <textarea ref="Inputval" type="text" :placeholder="aite" v-model="pinglun"></textarea>
          <ol>
            <button :disabled="btnState==false" :class="{btnBg:btnState}" @click="fabiao">发布</button>
          </ol>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import axios from 'axios'
import wxapi from '../commom/wx'
var shares = null
export default {
  name: 'index',
  data() {
    return {
      title: '',
      content: '',
      userhead: '是',
      time: '',
      username: '',
      isshow: false,
      pinglun: '',
      pinglunList: [],
      pinglunListerzi: [],
      fo: false,
      aite: '',
      fuid: '',
      zan: false,
      ifcollect: false,
      ifcare: localStorage.getItem('isguanzhu'),
      uid: '',
      showpop: false,
      description: '',
      uploadPic: [],
      textshuo: '',
      userheads: '',
      field: '',
      recommendData: ''
    }
  },
  computed: {
    btnState() {
      return this.pinglun !== ''
    }
  },
  directives: {
    focus: {
      inserted: function(el, { value }) {
        if (value) {
          el.focus()
        }
      }
    }
  },
  methods: {
    backHome() {
      this.$router.push('/onepage')
    },
    todetails(id) {
      this.$router.replace({
        path: `/post_details/${id}`
      })
      this.$router.go(0)
    },
    btn(e) {
      var date = {
        action: 'care',
        id: this.uid
      }
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/user/interact',
        data: date,
        transformRequest: [
          function(data) {
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
        console.log(res)
        if (res.data.result) {
          if (res.data.pojo.iscare) {
            e.target.style.background = '#f0f0f0'
            e.target.style.color = '#999'
          } else {
            e.target.style.background = '#03A9F4'
            e.target.style.color = '#fff'
          }
        } else {
          // this.$toast(res.data.msg);
          this.$router.push({
            path: '/land'
          })
        }
        this.info()
      })
    },
    // 点赞、收藏、关注
    zanzan(id) {
      // console.log(id)
      var id = id
      var date = {
        action: 'zan',
        target: 'comment',
        id: id
      }
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/user/interact',
        data: date,
        transformRequest: [
          function(data) {
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
        if (res.data.msg == '用户未登陆') {
          this.$toast('登录状态验证失败，请重新登录！')
        } else {
          if (res.data.result) {
            this.$toast('操作成功！')
            this.info()
          } else {
            this.$toast(res.data.msg)
          }
        }
      })
    },
    huifu(fuid, id, username) {
      // console.log(1)
      this.fuid = id
      this.isshow = true
      this.aite = '@' + username
      this.$nextTick(function() {
        //DOM 更新了
        this.$refs.Inputval.focus()
      })
      // console.log(fuid,id)
    },
    // 点赞
    dianzan() {
      var id = this.$route.params.id
      var date = {
        action: 'zan',
        target: 'forum',
        id: id
      }
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/user/interact',
        data: date,
        transformRequest: [
          function(data) {
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
        this.info()
        // console.log(res.data.login)
        if (res.data.login == false) {
          this.$router.push({
            path: '/land'
          })
        } else {
          this.$toast(res.data.msg)
        }
        this.$toast(res.data.msg)
      })
    },
    // 发布
    fabiao() {
      if (this.pinglun == '') {
        this.$toast('评论不能为空')
      } else {
        var id = this.$route.params.id
        if (this.$refs.Inputval.placeholder) {
          this.axios({
            method: 'post',
            url: this.GLOBAL.baseURL + '/comment/add',
            data: {
              fid: id,
              tid: this.fuid,
              content: this.pinglun
            }
          }).then(res => {
            this.$toast(res.data.msg)
            // console.log(res)
            this.info()
            this.pinglun = ''
            this.aite = ''
            this.isshow = false
          })
        } else {
          this.axios({
            method: 'post',
            url: this.GLOBAL.baseURL + '/comment/add',
            data: {
              fid: id,
              content: this.pinglun
            }
          }).then(res => {
            console.log(res)
            this.info()
            this.pinglun = ''
            this.isshow = false
            if (res.data.login == false) {
              this.$router.push({
                path: '/land'
              })
            } else {
              this.$toast(res.data.msg)
            }
          })
        }
      }
    },
    // 收藏
    shoucang() {
      var id = this.$route.params.id
      var date = {
        action: 'collect',
        target: 'forum',
        id: id,
        field: ''
      }
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/user/interact',
        data: date,
        transformRequest: [
          function(data) {
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
        this.info()
        console.log(res)
        if (res.data.login == false) {
          this.$router.push({
            path: '/land'
          })
        }
      })
    },
    dianji() {
      this.isshow = true
      this.$nextTick(function() {
        //DOM 更新了
        this.$refs.Inputval.focus()
      })
    },
    info() {
      var id = this.$route.params.id
      // console.log(id)
      this.axios({
        method: 'get',
        url: this.GLOBAL.baseURL + '/forum/info?id=' + id,
        // data: {
        //     id: id
        // },
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
      }).then(res => {
        console.log(res)
        this.content = res.data.pojo.content
        this.userheads = res.data.pojo.userhead
        this.title = res.data.pojo.title
        this.userhead = res.data.pojo.account_img
        this.username = res.data.pojo.username
        this.time = res.data.pojo.time
        this.zan = res.data.pojo.ifzan
        this.ifcollect = res.data.pojo.ifcollect
        this.uid = res.data.pojo.uid
        this.ifcare = res.data.pojo.ifcare
        this.description = res.data.pojo.description
        this.uploadPic = res.data.pojo.uploadPic
        this.field = res.data.pojo.field
        this.getRecommend()
      })
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/comment/bypage',
        data: {
          id: id,
          size: 50
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
      }).then(res => {
        // console.log(res.data.list)
        var pinglunList = []
        var pinglunListerzi = []
        for (var i = 0; i < res.data.list.length; i++) {
          if (res.data.list[i].tid == '0') {
            pinglunList.push(res.data.list[i])
          } else {
            pinglunListerzi.push(res.data.list[i])
          }
        }
        this.pinglunList = pinglunList
        this.pinglunListerzi = pinglunListerzi
      })
    },
    // 分享
    async handleshare() {
      var id = this.$route.params.id
      const res = await axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/pointNote/share?id=' + id
      })
      // console.log(res)
    },
    shareToWechat() {
      this.showpop = true
    },
    closebox() {
      this.showpop = false
    },
    wxRegCallback() {
      // 用于微信JS-SDK回调
      this.wxShareTimeline()
      this.wxShareAppMessage()
    },
    wxShareTimeline() {
      console.log(this.title)
      console.log(this.description)

      // 微信自定义分享到朋友圈
      var option = {
        title: this.title,
        link: window.location.href.replace(window.location.search, ''),
        type: 'link',

        imgUrl: this.GLOBAL.basesURL + this.uploadPic,
        success: () => {
          alert('分享成功')
          this.handleshare()
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
      var option = {
        title: this.title,
        desc: this.description,
        link: window.location.href.split('#')[0] + '#' + window.location.href.split('#')[1],
        type: 'link',

        imgUrl: this.GLOBAL.basesURL + this.uploadPic,
        success: () => {
          alert('分享成功')
          this.handleshare()
        },
        error: () => {
          alert('已取消分享')
        }
      }
      // 将配置注入通用方法
      wxapi.ShareAppMessage(option)
    },
    getRecommend() {
      this.axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/forum/recommend',
        params: {
          field: this.field
        }
      }).then(res => {
        console.log(res.data.pojo)
        this.recommendData = res.data.pojo
      })
    }
  },
  created() {
    this.info()
  },
  mounted() {
    this.$previewRefresh()
    wxapi.wxRegister(this.wxRegCallback)
  }
}
</script>
<style scoped lang="less">
.px2rem(@name, @px) {
  @{name}: @px / 75 * 1rem;
}
.information {
  h2 {
    margin-top: 20px;
    padding-left: 14px;
    font-family: Source Han Sans CN;
    font-weight: 580;
    color: rgba(51, 51, 51, 1);
  }
  ul {
    padding: 0.4rem;
    li {
      margin-bottom: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .information-left {
        height: 71px;
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 65%;
        p {
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 21px;
        }
      }
      .information-left2 {
        width: 100%;
        height: 71px;
        display: flex;
        flex-direction: row;
        align-items: center;
        p {
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 21px;
        }
      }
      .information-right {
        width: 30%;
        height: 71px;
        img {
          width: 96px;
          height: 71px;
          border-radius: 4px;
        }
      }
    }
  }
}
/*button禁用时的背景颜色*/
button {
  color: #cccccc;
}
/*button可用时的背景颜色*/
.btnBg {
  color: #03a9f4;
}
.ql-editor {
  .px2rem(padding-left, 30);
  .px2rem(padding-right, 30);
}
#popBox {
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  background: #4a4a4a;
  opacity: 0.8;
  z-index: 1000;
  top: 0;
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
.sss {
  color: #666;
  word-break: break-word;
}
.ping {
  width: 100%;
  .px2rem(padding-top, 30);
  .px2rem(padding-bottom, 5);
  dl {
    display: flex;
    dt {
      .px2rem(padding-right, 15);
      .px2rem(width, 70);
      span {
        .px2rem(width, 70);
        .px2rem(height, 70);
        background: #f2f2f2;
        border-radius: 50%;
        display: inline-block;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    dd {
      width: 100vh;
      border-bottom: 1px solid #f3f3f3;
      p {
        color: #0082e4;
        .px2rem(font-size, 27);
      }
      .div1 {
        .px2rem(margin-top, 10);
        .px2rem(font-size, 29);
      }
      .div2 {
        .px2rem(line-height, 60);
        .px2rem(margin-top, 18);
        display: flex;
        justify-content: space-between;
        div {
          color: #999;
          .px2rem(font-size, 23);
        }
        ul {
          display: flex;
          width: 30%;
          justify-content: space-between;
          color: #999;
          li {
            // display: flex;
            // align-items: center;
            padding: 2px;
            span {
              .px2rem(font-size, 23);
              .px2rem(margin-right, 15);
            }
            img {
              .px2rem(width, 30);
              .px2rem(height, 30);
            }
          }
        }
      }
      .pinghuifu {
        p:first-child {
          position: relative;
        }
        p:last-child {
          .px2rem(padding-bottom, 20);
        }
        p {
          .px2rem(padding-top, 20);
          .px2rem(padding-left, 15);
          .px2rem(padding-right, 15);
        }
        width: 100%;
        background: #f3f3f3;
        .px2rem(margin-top, 20);
        .px2rem(margin-bottom, 20);
        .s1 {
          position: absolute;
          top: 0;
          width: 0;
          height: 0;
          border-right: 10px solid transparent;
          border-left: 10px solid transparent;
          border-bottom: 10px solid #f3f3f3;
          margin-top: -10px;
          left: 20px;
        }
      }
    }
  }
}
.pinglun {
  padding: 15px;
  p {
    .px2rem(font-size, 32);
  }
}
.pinglun::after {
  content: '';
  display: block;
  width: 100%;
  .px2rem(height, 150);
}
.footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  background: #fff;
  .px2rem(min-height, 100);
  .px2rem(padding-top, 20);
  .px2rem(padding-bottom, 20);
  display: flex;
  align-items: center;
  border-top: 1px solid #f3f3f3;
  p {
    width: 48%;
    .px2rem(height, 58);
    padding: 0 15px;
    input {
      background: #f0f0f0 url(../assets/Bitch.png) no-repeat 4px 2px;
      background-size: 17%;
      border: none;
      border-radius: 5px;
      width: 80%;
      height: 100%;
      .px2rem(padding-left, 74);
      .px2rem(padding-top, 4);
      .px2rem(padding-bottom, 4);
      font-size: 14px;
    }
  }
  ul {
    width: 50%;
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    margin-right: 10px;
    li {
      display: flex;
      width: 12%;
      padding-right: 15px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.div {
  width: 100%;
  .px2rem(height, 200);
  div {
    background: #fff;
    .px2rem(min-height, 55);
    .px2rem(padding-top, 20);
    .px2rem(padding-bottom, 20);
    ol {
      .px2rem(margin-top, 40);
      float: right;
      button {
        margin-right: 4%;
        border: none;
        .px2rem(width, 100);
        .px2rem(height, 48);
        .px2rem(font-size, 32);
        border-radius: 2px;
        .px2rem(margin-right, 20);
        background: #fff;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 600;
      }
    }
    textarea {
      border: none;
      background: #f3f3f3;
      border-radius: 3px;
      width: 77%;
      height: 68px;
      margin-left: 4%;
      padding-left: 3%;
      .px2rem(min-height, 55);
      resize: none;
      .px2rem(font-size, 29);
      .px2rem(padding-top, 10);
    }
  }
}
.handleshoucang {
  width: 120% !important;
  height: 130% !important;
}
.xiangqing {
  padding: 0 15px;
  h1 {
    .px2rem(font-size, 34);
    .px2rem(margin-top, 45);
    .px2rem(line-height, 50);
    .px2rem(margin-left, 50);
    font-family: SourceHanSansCN-Normal, SourceHanSansCN;
    font-weight: 600;
    color: #333333;
  }
  i {
    img {
      position: absolute;
      .px2rem(width, 40);
      .px2rem(padding-top, 7);
      .px2rem(margin-left, -12);
    }
  }
  .touxiang {
    .px2rem(margin-top, 40);
    .px2rem(margin-bottom, 14);
    .px2rem(height, 76);
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      display: flex;
      height: 100%;
      span {
        .px2rem(width, 69);
        .px2rem(height, 69);
        .px2rem(line-height, 69);
        background: #f2f2f2;
        border-radius: 50%;
        display: inline-block;
        overflow: hidden;
        .px2rem(margin-top, 8);
        img {
          width: 100%;
          height: 100%;
        }
      }
      ul {
        .px2rem(margin-top, 10);
        .px2rem(margin-left, 15);
        li {
          .px2rem(line-height, 30);
        }
        li:first-child {
          .px2rem(font-size, 29);
          font-weight: 1000;
          font-family: SourceHanSansCN-Normal, SourceHanSansCN;
          font-weight: 600;
          color: #333;
        }
        li:last-child {
          .px2rem(font-size, 25);
          color: #999;
          font-family: SourceHanSansCN-Normal, SourceHanSansCN;
          font-weight: 400;
          color: rgba(132, 132, 132, 1);
          .px2rem(margin-top, 14);
        }
      }
    }
    button {
      .px2rem(height, 45);
      .px2rem(width, 110);
      border: none;
      .px2rem(font-size, 25);
      background: #03a9f4;
      color: #fff;
      .px2rem(border-radius, 45);
    }
    .btn {
      background: #f3f3f3;
      color: #999;
    }
  }
  .zi {
    .px2rem(font-size, 30);
    .px2rem(line-height, 43);
  }
  .ul {
    .px2rem(margin-top, 58);
    dt {
      .px2rem(font-size, 30);
      .px2rem(line-height, 45);
    }
    dd {
      .px2rem(margin-top, 45);
      img {
        width: 100%;
      }
    }
  }
}
</style>
<style>
.ql-editor img {
  width: 100%;
  text-align: center;
  margin-top: 10px;
  margin-left: -12px;
  margin: 0 auto;
}
.ql-editor p {
  /* text-indent:12px; */
  line-height: 22px;
  letter-spacing: 1px;
  font-family: SourceHanSansCN-Normal, SourceHanSansCN;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  font-size: 16px;
}
</style>