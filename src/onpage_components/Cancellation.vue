<template>
  <div>
    <div class="headertt">
      <div>
        <img src="../assets/fanhui.png" alt @click="$router.back()" />
      </div>
      <h2>注销账号</h2>
    </div>
    <ul>
      <li>
        <h3>《注销须知》</h3>
      </li>
      <li>
        <p>&nbsp;&nbsp;&nbsp;在您申请注销亿源社区账号之前，请您认真阅读、理解并同意《亿源社区账号注销须知》。</p>
      </li>
      <li>
        <p>
          1. 在此善意提醒您，注销亿源社区账号为不可恢复的操作，
          注销账号后您将无法再使用该账号或找回您通过该账号浏览、关注、
          添加、绑定的任何内容或信息
          <span>（即使您使用相同的手机号码再次注册并使用亿源社区）</span>
        </p>
      </li>
      <li>
        <p>2. 建议您在注销前自行备份本账号相关的所有信息，并请确认与本账号相关的所有服务、财产性权益等均已进行妥善处理。账号注销成功后，我们将删除您的个人信息，或对其进行匿名化处理。</p>
      </li>
      <li>
        <P>3. 在您的账号注销期间，如果您的账号涉及争议纠纷，包括但不限于投诉、举报、诉讼、仲裁、国家有权机关调查等，您知晓并理解，亿源社区有权自行决定是否终止该账号的注销而无需另行得到您的同意。</P>
      </li>
      <li>
        <P>4. 账号注销后，您将无法再使用该账号，也将无法找回该账号中及与该账号相关的任何内容或信息，包括但不限于：</P>
      </li>
      <li>
        <P>4.1 个人资料和历史信息，包括但不限于头像、用户名、发布内容、浏览记录、关注、收藏等；</P>
      </li>
      <li>
        <P>4.2 您将无法登录、使用该账号，其他用户将无法继续通过该账号与您互动；</P>
      </li>
      <li>
        <P>4.3 您通过该账号使用、授权登录或绑定该账号后使用的亿源社区或第三方服务的相关记录将无法找回。</P>
      </li>
      <li>
        <P>4.4 您理解并同意，亿源社区无法协助您重新恢复上述服务。</P>
      </li>
      <li>
        <P>5. 注销该账号并不代表注销前该账号中的行为和相关责任得到豁免或减轻。</P>
      </li>
      <li>
        <van-checkbox v-model="checked" checked-color="#03a9f4" shape="square">我已阅读并同意注销协议</van-checkbox>
      </li>
    </ul>
    <div class="handke">
      <button :disabled="State==false" :class="{btnBg:State}" @click="hanleation">下一步</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cancellation",
  data() {
    return {
      checked: false
    };
  },
    computed: {
    State() {
      return this.checked !== false;
    }
  },
  methods: {
    hanleation(){
      this.$router.push({
        path:'/Tying'
      })
    }
  }
};
</script>
<style scoped lang="less">
.px2rem(@name,@px) {
  @{name}: @px / 75 * 1rem;
}
.headertt {
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
ul {
  li {
    .px2rem(margin-left, 32);
    .px2rem(margin-top, 32);
    .px2rem(margin-right, 32);
    h3 {
      .px2rem(font-size, 32);
      text-align: center;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    p {
      .px2rem(font-size, 28);
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: rgba(109, 114, 120, 1);
      .px2rem(letter-spacing, 4);
      span {
        .px2rem(font-size, 28);
        text-align: center;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color:#000;
      }
    }
  }
}
button {
  background: #81d4fa;
}
/*button可用时的背景颜色*/
.btnBg {
  background: #03a9f4;
}
.handke {
  .px2rem(margin-top, 80);
  .px2rem(margin-bottom, 80);
  display: flex;
  justify-content: center;
  button {
    border: 0px;
    .px2rem(width, 420);
    .px2rem(height, 80);
    margin: 0 auto;
    border-radius:4px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
      .px2rem(font-size, 36);
    color: rgba(255, 255, 255, 1);
  }
}

</style>
<style>
.van-checkbox__icon{
  font-size: 24px !important;
}
</style>