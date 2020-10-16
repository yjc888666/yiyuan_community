<template>
  <div class="follow-nav">
    <div class="header">
      <div>
        <img src="../assets/jiantoua.png" alt @click="$router.back()" />
      </div>
      <p>我的关注</p>
    </div>
    <van-tabs @click="onClick" v-model="active" class="tabs1">
      <van-tab title="我的关注" name="acc">
        <div class="handlenav">
          <div class="nav" v-for="items in follow" :key="items.id">
            <div class="follow-left">
              <img :src="GLOBAL.basesURL+items.userhead" alt />
            </div>
            <span>{{items.name}}</span>
            <br />
            <i class="spanss">{{items.description}}</i>
            <div class="follow-rights">
              <button
                type="danger"
                :class="{'button':items.type == 2}"
                @click="btn(items.id,$event)"
              >已关注</button>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="感兴趣的人" name="second">
        <div class="handlenav">
          <div class="nav" v-for="items in tuijian" :key="items.id">
            <div class="follow-left">
              <img :src="GLOBAL.basesURL+items.userhead" alt />
            </div>
            <span>{{items.name}}</span>
            <br />
            <div class="a1">{{items.description}}</div>
            <!-- <i class="spanss">{{items.account_introduction}}</i> -->
            <div class="follow-right">
              <button
                type="danger"
                :class="{'button':items.type == 2}"
                @click="btn(items.id,$event)"
              >关注</button>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "follow",
  data() {
    return {
      active: "second",
      page: "",
      size: "",
      type: "",
      follow: [],
      tuijian: [],
      handshow: false, //推荐关注
      handlefollowshow: false, //关注的
      crr: ""
    };
  },
  methods: {
    onClick(name, title) {},
    //   我的关注查询
    async handlefollow() {
      var date = {
        page: "50",
        size: "1",
        type: 2
      };
      const res = await axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/attent/page?type=" + 1,
        data: date
      });
      this.follow = res.data.list;
      if (res.data.list) {
        this.handlefollowshow = true;
      } else {
        this.handshow = true;
      }
      if (res.data.list[0] == "用户未登录") {
        this.$router.push({
          path: "/land"
        });
      }
    },
    // 推荐关注
    async handleguanzhu() {
      var date = {
        sex: 10
      };
      const res = await axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/attent/rand",
        data: date
      });
      this.tuijian = res.data.pojo;
    },
    btn(id, e) {
      var date = {
        action: "care",
        id: id
      };
      this.$axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/user/interact",
        data: date,
        transformRequest: [
          function(data) {
            // console.log(data)
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
        // this.handlefollow();
        // this.handleguanzhu();
        // location.reload();
        this.crr = res.data.result;
        if (this.crr) {
          console.log(res.data.pojo.iscare);
          if (res.data.pojo.iscare) {
            e.target.style.background = "#f0f0f0";
            e.target.style.html = "#999";
          } else {
            e.target.style.background = "#03A9F4";
            e.target.style.color = "#fff";
          }
        } else {
          this.$router.push({
            path: "/land"
          });
        }
      });
    }
  },
  created() {
    this.handlefollow();
    this.handleguanzhu();
    var searchURL = window.location.href.split("?");
    if (searchURL[1] !== "tab=second") {
      this.active = "";
    }
  }
};
</script>

<style scoped lang="less">
.px2rem(@name,@px) {
  @{name}: @px / 75 * 1rem;
}
.follow-nav {
  width: 100%;
  height: 100vh;
  background: #f4f5f7;
}
.handlenav {
  .px2rem(margin-top, 20);
}
.nav {
  position: relative;
  .px2rem(height, 148);
  background: #fff;
  border-bottom: 1px solid #eaeaea;
  span {
    .px2rem(font-size, 29);
    font-family: SourceHanSansCN-Normal, SourceHanSansCN;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
    .px2rem(line-height, 90);
    .px2rem(padding-left, 20);
  }
  .a1 {
    position: absolute;
    width: 60%;
    .px2rem(padding-left, 120);
    font-size: 12px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box; //作为弹性伸缩盒子模型显示。
    -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
    -webkit-line-clamp: 1; //显示的行
  }
}
.spanss {
  // .px2rem(line-height, 55);
  padding-left: 12px;
  font-size: 12px;
  .px2rem(margin-top, 6);
  font-style: normal;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
}
.follow-left {
  float: left;
  .px2rem(padding-left, 16);
  width: 43px;
  background-color: #fff;
  img {
    .px2rem(height, 90);
    .px2rem(width, 90);
    .px2rem(margin-top, 32);
    border-radius: 50%;
    background: #fff;
  }
}
.follow-right {
  width: 100px;
  background: pink;
  float: right;
  .px2rem(padding-right, 15);
  button {
    .px2rem(margin-top, 50);
    .px2rem(margin-left, 30);
    top: 0;
    position: absolute;
    .px2rem(width, 123);
    .px2rem(height, 50);
    .px2rem(font-size, 24);
    background: #03a9f4 url(../assets/button-jia.png) 8px no-repeat;
    background-size: 21%;
    color: #fff;
    .px2rem(padding-left, 20);
    .px2rem(border-radius, 33);
    border: none;
  }
}
.follow-rights {
  width: 100px;
  float: right;
  .px2rem(padding-right, 15);
  button {
    .px2rem(margin-top, 48);
    .px2rem(margin-left, 30);
    top: 0;
    position: absolute;
    .px2rem(width, 123);
    .px2rem(height, 50);
    .px2rem(font-size, 24);
    background: #fff;
    border: 1px solid #e3e3e3;
    color: #999999;
    .px2rem(border-radius, 33);
  }
}
.van-icon-arrow-left {
  display: inline-block;
}
.header {
  width: 100%;
  .px2rem(height, 110);
  display: flex;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #f6f6f6;
  box-shadow: 0px 0px 5px 1px #f6f6f6;
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
.van-tabs__wrap /deep/.van-tab--active {
  color: #03a9f4;
}
.van-tabs /deep/ .van-ellipsis {
  .px2rem(font-size, 34);
}
</style>
<style>
.van-tab--active {
  color: #03a9f4;
}
.van-tabs__line {
  background-color: #fff;
}
.tabs1 .van-tabs__wrap .van-tabs__nav--line{
   padding-bottom: 0px;
}
.tabs1 .van-tabs__wrap .van-tabs__line{
  bottom: 0px;
}
</style>
