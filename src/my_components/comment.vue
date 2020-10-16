<template>
<div class="body-bg">
<div class="comment">
    <div class="header">
      <div>
        <img src="../assets/jiantoua.png" alt @click="fanhui" />
      </div>
      <p>我的评论</p>
    </div>
    <div class="box" v-for="(item,index) in list" :key="index" @click="xiangqing(item.fid)">
      <dl class="dl">
        <dt>
          <span>
            <img style="object-fit: cover;" :src="GLOBAL.basesURL + item.userhead" alt />
          </span>
        </dt>
        <dd>
          <ul>
            <li>{{item.username}}</li>
            <li>{{item.time}}</li>
          </ul>
        </dd>
      </dl>
      <div class="mytitle">{{item.content}}</div>
      <div class="youtitle">
        <p>
          <span>@{{item.account_title}}:</span>
          {{item.title}}
        </p>
        <div class="fengmian">
          <img
            style="object-fit: cover;"
            :src="item.uploadPic?item.uploadPic.length !== 1?GLOBAL.basesURL+item.uploadPic[0]:GLOBAL.basesURL+item.uploadPic:''"
            alt
          />
        </div>
      </div>
      <div class="footer">
        <ul>
          <!-- <li><img src="../assets/zhuanfa.png" alt=""> 转发</li>
                    <li><img src="../assets/pinglun.png" alt="" @click="xiangqing(item.fid)"> {{item.reply}}</li>
          <li><img src="../assets/zan.png" alt=""> {{item.zan}}</li>-->
        </ul>
      </div>
    </div>
  </div>
</div>
  
</template>
<script>
import axios from "axios";
export default {
  name: "comment",
  data() {
    return {
      list: []
    };
  },
  methods: {
    fanhui() {
      this.$router.push({
        path: "/my"
      });
    },
    xiangqing(id) {
      this.$router.push({
        path: `/post_details/${id}`
      });
    },
    info() {
      this.$axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/comment/my"
      }).then(res => {
        this.list = res.data.list;
      });
    },
    async handlefollow() {
      const res = await axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/alipayt/getList"
      });
      if (res.data.msg == "用户未登录") {
        this.$router.push({
          path: "/land"
        });
      }
    }
  },
  created() {
    this.info();
    this.handlefollow();
  }
};
</script>

<style scoped lang="less">
.rem(@name,@px) {
  @{name}: @px / 75 * 1rem;
}
.body-bg{
  position: absolute;
  height: 100%;
  width: 100%;
  background: #F4F5F7;
}
.footer {
  ul {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .rem(height, 40);
    align-items: center;
    li {
      display: flex;
      align-items: center;
      img {
        .rem(margin-right, 10);
        .rem(width, 33);
        .rem(height, 33);
      }
    }
  }
}

.youtitle {
  display: flex;
  .rem(height, 200);
  p {
    width: 62%;
    .rem(padding, 15);
    background: #f3f3f3;
    border-right: none;
    .rem(font-size, 26);
  }
  .fengmian {
    width: 38%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.box {
  .rem(padding-left, 30);
  .rem(padding-right, 30);
  .rem(padding-top, 30);
  background: #fff;
  // margin-bottom: 10px;
  border-bottom: 7px solid #f4f5f7;
}
.header {
  width: 100%;
  .rem(height, 110);
  border-bottom: 1px solid #f6f6f6;
  box-shadow: 0px 0px 5px 1px #f6f6f6;
  background: #fff;
  display: flex;
  align-items: center;
  div {
    .rem(width, 84);
    .rem(height, 50);
    display: flex;
    align-items: center;
    img {
      .rem(width, 35);
      margin: 0 auto;
    }
  }
  p {
    text-align: center;
    .rem(padding-right, 100);
    flex: 1;
    .rem(font-size, 33);
  }
}
.dl {
  .rem(height, 90);
  display: flex;
  dt {
    span {
      .rem(width, 80);
      .rem(height, 80);
      background: #f3f3f3;
      display: block;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  dd {
    display: flex;
    width: 100vh;
    justify-content: space-between;
    align-items: center;
    .rem(padding-left, 30);
    ul {
      li:first-child {
        .rem(font-size, 32);
        .rem(margin-bottom, 4);
        font-weight: 600;
      }
      li:last-child {
        .rem(font-size, 24);
        color: #999;
      }
    }
    p {
      .rem(width, 55);
      display: flex;
      align-items: center;
      img {
        width: 100%;
      }
    }
  }
}
.mytitle {
  word-break: break-word;
  .rem(line-height, 40);
  .rem(font-size, 29);
  .rem(margin-top, 14);
  .rem(margin-bottom, 14);
}
</style>