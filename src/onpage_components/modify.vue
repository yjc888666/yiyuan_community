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
          <span>手机账号&nbsp;:&nbsp;&nbsp;{{handmodiinfo}}</span>
        </div>
        <van-field
          label="原密码:"
          onfocus="this.placeholder=''"
          onblur="this.placeholder='请输入原密码'"
          v-model="possword"
          placeholder="请输入原密码"
          type="password"
          class="fieldone"
        />
        <van-field
          label="新密码:"
          onfocus="this.placeholder=''"
          onblur="this.placeholder='请输入新密码'"
          v-model="newpossword"
          placeholder="请输入新密码"
          type="password"
          class="fieldtwo"
        />
        <van-field
          label="确认密码:"
          onfocus="this.placeholder=''"
          onblur="this.placeholder='请输入确认密码'"
          v-model="endpossword"
          placeholder="请输入确认密码"
          type="password"
          class="fieldthree"
        />
      </van-cell-group>
    </div>
    <div class="forget">
      <p>
        密码必须是8-12位的数字、字符组合（不能是纯数字）
        <span @click="handleDialog">忘记原密码？</span>
      </p>
    </div>
    <div class="fddfes">
      <button :disabled="State==false" :class="{btnBg:State}" @click="handlemodify">完成</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Dialog } from "vant";
export default {
  name: "modify",
  data() {
    return {
      possword: "",
      newpossword: "",
      endpossword: "",
      mobutton: true,
      handmodiinfo: ""
    };
  },
  computed: {
    State() {
      return (
        this.possword !== "" &&
        this.newpossword !== "" &&
        this.endpossword !== ""
      );
    }
  },
  methods: {
    handleDialog() {
      Dialog.confirm({
        confirmButtonText: "发送",
        message:
          "你的社区帐号当前已经绑定手机号 可以通过短信验证码重置社区密码，是否发送验证码到已绑定的手机?"
      })
        .then(() => {
          // on confirm
          this.$router.push({
            path: `/fillin`,
            params:{
              phone:this.handmodiinfo
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    async handlemodify() {
      if (this.newpossword == "" || this.newpossword == null) {
        this.$toast("请输入密码");
      } else if (!/^[a-zA-Z0-9_]+$/.test(this.newpossword)) {
        this.$toast("密码必须是数字,不能包含特殊符号或中文");
      } else if (this.newpossword != this.endpossword) {
        this.$toast("两次密码不一样");
      } else {
        this.$axios({
          method: "post",
          url: this.GLOBAL.baseURL + "/user/updatePwd",
          data: {
            oldPwd: this.possword,
            password: this.newpossword,
            mobile: this.handmodiinfo,
            affirm: this.endpossword
          }
        }).then(res => {
          this.$toast(res.data.msg);
          if(res.data.result == true){
            if(res.data.msg){
              this.$router.push({
              path: "/langlogin"
            });
            }
          }
        });
      }
    },
    // 个人信息
    async modiinfo() {
      var id = { id: localStorage.getItem("userid") };
      const res = await axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/user/info",
        data: id
      });
      this.handmodiinfo = res.data.pojo.mobile;
      window.localStorage.setItem('mobidlessa',this.handmodiinfo)
    }
  },
  created() {
    this.modiinfo();
  }
};
</script>

<style scoped lang="less">
.px2rem(@name,@px) {
  @{name}: @px / 75 * 1rem;
}
.van-cell-group /deep/.van-cell{
  padding: 18px 16px;
}
.header {
  width: 100%;
  .px2rem(height, 110);
  background: #fff;
  display: flex;
  border-bottom: 1px solid #f6f6f6;
  // box-shadow: 0px 0px 5px 1px #f6f6f6;
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
  .px2rem(padding-left, 30);
  span {
    .px2rem(line-height, 60);
    color: #999999;
    font-size: 16px;
    margin-bottom: 5px;
    letter-spacing: 1px;
  }
}
.modify {
  .px2rem(margin-top, 100);
  display: flex;
  justify-content: center;
  .van-cell{
    padding-bottom: 5px;
  }
}
.forget {
  // border-top: 1px solid #eaeaea;
  .px2rem(line-height, 46);
  margin: 0 auto;
  width: 71%;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  .px2rem(font-size, 28);
  span {
    color: #03a9f4;
  }
  p{
  .px2rem(margin-top,40);
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
.van-cell-group/deep/.fieldthree{
  border-bottom: 1px solid #eaeaea;
}
.van-cell-group/deep/.fieldone{
  border-bottom: 1px solid #eaeaea;
}
.van-cell-group/deep/.fieldtwo{
  border-bottom: 1px solid #eaeaea;
}
.van-cell:not(:last-child)::after{
  border-bottom: 0px ;
}
.fieldone {
  letter-spacing: 8px;
}
.fieldtwo{
  letter-spacing: 8px;
}
.fieldthree{
  letter-spacing: 2px;
}

</style>
<style lang="less">

.van-dialog__message {
  text-align: left;
  white-space: normal;
}
</style>