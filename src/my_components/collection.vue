<template>
  <div class="body-bg">
    <div class="collection">
      <div class="header">
        <div>
          <img src="../assets/jiantoua.png" alt @click="fanhui" />
        </div>
        <p>我的收藏</p>
      </div>
      <!-- v-show="item.uploadPic.length == 1" -->

      <van-list :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="offset" v-model="loading">
        <div class="boxx" v-for="(item,indexs) in list" :key="'info2-'+indexs">
          <!--  -->
          <dl class="dl">
            <dt>
              <span>
                <img style="object-fit: cover;" v-lazy="GLOBAL.basesURL+item.userhead" alt />
              </span>
            </dt>
            <dd>
              <ul>
                <li>{{item.username}}</li>
                <li>{{item.addtime}}</li>
              </ul>

            </dd>
          </dl>
          <p class="drafs">{{item.title}}</p>

          <div v-if="item.uploadPic.length>0" class="boxxIMg">
            <ul class="maintherr" @click="xiangqing(item.id)">
              <li v-for="(items,indexz) in item.uploadPic" :key="indexz">
                <img style="object-fit: cover;" v-lazy="GLOBAL.basesURL+items" alt />
              </li>
            </ul>
          </div>

        </div>
      </van-list>
      <div class="wushuju" v-show="!list"></div>
    </div>
  </div>

</template>
<script>
export default {
  name: 'collection',
  data() {
    return {
      list: '',
      offset: 300,
      loading: true,
      finished: false
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
    info() {
      this.axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/user/collect',
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
        if (res.data.result) {
          this.list = res.data.pojo.list
          this.loading = false
          this.finished = true
        } else {
          this.$toast(res.data.msg)
        }
        if (res.data.login == false) {
          this.$router.push({
            path: '/land'
          })
        }
      })
    },
    onLoad() {}
  },

  created() {
    this.info()
  }
}
</script>

<style scoped lang="less">
.rem(@name,@px) {
  @{name}: @px / 75 * 1rem;
}

.body-bg {
  // position: fixed;
  position: absolute;
  height: 100%;
  width: 100%;
  background: #f4f5f7;
}
//

//
.boxx {
  .rem(padding-left, 30);
  .rem(padding-right, 30);
  padding-bottom: 16px;
  background: #fff;
  .rem(padding-top, 30);
  border-bottom: 7px solid #f3f3f3;
  ul {
    width: 100%;
    height: 100%;
  }
  div {
    width: 100%;
  }
}
.boxxIMg {
  height: 80px;
}
.header {
  width: 100%;
  .rem(height, 110);
  border-bottom: 1px solid #f6f6f6;
  display: flex;
  background: #fff;
  align-items: center;
  div {
    .rem(width, 100);
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
      background: #f4f5f7;
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
        // font-family:Roboto-Light,Roboto;
        // font-weight:300;
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
.diandian {
  width: 30px;
}
.mytitle {
  .rem(line-height, 80);
  .rem(font-size, 27);
}
.eject {
  h3 {
    width: 100%;
    text-align: center;
    .rem(margin-top, 80);
    border: 1px solid #ccc;
    // border-bottom: 1px solid #ccc;
    height: 40px;
    line-height: 40px;
    color: #000;
  }
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
.drafs {
  margin-bottom: 10px;
  margin-top: 10px;
  font-family: SourceHanSansCN-Normal, SourceHanSansCN;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  font-size: 16px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box; //作为弹性伸缩盒子模型显示。
  -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
}
.lishi/deep/.van-list {
  margin-top: 0px;
  display: flex;
  flex-direction: column;
}
</style>
