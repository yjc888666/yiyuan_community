<template>
  <div>
    <div class="header">
      <div>
        <img src="../assets/fanhui.png" alt @click="$router.back()" />
      </div>
      <h2>设置密码</h2>
    </div>
    <div class="modify">
      <van-cell-group>
        <div class="field-div">
          <span>手机账号:&nbsp;&nbsp;{{handlastinfo}}</span>
        </div>
        <van-field
          label="新密码:"
          onfocus="this.placeholder=''"
          onblur="this.placeholder='请输入新密码'"
          v-model="newpossword"
          placeholder="请输入新密码"
          type="password"
          class="fieldone"
        />
        <van-field
          label="确认密码:"
          onfocus="this.placeholder=''"
          onblur="this.placeholder='请输入确认密码'"
          v-model="endpossword"
          placeholder="请输入确认密码"
          type="password"
          class="fieldtwo"
        />
      </van-cell-group>
    </div>
    <div class="forget">
      <p>密码必须是8-16位的数字、字符组合 （不能是纯数字）</p>
    </div>
    <div class="fddfes">
      <button :disabled="State==false" :class="{btnBg:State}" @click="handlequeding">完成</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Last",
  data() {
    return {
      name: "",
      newpossword: "",
      endpossword: "",
      mobutton: true,
      handlastinfo: {}
    };
  },
  computed: {
    State() {
      return this.newpossword !== "" && this.endpossword !== "";
    }
  },
  methods: {
    //个人信息
    async lastinfo() {
      var id = { id: localStorage.getItem("userid") };
      const res = await axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/user/info",
        data: id
      });
      this.handlastinfo = res.data.pojo.mobile;
      console.log(this.handlastinfo);
    },
    handlequeding() {
      if (this.newpossword == "" || this.newpossword == null) {
        this.$toast("请输入密码");
      } else if (!/^[a-zA-Z0-9_]+$/.test(this.newpossword)) {
        this.$toast("密码必须是数字,不能包含特殊符号或中文");
      }else if (this.newpossword !=  this.endpossword ) {
        this.$toast("两次密码不一样");
      } else {
        this.$axios({
          method: "post",
          url: this.GLOBAL.baseURL + "/user/pwdset",
          data: {
            password: this.newpossword,
            byteid: localStorage.getItem("gg")
          }
        }).then(res => {
            // console.log(res);
          if (res.data.result) {
            this.$toast(res.data.msg);
            this.$router.push({
              path: "/langlogin"
            });
          } else {
            this.$toast(res.data.msg);
          }
        });
      }
    }
  },
  created() {
    this.lastinfo();
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
.field-div {
  border-bottom: 1px solid #eaeaea;
  .px2rem(margin-left, 30);
  span {
    .px2rem(font-size, 32);
    .px2rem(line-height, 90);
    color: #999999;
    margin-bottom: 5px;
  }
}
.modify {
  .px2rem(margin-top, 80);
  display: flex;
  justify-content: center;
  .px2rem(margin-bottom, 30);
}
.forget {
  .px2rem(line-height, 46);
  margin: 0 auto;
  width: 64%;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  .px2rem(font-size, 28);
  span {
    color: #03a9f4;
  }
}
.fddfes {
  display: flex;
  align-items: center;
  .px2rem(margin-top, 92);
  button {
    border: 0px;
    .px2rem(width, 490);
    .px2rem(height, 80);
    margin: 0 auto;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    .px2rem(font-size, 36);
    color: rgba(255, 255, 255, 1);
    border-radius:4px;
  }
}
button {
  background: #81d4fa;
}
/*button可用时的背景颜色*/
.btnBg {
  background: #03a9f4;
}
.van-cell:first-child {
  color: #999999;
}
.van-cell-group/deep/.van-field__label {
  font-size: 16px !important;
}
.fieldone {
  letter-spacing: 8px;
}
.fieldtwo{
  letter-spacing: 2px;
}

</style>