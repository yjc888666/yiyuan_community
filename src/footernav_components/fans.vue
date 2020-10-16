<template>
  <div class="follow-nav">
    <div class="header">
      <div>
        <img src="../assets/jiantoua.png" alt @click="$router.back()" />
      </div>
      <p>我的粉丝</p>
    </div>
    <div class="nav" v-for="items in follow" :key="items.id">
      <div class="follow-left">
        <img :src="GLOBAL.basesURL+items.userhead" alt />
      </div>
      <span>{{items.name}}</span>
      <br />
      <i class="spanss">{{items.description}}</i>
      <div class="follow-right"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "fans",
  data() {
    return {
      page: "",
      size: "",
      type: "",
      follow: []
    };
  },
  methods: {
    //   我的关注查询
    async handlefollow() {
      var date = {
        //  id:localStorage.getItem("userid"),
        page: "50",
        size: "1",
        type: 2
      };
      const res = await axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/attent/page?type=" + 2,
        data: date
      });
      this.follow = res.data.list;
      if (res.data.list[0] == "用户未登录") {
        this.$router.push({
          path: "/land"
        });
      }
    }
  },
  created() {
    this.handlefollow();
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
  background: #F4F5F7;
}
.nav {
  .px2rem(height, 110);
  background: #fff;
  border-bottom: 1px solid #EAEAEA;
   span {
  .px2rem(font-size, 30);
    font-family: SourceHanSansCN-Normal, SourceHanSansCN;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
    padding-left: 7px;
  .px2rem(line-height, 60);
  }
  .spanss {
  // .px2rem(line-height, 55);
  padding-left: 10px;
  font-size: 12px;
  .px2rem(margin-top, 6);
  font-style: normal;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
}
}
.follow-left {
  float: left;
  .px2rem(padding-left, 15);
  img {
       height: 1.06666667rem;
    width: 1.06666667rem;
    margin-top: 0.2rem;
    border-radius: 50%;
    background: #fff;
  }
}
.follow-right {
  float: right;
  .px2rem(padding-right, 15);
  button {
    .px2rem(width, 123);
    .px2rem(height, 50);
    .px2rem(font-size, 20);
    background: #03a9f4;
    color: #fff;
    .px2rem(border-radius, 33);
    border: none;
  }
}
.header {
  width: 100%;
  .px2rem(height, 110);
  display: flex;
  align-items: center;
  background: #fff;
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
    .px2rem(padding-right, 100);
    flex: 1;
    .px2rem(font-size, 39);
  }
}
</style>

