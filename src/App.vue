<template>
  <div id="app">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no" />
    <!-- <keep-alive :include="keepAlive">
      <router-view />
    </keep-alive> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive"></router-view>

  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      keepAlive: 'onepage'
    }
  }
}
</script>
<style lang="less" scoped>
.tab /deep/ .van-tab--active {
  color: #03a9f4 !important;
  font-size: 18px !important;
}
</style>
<style>
.van-tabs__wrap {
  /* border: none !important; */
}
.van-hairline--top-bottom::after {
  border-width: 0px 0 !important;
}
.van-tab {
  font-family: SourceHanSansCN-Regular, SourceHanSansCN !important;
  font-weight: 500 !important;
  letter-spacing: 3px;
  font-size: 18px !important;
}
.van-ellipsis .topnavigation {
  font-size: 18px !important;
  line-height: 44px;
}
</style>
