<template>
  <div class="follow-nav">
    <div class="header">
      <div>
        <img src="../assets/jiantoua.png" alt @click="$router.back()" />
      </div>
      <p>历史记录</p>
    </div>
    <div class="nav" v-for="items in follow" :key="items.id">
      <div class="follow-left">
        <p class="p1">提现</p>
        <p class="p2">余额:{{items.gold}}元</p>
      </div>
      <div class="follow-right">
        <span>{{items.addTime | formatDate}}</span>
        <br />
        <h3>+{{items.amount}}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { formatDate } from "../commom/common.js";
export default {
  filters: {
    formatDate(time) {
      time = time * 1000;
      let date = new Date(time);
      // console.log(new Date(time))
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  name: "cashs",
  data() {
    return {
      page: "",
      size: "",
      type: "",
      follow: []
    };
  },
  methods: {
    //   提现
    async handlefollow() {
      const res = await axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/alipayt/getList"
      });
      this.follow = res.data.pojo;
      if (res.data.msg == "用户未登录") {
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
  background: #f4f5f7;
}
.nav {
  .px2rem(height, 110);
  background: #fff;
  //   .px2rem(margin-top, 10);
  border-bottom: 1px solid #f4f5f7;
}
.follow-left {
  float: left;
  .px2rem(padding-left, 25);
  .px2rem(padding-top, 8);
  p {
    .px2rem(font-size, 25);
    .px2rem(line-height, 45);
  }
  .p1 {
    .px2rem(font-size, 30);
    font-family: SourceHanSansCN-Normal, SourceHanSansCN;
    font-weight: 600;
    color: rgba(0, 0, 0, 1);
  }
}
.follow-right {
  float: right;
  .px2rem(font-size, 24);
  .px2rem(padding-right, 25);
  .px2rem(line-height, 45);
}
.header {
  width: 100%;
  .px2rem(height, 110);
  display: flex;
  align-items: center;
  background: #fff;
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
    .px2rem(font-size, 39);
  }
}
</style>