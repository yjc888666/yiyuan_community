<template>
  <div class="body-bg">
    <div class="collection">
      <div class="header">
        <div>
          <img src="../assets/jiantoua.png" alt @click="$router.back()" />
        </div>
        <p>搜索结果</p>
      </div>

      <div class="box" v-for="(items,indexs) in list" :key="indexs" v-show="items.images.length == 3" @click="xiangqing(items.id)">
        <dl class="dl">
          <dt>
            <span>
              <img style="object-fit: cover;" :src="GLOBAL.basesURL+items.userhead" alt />
            </span>
          </dt>
          <dd>
            <ul>
              <li class="thimbs-name">{{items.username}}</li>
              <li class="thimbs-time">{{items.time}}</li>
            </ul>
          </dd>
        </dl>
        <p class="collect">{{items.title}}</p>
        <ul class="maintherr">
          <li v-for="(items,indexz) in items.images" :key="indexz">
            <img style="object-fit: cover;" :src="GLOBAL.basesURL+items" alt />
          </li>
        </ul>
        <br />
        <br />
        <br />
        <br />
        <!-- <p class="ection">{{items.time}}</p> -->
      </div>
      <div class="box" v-for="(item,index) in list" :key="'info2-'+index" v-show="item.images.length == 1 || item.images.length == 0|| item.images.length == 2" @click="xiangqing(item.id)">
        <dl class="dl">
          <dt>
            <span>
              <img style="object-fit: cover;" :src="GLOBAL.basesURL+item.userhead" alt />
            </span>
          </dt>
          <dd>
            <ul>
              <li class="thimbs-name">{{item.username}}</li>
              <li class="thimbs-time">{{item.time}}</li>
            </ul>
          </dd>
        </dl>
        <div class="youtitle">
          <p class="thimbs-title">{{item.title}}</p>
          <div class="fengmian">
            <img style="object-fit: cover;" :src="item.images?item.images.length !== 1?GLOBAL.basesURL+item.images[0]:GLOBAL.basesURL+item.images:''" alt />
          </div>
        </div>
        <div class="footer">
          <ul>

          </ul>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'thumbs',
  data() {
    return {
      list: []
    }
  },
  methods: {
    xiangqing(id) {
      this.$router.push({
        path: `/post_details/${id}`
      })
    },
    async handlequery() {
      // var a = window.localStorage.getItem('querytitle')
      // console.log(a)
      // var date = {
      //   page: '',
      //   title: a
      // }
      const res = await axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/forum/findbykey',
        // params: {
        //   content: this.$route.query.searchContent
        // }
        data: {
          content: this.$route.query.searchContent
        }
      })
      this.list = res.data.pojo.list
      console.log(this.list)
    },
    async handle() {
      // var a =  window.localStorage.getItem('query');
      var date = {
        // page: "",
        // title: a
      }
      const res = await axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/forum/bypage'

        // data: date
      })
      // this.list = res.data.list
      // console.log(this.list)
    }
  },
  created() {
    this.handlequery()
    // this.handle()
  }
}
</script>

<style scoped lang="less">
.rem(@name,@px) {
  @{name}: @px / 75 * 1rem;
}
.body-bg {
  height: 100%;
  width: 100%;
  background: #f4f5f7;
}
.footer {
  ul {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .rem(height, 20);
    align-items: center;
    li {
      display: flex;
      align-items: center;
      img {
        .rem(margin-right, 10);
        .rem(width, 33);
        .rem(height, 33);
      }
    }
  }
}

.youtitle {
  display: flex;
  .rem(height, 200);
  .rem(padding-top, 15);
  p {
    width: 62%;
    .rem(padding, 15);
    background: #f3f3f3;
    .rem(font-size, 29);
    border-right: none;
    font-family: SourceHanSansCN-Normal, SourceHanSansCN;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
  }
  .fengmian {
    width: 38%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.box {
  .rem(padding-left, 30);
  .rem(padding-right, 30);
  .rem(height, 330);
  .rem(padding-top, 30);
  background: #fff;
  margin-bottom: 10px;
}
.header {
  width: 100%;
  .rem(height, 110);
  border-bottom: 1px solid #f6f6f6;
  box-shadow: 0px 0px 5px 1px #f6f6f6;
  background: #fff;
  display: flex;
  align-items: center;
  div {
    .rem(width, 84);
    .rem(height, 50);
    display: flex;
    align-items: center;
    img {
      .rem(width, 35);
      margin: 0 auto;
    }
  }
  p {
    text-align: center;
    .rem(padding-right, 100);
    flex: 1;
    .rem(font-size, 33);
  }
}
.dl {
  .rem(height, 90);
  display: flex;
  dt {
    span {
      .rem(width, 80);
      .rem(height, 80);
      background: #f3f3f3;
      display: block;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  dd {
    display: flex;
    width: 100vh;
    justify-content: space-between;
    align-items: center;
    .rem(padding-left, 30);
    ul {
      li:first-child {
        .rem(font-size, 32);
        .rem(margin-bottom, 12);
        font-family: SourceHanSansCN-Normal, SourceHanSansCN;
        font-weight: 600;
        color: rgba(0, 0, 0, 1);
      }
      li:last-child {
        .rem(font-size, 24);
        // font-family: Roboto-Light, Roboto;
        // font-weight: 300;
        color: rgba(109, 114, 120, 1);
      }
    }
    p {
      .rem(width, 55);
      display: flex;
      align-items: center;
      img {
        width: 100%;
      }
    }
  }
}
.mytitle {
  .rem(line-height, 80);
  .rem(font-size, 27);
}
.maintherr {
  li {
    img {
      width: 32%;
      height: 81px;
      float: left;
      margin-right: 3px;
      border-radius: 4px;
    }
  }
}

.collect {
  .rem(font-size, 29);
  .rem(margin-bottom, 20);
  .rem(margin-top, 20);
}
</style>