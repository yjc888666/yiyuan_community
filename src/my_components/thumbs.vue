<template>
  <div class="body-bg">
    <div class="collection">
      <div class="header">
        <div>
          <img src="../assets/jiantoua.png" alt @click="fanhui" />
        </div>
        <p>我的点赞</p>
      </div>
      <!-- <div class="box" v-for="(items,indexs) in list" :key="indexs" v-show="items.images.length == 3||items.images.length == 2" @click="xiangqing(items.fid)">
        <dl class="dl">
          <dt>
            <span>
              <img style="object-fit: cover;" :src="GLOBAL.basesURL+items.userhead" alt />
            </span>
          </dt>
          <dd>
            <ul>
              <li class="thimbs-name">{{items.name}}</li>
              <li class="thimbs-time">{{items.time}}</li>
            </ul>
          </dd>
        </dl>
        <p class="collect">{{items.title}}</p>
        <ul class="maintherr">
          <li v-for="(items,indexz) in items.images" :key="indexz">
            <img style="object-fit: cover;" :src="GLOBAL.basesURL+items" alt />
          </li>
        </ul> -->

      <!-- <p class="ection">{{items.time}}</p> -->
    </div>
    <div class="boxx" v-for="(item,index) in list" :key="'info2-'+index" @click="xiangqing(item.fid)">
      <dl class="dl">
        <dt>
          <span>
            <img style="object-fit: cover;" :src="GLOBAL.basesURL+item.userhead" alt />
          </span>
        </dt>
        <dd>
          <ul>
            <li class="thimbs-name">{{item.name}}</li>
            <li class="thimbs-time">{{item.time}}</li>
          </ul>
        </dd>
      </dl>
      <div class="youtitle">
        <p class="thimbs-title">{{item.title}}</p>
        <div class="fengmian" v-if="item.images.length>0">
          <img style="object-fit: cover;" :src="item.images?item.images.length !== 1?GLOBAL.basesURL+item.images[0]:GLOBAL.basesURL+item.images:''" alt />
        </div>
      </div>
      <div class="footer">
        <ul>
          <!-- <li><img src="../assets/zhuanfa.png" alt=""> 转发</li>
                    <li><img src="../assets/pinglun.png" alt=""> {{item.reply}}</li>
          <li><img src="../assets/zan.png" alt=""> {{item.zan}}</li>-->
        </ul>
      </div>
    </div>
    <div class="wushuju" v-show="!list"></div>
  </div>
  </div>
</template>
<script>
export default {
  name: 'thumbs',
  data() {
    return {
      list: []
    }
  },
  methods: {
    fanhui() {
      this.$router.push({
        path: '/my'
      })
    },
    xiangqing(id) {
      this.$router.push({
        path: `/post_details/${id}`
      })
    },
    handlethums() {
      this.axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/user/zan',
        data: {
          target: 'forum'
        },
        transformRequest: [
          function(data) {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }
        ],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        this.list = res.data.list
        console.log(this.list)
        if (res.data.list[0] == '用户未登录') {
          this.$router.push({
            path: '/land'
          })
        }
      })
    }
    // async handlequery() {
    //   var a =  window.localStorage.getItem('querytitle');
    //   console.log(a)
    //   var date = {
    //     page: "",
    //     title: a
    //   };
    //   const res = await axios({
    //     method: "post",
    //     url: this.GLOBAL.baseURL + "/forum/bypage",
    //     data: date
    //   });
    //   this.handletitle = res.data.list
    // },
  },
  created() {
    this.handlethums()
  }
}
</script>

<style scoped lang="less">
.rem(@name,@px) {
  @{name}: @px / 75 * 1rem;
}
.body-bg {
  position: absolute;
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
  flex-direction: row;
  justify-content: space-between;
  .rem(padding-top, 15);
  p {
    display: flex;
    flex: 1;
    .rem(padding, 15);
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
  .rem(height, 365);
  .rem(padding-top, 30);
  background: #fff;
  // margin-bottom: 10px;
  border-bottom: 7px solid #f4f5f7;
}
.boxx {
  .rem(padding-left, 30);
  .rem(padding-right, 30);

  .rem(padding-top, 30);
  background: #fff;
  border-bottom: 7px solid #f4f5f7;
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