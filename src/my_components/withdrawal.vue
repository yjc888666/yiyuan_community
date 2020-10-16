<template>
  <div class="nav-banner">
      <van-nav-bar
        style="border: none;"
        title="支付宝提现"
        right-text="提现说明"
        left-arrow
        @click-left="$router.back()"
        @click-right="dialog"
      />
    <!-- <van-cell-group> -->
    <van-field v-model="identity" label="收款账号:" placeholder="请输入收款账号" class="fieldone"/>
    <van-field v-model="realName" label="收款方姓名:" placeholder="请输入真实姓名" />
    <van-field v-model="name" label="账号名称:" placeholder="请输入收款账号名称" class="fieldone"/>
    <van-field v-model="amount" label="提现金额:" placeholder="请输入金额" class="fieldone"/>
    <van-field v-model="remark" label="转账备注:" placeholder="请输入转账备注" class="fieldone"/>
    <!-- </van-cell-group> -->
    <button @click="handlepayplay">确认提现</button>
    <div>
      <van-dialog
  v-model="show"
  title="提现说明" class="dialogtxt" close-on-click-overlay confirmButtonColor="#1989fa">
  <p>1.你可以通过完成金币中心的任务来赚取金币、现金，提现金额可自行输入，当天获得的金币会在晚上自动换成现金存入您的账户，现金收益=金币*昨日汇率/1000，每天的汇率都不一样。</p>
  <p>2.提现一般3-5天内到账（您理解并同意如遇提现高峰，提现到账时间回延长）。</p>
  <p>3.你理解并同意我们应用先进的人工智能分析您的行为，如发现造假等违规操作，我们有权阻止您使用（填写邀请码、领取金币、提现、奖励）以及取消您获得的奖励。</p>
  <p>4.为保证用户顺利提现，提现需用户按照提现页面规范操作，如用户未按照提现要求操作或不符合第三方支付平台的要求等原因导致不能收款（如未做实名认证或提现前与平台账号解绑等），所获得的红包讲无法提现，本平台无需承担任何责任。</p>
  <p>5.如果您连续30日未登录本APP，那么此前发放的奖励讲过期，系统会在奖励到期前发送提现提醒，逾期未提现将视为用户自愿放弃提现的权利，我的账户里面的金额将被清零。</p>
</van-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Dialog } from "vant";
export default {
  name: "withdrawal",
  data() {
    return {
      // handlepay: {
      identity: "", //收款账号
      realName: "", //真实姓名
      name: "", //收款账号名称
      amount: "", //金额
      remark: "", //转账备注
      show: false
      // }
    };
  },
  components: {
    // vancellgroup // //注册组件
  },

  methods: {
    dialog(){
      this.show = true
    },
    // 支付宝提现
    async handlepayplay() {
      if (this.identity == "" || this.identity == null) {
        this.$toast("支付宝账号不能为空");
      } else if (!/^(?:\w+\.?)*\w+@(?:\w+\.)+\w+|\d{9,11}$/.test(this.identity)
      ) {
        this.$toast("请输入正确的支付宝账号");
      } else if (this.realName == "" || this.realName == null) {
        this.$toast("姓名不能为空");
      } else if (!/^[\u4E00-\u9FA5]{2,4}$/.test(this.realName)) {
        this.$toast("请输入真实姓名");
      }else if (this.amount == "" || this.amount == null) {
        this.$toast("金额不能为空");
      } else if (!/(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/.test(this.amount)
      ) {
        this.$toast("金额格式错误，请重新输入");
      }
      else if (this.remark == "" || this.remark == null) {
        this.$toast("转账备注不能为空");
      }  else {
        const res = await axios({
          method: "post",
          url: this.GLOBAL.baseURL + "/alipayt/tAudit",
          data: {
            identity: this.identity, //收款账号
            realName: this.realName, //真实姓名
            name: this.name, //收款账号名称
            amount: this.amount, //金额
            remark: this.remark //转账备注
          }
        });
        this.$toast(res.data.msg);
        this.identity = ""
        this.realName = ""
        this.name = ""
        this.amount = ""
        this.remark = ""
        console.log(res.data)
        if (res.data.login == null) {
          this.$router.push({
            path: "/land"
          });
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
.px2rem(@name, @px) {
  @{name}: @px / 75 * 1rem;
}
.nav-banner {
      i {
    font-style: normal;
    .px2rem(margin-bottom, 28);
    font-weight: bold;
    color: rgba(33, 33, 33);
    .px2rem(font-size, 35);
    display: flex;
    justify-content: center;
    align-items: conter;
  }
  button{
    width: 100%;
    background: #03a9f4;
    border: 0px;
    height: 40px;
    color: aliceblue;
    .px2rem(font-size, 28);
    .px2rem(margin-top, 20);
  }
}
.van-field{
  height: 50px;
  line-height: 30px;
}
.van-field__label{
  color: red ;
}
.fieldone{
    .px2rem(letter-spacing, 7);
}
.dialogtxt{
  padding: 20px 20px 0 20px;
  p{
    color: #666666;
    .px2rem(font-size, 28);
    font-family: SourceHanSansCN-Normal, SourceHanSansCN;
    font-weight: 400;
    .px2rem(margin-top, 14);
    .px2rem(letter-spacing, 2);

  }
  p:nth-child(4){
    color: #000;
  }
}
</style>
<style lang="less">
.van-dialog__message {
  text-align: left;
  white-space: normal;
}
.van-dialog__header{
  font-size: 18px;
}
.van-button {
  width: 100%;
}
</style>