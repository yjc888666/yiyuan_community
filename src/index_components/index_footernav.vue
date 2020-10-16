<template>
  <div class="footernav">
    <router-view></router-view>
    <div class="footernav2">
      <div class="xiaoxi" v-if="handlexiaoxi"></div>
      <router-link :to="item.d" v-for="(item,index) in data" :key="index">
        <dl @click="tab($event)">
          <dt>
            <img :src="item.a" alt class="img1" />
            <img :src="item.b" alt class="img2" />
          </dt>
          <dd>{{item.c}}</dd>
        </dl>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "footernav",
  data() {
    return {
      data: [
        {
          d: "/onepage",
          a: "static/onepage.png",
          b: "static/onepages.png",
          c: "首页"
        },
        {
          d: "/release/#id",
          a: "static/posting.png",
          b: "static/postings.png",
          c: "发布"
        },
        { d: "/coin", a: "static/rws.png", b: "static/rw.png", c: "任务" },
        { d: "/my", a: "static/my.png", b: "static/mys.png", c: "我的" }
      ],
      Unread: [], //未读消息
      handlexiaoxi: false
    };
  },
  methods: {
    tab(e) {
      // console.log(e)
    },
    // 未读消息
    async handlestatest() {
      const res = await axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/message/signList"
      });
      //   console.log(res.data.pojo.length);
      this.Unread = res.data.pojo;
      if (res.data.pojo.length != 0) {
        this.handlexiaoxi = true;
      }
    }
  },
  created() {
    this.handlestatest();
  }
};
</script>

<style scoped lang="less">
.px2rem(@name,@px) {
  @{name}: @px / 75 * 1rem;
}

.footernav2 {
  position: fixed;
  bottom: 0;
  width: 100%;
  .px2rem(height, 120);
  display: block;
  display: flex;
  background: #fdfdfd;
  justify-content: space-around;
  border-top: 1px solid #f6f6f6;
  box-shadow: 0px 0px 5px #f1f1f1;
  a {
    text-decoraction: none;
    display: flex;
    align-items: center;
    dl {
      dt {
        .img2 {
          display: none;
        }
      }
    }
  }
  .router-link-active {
    text-decoration: none;
    dl {
      dt {
        .img2 {
          display: block;
        }
        .img1 {
          display: none;
        }
      }
      dd {
        color: #03a9f4;
      }
    }
  }
  dl {
    dt {
      .px2rem(width, 45);
      .px2rem(height, 45);
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    dd {
      color: #848484;
      .px2rem(margin-top, 10);
      text-align: center;
      font-family: SourceHanSansCN-Normal, SourceHanSansCN;
      font-weight: 400;
    }
  }
}
.xiaoxi {
  position: absolute;
  .px2rem(width, 15);
  .px2rem(height, 15);
  .px2rem(right, 70);
  .px2rem(top, 4);
  font-style: normal;
  text-align: center;
  background: rgba(254, 32, 21, 1);
  border: 1px solid rgba(255, 255, 255, 1);
  border-radius: 10px;
  color: #fff;
  font-family: Roboto-Regular, Roboto;
}
</style>