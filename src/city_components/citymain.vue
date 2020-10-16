<template>
  <div class="citymain" ref="wrapper">
    <div>
      <div class="dqcity">
        <!-- <h3>当前城市</h3> -->
        <div class="aab">
          <span>
            {{this.$store.state.changecity}}&nbsp;&nbsp;&nbsp;
            <i>GPS定位</i>
          </span>
        </div>
      </div>
      <div class="rmcity">
        <h2>热门城市</h2>
        <div class="aa">
          <p
            v-for="(item,index) in citymainList.hotCities"
            :key="index"
            @click="btn2(item.name,item.id)"
          >{{item.name}}</p>
        </div>
      </div>
      <div class="xzcity" v-for="(val,a,index) in citymainList.cities" :key="index">
        <h3 ref="alptitle">{{a}}</h3>
        <ul>
          <li
            v-for="(item,index) in val"
            :key="index"
            @click="btn2(item.name,item.id)"
            ref="cs"
          >{{item.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
export default {
  name: "citymain",
  data: function() {
    return {
      scroll: {},
      sousuo: ""
    };
  },
  watch: {},
  props: ["citymainList", "acindex"],
  methods: {
    btn2: function(city, id) {
      console.log(city, id);
      //改变城市
      this.$store.commit("changecity", city);
      localStorage.setItem("cityid", id);
      //存储到本地
      localStorage.setItem("changecity", city);
      //跳转
      this.$router.push({ path: "/" });
      this.$toast(city);
    }
  },
  mounted() {
    this.scroll = new Bscroll(this.$refs.wrapper, { click: true });
  },
  watch: {
    acindex: function(newindex) {
      //如果是默认的空字符串 不用进行滚动
      if (newindex === "") {
        return;
      }
      console.log(newindex);
      //组件帮我们滚动到对应dom的位置
      this.scroll.scrollToElement(this.$refs.alptitle[newindex]);
    },
    sousuo(a) {
      console.log(a);
      this.$store.commit("sousuo", a);
      localStorage.setItem("sousuo", a);
      console.log(localStorage.getItem("sousuo"));
    }
  }
};
</script>

<style scoped lang="less">
.px2rem(@name, @px) {
  @{name}: @px / 75 * 1rem;
}
.citymain {
  width: 100%;
  position: absolute;
  bottom: 0;
  .px2rem(top, 184);
}

h3 {
  .px2rem(height, 55);
  background: #f4f5f7;
  .px2rem(font-size, 30);
  .px2rem(padding-left, 32);
  .px2rem(line-height, 55);
  color: #03a9f4;
}
h2 {
  .px2rem(height, 70);
  background: #f4f5f7;
  .px2rem(font-size, 30);
  .px2rem(padding-left, 32);
  .px2rem(line-height, 80);
  color: #333333;
}

.aa {
  display: flex;
  flex-wrap: wrap;
  // .px2rem(padding-bottom, 16);
  .px2rem(padding-left, 74);
  background: #f4f5f7;
  span {
    .px2rem(font-size, 30);
    margin-top: 10px;
    i {
      font-style: normal;
      .px2rem(font-size, 24);
      color: #999999;
    }
  }
}
.dqcity{
    .px2rem(height, 80);
}
.aab {
  display: flex;
  flex-wrap: wrap;
  .px2rem(padding-left, 32);
  background: #fff;
  span {
    .px2rem(font-size, 30);
    .px2rem(line-height, 80);
    i {
      font-style: normal;
      .px2rem(font-size, 24);
      color: #999999;
    }
  }
}

p {
  display: block;
  .px2rem(width, 172);
  .px2rem(height, 68);
  .px2rem(line-height, 72);
  border: none;
  background: #fff;
  border: 1px solid #eeeeee;
  .px2rem(margin-left, 10);
  .px2rem(margin-bottom, 0);
  .px2rem(margin-top, 16);
  .px2rem(margin-right, 16);
  border-radius: 5px;
  .px2rem(font-size, 32);
  text-align: center;
  color: #999999;
}

ul {
  width: 100%;
  li {
    .px2rem(height, 88);
    border-bottom: 1px solid #eeeeee;
    .px2rem(font-size, 32);
    .px2rem(line-height, 88);
    .px2rem(padding-left, 32);
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
}
</style>
