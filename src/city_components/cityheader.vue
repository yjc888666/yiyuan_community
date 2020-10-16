<template>
  <div class="nav">
    <div class="hea">
      <div>
        <i @click="$router.back()">
          <img src="../assets/tops.png" alt />
        </i>
        <p class="p1">
          <router-link to="/">
            <span></span>
          </router-link>城市选择
        </p>
        <!-- <p class="p2"><input type="text" placeholder="搜索城市名" onfocus="this.placeholder=''" onblur="this.placeholder='搜索城市名'" v-model="sousuo"></p> -->
      </div>
    </div>
    <div class="her">
      <p class="herinput">
        <input
          type="text"
          placeholder="搜索城市名"
          onfocus="this.placeholder=''"
          onblur="this.placeholder='搜索城市名'"
          v-model="sousuo"
        />
      </p>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
export default {
  name: "citysousuo",
  data() {
    return {
      sousuo: ""
    };
  },
  watch: {
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
.px2rem(@name,@px) {
  @{name}: @px / 75 * 1rem;
}
.hea {
  position: fixed;
  top: 0;
  z-index: 200000;
  width: 100%;
  background: #03a9f4;
  .p1 {
    .px2rem(height, 86);
    .px2rem(line-height, 86);
    .px2rem(font-size, 36);
    text-align: center;
    .px2rem(background-size, 25);
    color: #fff;
  }
  .p2 {
    width: 100%;
    text-align: center;
    background: #03a9f4;
    .px2rem(height, 69);
    input {
      width: 82%;
      .px2rem(height, 60);
      border: none;
      .px2rem(font-size, 27);
      padding-left: 34px;
      background: #fff url(../assets/fangdajing.png) no-repeat 10px center;
      background-size: 5%;
      border-radius: 5px;
    }
  }
  i {
    img {
      position: absolute;
      .px2rem(width, 60);
      .px2rem(padding-top, 14);
      .px2rem(margin-left, 24);
    }
  }
}
.her {
  width: 100%;
  height: 50px;
  background: #f4f5f7;
  .px2rem(margin-top, 84);
  position: fixed;
  z-index: 200001;
  input {
    width: 82%;
    .px2rem(height, 60);
    border: none;
    .px2rem(font-size, 27);
    padding-left: 34px;
    background: #fff url(../assets/fangdajing.png) no-repeat 10px center;
    background-size: 5%;
    border-radius: 5px;
    .px2rem(margin-top, 17);
    .px2rem(margin-left, 32);
  }
}
span {
  display: block;
  .px2rem(height, 80);
  .px2rem(width, 80);
  position: absolute;
  left: 0;
  color: #fff;
}
.zhanshi {
  position: absolute;
  bottom: 0;
  .px2rem(top, 155);
}
.zhanshi ul li {
  .px2rem(height, 72);
  border-bottom: 1px solid #eeeeee;
  .px2rem(font-size, 27);
  .px2rem(line-height, 75);
  .px2rem(padding-left, 15);
}
</style>
