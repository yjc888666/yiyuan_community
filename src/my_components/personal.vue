<template>
  <div class="personal">
    <div class="header">
      <div>
        <img src="../assets/fanhui.png" alt @click="handleback" />
      </div>
      <h2>账号安全设置</h2>
    </div>
    <div class="personal-h3">
      <span>账号绑定</span>
    </div>
    <div class="setupone">
      <ul>
        <li @click="handleVerification">
          <p>手机号</p>
          <span>
            {{handlejilao}}
            <img src="../assets/youjiantou.png" alt />
          </span>
        </li>
      </ul>
    </div>
    <div class="personal-h3">
      <span>账号安全</span>
    </div>
    <div class="setuptwo">
      <ul>
        <li>
          <p>密码设置</p>
          <span @click="handlemodify">
            <img src="../assets/youjiantou.png" alt />
          </span>
        </li>
      </ul>
    </div>
    <!-- <div class="setuptherr">
      <ul>
        <li>
          <p>改手机不用于登录，仅用于找回密码，绑定校验邮箱使用</p>
        </li>
      </ul>
    </div>-->
    <div class="personal-h3">
      <span>高级设置</span>
    </div>
    <div class="setuptwo">
      <ul>
        <li>
          <p>永久注销账号</p>
          <span @click="handleTying">
            <img src="../assets/youjiantou.png" alt />
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "personal",
  data() {
    return {
      handperleinfo: "",
      handlejilao: ""
    };
  },
  methods: {
    handleTying() {
      this.$router.push({
        path: "/Cancellation"
        // Tying
      });
    },
    handleback(){
    this.$router.push({
        path: "/my"
        // Tying
      });
    },
    handleVerification() {
      this.$router.push({
        path: "/Verification"
      });
    },
    handlemodify() {
      this.$router.push({
        path: "/modify"
      });
    },
    async personalinfo() {
      var id = { id: localStorage.getItem("userid") };
      const res = await axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/user/info",
        data: id
      });
      // console.log(res);
      this.handperleinfo = res.data.pojo.mobile;
      // console.log(this.handperleinfo);
      this.handlejilao =
        this.handperleinfo.substr(0, 3) + "****" + this.handperleinfo.substr(7);
    }
  },
  created() {
    this.personalinfo();
  }
};
</script>

<style scoped lang="less">
.px2rem(@name,@px) {
  @{name}: @px / 75 * 1rem;
}
.personal {
  background: #f4f5f7;
  height: 810px;
}
.header {
  width: 100%;
  .px2rem(height, 110);
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
  h2 {
    text-align: center;
    .px2rem(padding-right, 100);
    flex: 1;
    .px2rem(font-size, 36);
    font-family: SourceHanSansCN-Normal, SourceHanSansCN;
    font-weight: 400;
  }
}
.setupone {
  background: #fff;
  li {
    height: 50px;
    background: #fff;
    line-height: 50px;
    border-bottom: 1px solid #e5e5e5;
    .px2rem(margin-left, 32);
    .px2rem(margin-right, 32);
    p {
      .px2rem(font-size, 28);
      float: left;
    }
    span {
      float: right;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      .px2rem(font-size, 28);
      img {
        .px2rem(width, 32);
        .px2rem(margin-top, 32);
        .px2rem(margin-bottom, 32);
        // .px2rem(height, 32);
        float: right;
      }
    }
  }
  :last-child {
    border-bottom: 0px;
  }
}
.setuptwo {
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
  li {
    height: 50px;
    background: #fff;
    line-height: 50px;
    // border-bottom: 1px solid #e5e5e5;
    .px2rem(margin-left, 32);
    .px2rem(margin-right, 32);
    p {
      .px2rem(font-size, 28);
      float: left;
    }
    span {
      float: right;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      .px2rem(font-size, 32);
      justify-content: center;
      align-items: center;
      line-height: normal;
      height: 50px;
      img {
        // top: 30%;
        .px2rem(margin-top, 32);
        .px2rem(margin-bottom, 32);
        right: 50%;
        .px2rem(width, 32);
        // .px2rem(height, 32);
        float: right;
      }
    }
  }
  :last-child {
    border-bottom: 0px;
  }
}
.setuptherr {
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
  li {
    height: 32px;
    background: #fff;
    line-height: 32px;
    .px2rem(margin-left, 32);
    .px2rem(margin-right, 32);
    p {
      .px2rem(font-size, 24);
      color: #999999;
      float: left;
    }
  }
  :last-child {
    border-bottom: 0px;
  }
}
.personal-h3 {
  .px2rem(height, 50);
  .px2rem(margin-left, 32);
  .px2rem(line-height, 50);
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  span {
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    .px2rem(font-size, 24);
  }
}
</style>