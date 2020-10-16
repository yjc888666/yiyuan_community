<template>
  <div class="setup">
    <div class="header">
      <div>
        <img src="../assets/jiantoua.png" alt @click="$router.back()" />
      </div>
      <p>消息</p>
    </div>
    <div class="yijian">
      <van-tabs v-model="active" @click="handlemess" class="tabs">
        <van-tab class="vant-line" title="系统消息">
          <ul class="tab-nav">
            <li v-for="items in lists" :key="items.id" @click="handlestate(items.id,items.content)" :data-status="items.status" :data-id="items.id">
              <div class="state-sb">
                <div class="state" v-if="items.status == 1" :data-status="items.status" :data-id="items.id">
                  <!-- 点 -->
                </div>
              </div>

              <i :data-status="items.status" :data-id="items.id">{{items.content}}</i>
              <div class="kaka">
                <span :data-status="items.status" :data-id="items.id">{{items.time}}</span>
              </div>
              <!-- <span class="tab-right" :data-status="items.status" :data-id="items.id"></span> -->
            </li>
          </ul>
        </van-tab>
        <van-tab title="审核消息">
          <ul class="tab-nav">
            <li v-for="item in listst" :key="item.id" @click="handlestate(item.id,item.content)" :data-status="item.status" :data-id="item.id">
              <div class="state-sb">
                <div class="state" v-if="item.status == 1" :data-status="item.status" :data-id="item.id">
                  <!-- 点 -->
                </div>
              </div>
              <i :data-status="item.status" :data-id="item.id">{{item.content}}</i>
              <div class="kaka">
                <span class="kaka" :data-status="item.status" :data-id="item.id">{{item.time}}</span>
              </div>
              <!-- <span class="tab-right" ></span> -->
            </li>
          </ul>
        </van-tab>
      </van-tabs>
    </div>
    <van-dialog v-model="show" title="消息详情" class="dialogtxt" close-on-click-overlay confirmButtonColor="#1989fa">
      <p class="diaContent">
        {{message}}
      </p>
    </van-dialog>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'setup',
  data() {
    return {
      active: 2,
      activeName: 'a',
      page: '',
      size: '',
      lists: [],
      listst: [],
      stid: '',
      handlestatezz: true,
      show: false,
      message: ''
    }
  },
  methods: {
    // 删除消息
    async onClickRight() {
      const res = await axios({
        method: 'get',
        url: this.GLOBAL.baseURL + '/message/delete',
        data: {
          ids: ''
        }
      })
      console.log(res)
    },
    // 系统消息
    async handlemess() {
      const res = await axios({
        method: 'get',
        url: this.GLOBAL.baseURL + '/message/my?type=1',
        data: {
          page: 1,
          size: 50
        }
      })
      this.lists = res.data.pojo
      var time = this.lists
      if (res.data.list[0] == '用户未登录') {
        this.$router.push({
          path: '/land'
        })
      }
    },
    // 审核消息
    async handlemesse() {
      const res = await axios({
        method: 'get',
        url: this.GLOBAL.baseURL + '/message/my?type=2',
        data: {
          page: 1,
          size: 50
        }
      })
      this.listst = res.data.pojo
      var time = this.listst
    },
    // 修改消息状态
    async handlestate(e, f) {
      var date = {
        id: e,
        status: 2
      }
      const res = await axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/message/sign',
        data: date
      })
      if (res.data.msg == '状态修改成功') {
        this.handlemesse()
        this.handlemess()
      }
      this.show = true
      this.message = f
    }
  },
  created() {
    this.handlemess()
    this.handlemesse()
  }
}
</script>

<style scoped lang="less">
.px2rem(@name,@px) {
  @{name}: @px / 75 * 1rem;
}
body {
  background: #f4f5f7;
}
.kaka {
  margin-top: 4px;
  margin-bottom: 6px;
}
.setup {
  position: absolute;
  height: 100%;
  width: 100%;
  background: #f4f5f7;
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
      .px2rem(width, 35);
      margin: 0 auto;
    }
  }
  h2 {
    text-align: center;
    .px2rem(padding-right, 100);
    flex: 1;
    .px2rem(font-size, 38);
    font-weight: 400;
  }
}
.van-tabs /deep/ .van-ellipsis {
  .px2rem(font-size, 34);
}

.xitong,
.shenhe {
  margin-top: 8px;
}
.tab-nav {
  position: relative;
  .px2rem(font-size, 24);
  .px2rem(margin-top, 20);
  i {
    padding-left: 2px;
    font-style: normal;
    .px2rem(font-size, 29);
    font-family: SourceHanSansCN-Normal, SourceHanSansCN;
    font-weight: 400;
    display: inline-block;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    .px2rem(padding-top, 20);
  }
  span {
    .px2rem(font-size, 24);
    padding-left: 2px;
    font-family: Roboto-Regular, Roboto;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
  li {
    background: #ffffff;
    border-bottom: 1px solid #f3f3f3;
  }
}
.state-sb {
  width: 20px;
  height: 50px;
  float: left;
}
.state {
  width: 6px;
  height: 6px;
  background: #03a9f4;
  border-radius: 10px;
  margin-top: 20px;
  margin-left: 10px;
}
.header {
  width: 100%;
  .px2rem(height, 110);
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
  p {
    text-align: center;
    .px2rem(padding-right, 100);
    flex: 1;
    .px2rem(font-size, 38);
  }
}
.van-tabs__wrap /deep/.van-tab--active {
  color: #03a9f4;
}
.van-tabs__nav /deep/ .van-ellipsis {
  font-size: 16px;
  line-height: 44px;
}
.van-tabs__wrap /deep/.van-tabs__nav--line {
  padding-bottom: 0px;
}
.van-tabs__nav /deep/.van-ellipsis {
  line-height: 44px;
}
.diaContent {
  padding: 20px;
}
</style>
<style>
.van-tabs__line {
  background-color: #fff;
}
.van-tab--active {
  color: #03a9f4;
}
.van-tabs__nav--line {
  padding-bottom: 0px !important;
}
.van-tabs__line {
  bottom: 0px !important;
}
.tabs1 .van-tabs__wrap .van-tabs__nav--line {
  padding-bottom: 0px;
}
.tabs1 .van-tabs__wrap .van-tabs__line {
  bottom: 0px;
}
</style>