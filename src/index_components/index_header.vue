<template>
  <div class="indexheader">
    <div class="box">
      <div class="login">
        <p @click="citypage">
          {{this.$store.state.changecity}}
        </p>
          <i></i>
        <input type="text" @click="handlesousuo" v-model="sousuo" />
      </div>
    </div>
    <div class="ddd"></div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "islogin",
  data() {
    return {
      zhuxiao: false,
      sousuo: ""
    };
  },
  methods: {
    citypage: function() {
      this.$router.push({
        path: "/city"
      });
    },
    handlesousuo() {
      this.$router.push({
        path: "/search"
      });
    }
  },
  watch: {
    sousuo(a, b) {
      console.log(a, b);
      this.$axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/forum/findbykey",
        data: {
          key: this.sousuo
        },
        transformRequest: [
          function(data) {
            console.log(data);
            let ret = "";
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            return ret;
          }
        ],
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {});
    }
  }
};
</script>
<style scoped lang="less">
.px2rem(@name,@px) {
  @{name}: @px / 75 * 1rem;
}
.ddd {
  .px2rem(height, 90);
}
.box {
  width: 100%;
  .px2rem(height, 90);
  background: #03a9f4;
  position: fixed;
  top: 0;
  left: 0;
  display: block;
  z-index: 10000;
}
.login {
  .px2rem(height, 90);
  width: 90%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  p {
    color: #fff;
    min-width: 10%;
    height: 100%;
    .px2rem(line-height, 90);
    .px2rem(font-size, 32);
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
  .ul1 {
    display: flex;
    align-items: center;
    min-width: 27%;
    height: 100%;
    justify-content: center;
    li {
      .px2rem(padding-left, 20);
      .px2rem(padding-right, 15);
      .px2rem(font-size, 27);
    }
    li:first-child {
      border-right: 1px solid #ffffff;
    }
  }
  .ul {
    display: flex;
    align-items: center;
    min-width: 27%;
    height: 100%;
    justify-content: center;
    li {
      .px2rem(margin-left, 15);
      .px2rem(font-size, 27);
      img {
        width: 100%;
        height: 100%;
      }
    }
    li:last-child {
      overflow: hidden;
      .px2rem(height, 50);
      .px2rem(width, 50);
      background: #f2f2f2;
      border-radius: 50%;
      .px2rem(margin-right, 15);
    }
  }
  input {
    border: none;
    flex: 1;
    .px2rem(height, 60);
    border-radius: 5px;
    .px2rem(margin-left, 24);
    .px2rem(padding-left, 45);
    background: #fff url(../assets/fangdajing.png) 5px no-repeat;
    .px2rem(background-size, 32);
  }
  i {
    .px2rem(left, 140);
    .px2rem(margin-left, 24);
    .px2rem(margin-top, 16);
    width: 1px;
    height: 1px;
    border: 6px solid red;
    border-top-color: #fff;
    border-bottom-color: transparent;
    border-right-color: transparent;
    border-left-color: transparent;
  }
}
.exit {
  .px2rem(width, 150);
  .px2rem(min-height, 50);
  position: fixed;
  border: 1px solid #f3f3f3;
  background: #fff;
  .px2rem(top, 98);
  .px2rem(right, 15);
  box-shadow: 0px 0px 5px 1px #aaa;
  text-align: center;
  .px2rem(line-height, 50);
}
</style>