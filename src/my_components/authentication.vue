<template>
  <div class="enter">
    <div class="header">
      <div>
        <img src="../assets/fanhui.png" alt @click="$router.back()" />
      </div>
      <h2>选择类型</h2>
    </div>
    <dl v-for="(item,index) in data" :key="index">
      <dt>
        <img :src="item.img" alt />
      </dt>
      <dd>
        <h1>{{item.dd.h1}}</h1>
        <p>{{item.dd.p}}</p>
        <button @click="ruzhu(index)">申请入驻</button>
      </dd>
    </dl>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "enter",
  data() {
    return {
      data: [
        {
          img: "static/geren.png",
          dd: {
            h1: "个人",
            p:
              "面向个人，提供以文字、图片创作为主的内容管理、互动平台、寻找自己的用户，打造自己得品牌。"
          }
        },
        {
          img: "static/meiti.png",
          dd: {
            h1: "媒体",
            p:
              "面向报纸、杂志、广播电视台、电台、互联网等媒体开放内容发布平台，共享亿万移动用户。"
          }
        },
        {
          img: "static/qunmeiti.png",
          dd: {
            h1: "群媒体",
            p: "面向专注于内容生产得公司、创作团队及MCN，共享开放平台。"
          }
        },
        {
          img: "static/zhengfu.png",
          dd: {
            h1: "政府",
            p:
              "政府公开：面向国家个省市区的各级党政机关，为扩大政务信息公开而打造的政府平台。"
          }
        },
        {
          img: "static/qiye.png",
          dd: {
            h1: "企业/机构/其他",
            p:
              "面向企业、机构、以及其他提供内容或服务的组织申请共享海量流量资源，扩大自身品牌影响力。"
          }
        }
      ]
    };
  },
  methods: {
    ruzhu: function(i) {
      if (i == 0) {
        this.$router.push({
          path: "enter_geren"
        });
      } else if (i == 1) {
        this.$router.push({
          path: "/enter_meiti"
        });
      } else if (i == 2) {
        this.$router.push({
          path: "/enter_qunmeiti"
        });
      } else if (i == 3) {
        this.$router.push({
          path: "/enter_zhengfu"
        });
      } else if (i == 4) {
        this.$router.push({
          path: "/qita"
        });
      }
    },
    tiaoguo() {
      this.$router.push({
        path: "/"
      });
    },
    async handlestate() {
      const res = await axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/settled/status"
      });
      // this.code = res.data.pojo;
      console.log(res);
      this.$toast(
        res.data.msg == "用户已审核通过"
          ? "用户已入驻请勿反复操作"
          : res.data.msg
      );
      if (res.data.login == false) {
        this.$router.push({
          path: "/land"
        });
      }
    }
  },
  created() {
    this.handlestate();
    window.localStorage.removeItem('openQer');
    window.localStorage.removeItem('openQertyone');
    window.localStorage.removeItem('openQerqun');
    window.localStorage.removeItem('openQertyzhengfu');
    window.localStorage.removeItem('openQerqita');
  }
};
</script>
<style scoped lang="less">
.px2rem(@name,@px) {
  @{name}: @px / 75 * 1rem;
}
.header {
  width: 100%;
  .px2rem(height, 110);
  background: #fff;
  display: flex;
  align-items: center;
   border-bottom: 1px solid #f6f6f6;
  div {
    .px2rem(width, 100);
    .px2rem(height, 50);
    display: flex;
    align-items: center;
    img {
      .px2rem(width, 48);
      margin: 0 auto;
    }
  }
  h2 {
    text-align: center;
    .px2rem(padding-right, 100);
    flex: 1;
    .px2rem(font-size, 40);
    font-family: SourceHanSansCN-Normal, SourceHanSansCN;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
  }
}
.enter {
  width: 100%;
  dl {
    float: left;
    width: 33.3%;
    .px2rem(margin-top, 50);
    .px2rem(min-height, 600);
    dt {
      margin: 0 auto;
      width: 100%;
      text-align: center;
      img {
        width: 56%;
      }
    }
    dd {
      .px2rem(min-height, 400);
      position: relative;
      margin-bottom: 20px;
      h1 {
        text-align: center;
        .px2rem(margin-top, 34);
        .px2rem(font-size, 32);
        font-family: SourceHanSansCN-Normal, SourceHanSansCN;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.85);
      }
      p {
        width: 73%;
        .px2rem(letter-spacing, 4);
        .px2rem(font-size, 26);
        .px2rem(line-height, 35);
        margin: 7px auto;
        font-family: SourceHanSansCN-Normal, SourceHanSansCN;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        // margin-left: 18px;
        text-align: left;
      }
      button {
        width: 76%;
        background: #fff;
        border: 1px solid #03a9f4;
        .px2rem(height, 38);
        border-radius: 3px;
        display: block;
        position: absolute;
        bottom: 0;
        left: 12%;
        font-family: SourceHanSansCN-Normal, SourceHanSansCN;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        height: 30px;
        font-size: 14px;
        .px2rem(font-size, 26);
      }
      button:hover {
        background: #03a9f4;
        color: #fff;
      }
    }
  }
}
</style>