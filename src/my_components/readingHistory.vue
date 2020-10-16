<template>
  <div class="body-bg">
    <div class="lishi">
      <div class="header">
        <div>
          <img src="../assets/jiantoua.png" alt @click="fanhui" />
        </div>
        <p>历史浏览</p>
      </div>
      <van-list :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="offset" v-model="loading">
        <div class="boxx" v-for="(item,indexs) in itemlist" :key="'info2-'+indexs">
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
              <img class="diandian" @click="dianji(item.id)" src="../assets/diandiandian.png" alt />
            </dd>
          </dl>
          <p class="drafs">{{item.title}}</p>

          <div v-if="item.uploadPic==null">
            <ul class="maintherr" @click="xiangqing(item.fid)">
              <li v-for="(items,indexz) in item.uploadPic" :key="indexz">
                <img style="object-fit: cover;" v-lazy="GLOBAL.basesURL+items" alt />
              </li>
            </ul>
          </div>
          <div v-else>
            <ul class="maintherr" @click="xiangqing(item.fid)" v-if="item.uploadPic.length==3">
              <li v-for="(items,indexz) in item.uploadPic" :key="indexz">
                <img style="object-fit: cover;" :src="GLOBAL.basesURL+items" alt />
              </li>
            </ul>
            <ul class="maintherr" @click="xiangqing(item.fid)" v-else>
              <li v-for="(items,indexz) in item.uploadPic.slice(0,1)" :key="indexz">
                <img style="object-fit: cover;" v-lazy="GLOBAL.basesURL+item.uploadPic[0]" alt />
              </li>
            </ul>
          </div>

          <van-action-sheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect" />
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'lishi',
  data() {
    return {
      itemlist: [],
      show: false,
      caogaoId: '',
      caogaolist: {
        account_title: ''
      },
      actions: [
        {
          name: '删除'
        }
      ],
      nn: '',
      pages: 0,
      finished: false,
      offset: 200,
      loading: false
    }
  },
  methods: {
    fanhui() {
      this.$router.push({
        path: '/my'
      })
    },
    xiangqing(id) {
      console.log(id)
      this.$router.push({
        path: `/post_details/${id}`
      })
    },
    onLoad() {
      this.pages = this.pages + 1
      this.axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/history/page',
        data: {
          target: 'forum',
          page: this.pages,
          size: 10
        },
        transformRequest: [
          function(data) {
            // console.log(data)
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
        if (res.data.msg == '用户未登录') {
          this.$router.push({
            path: '/land'
          })
        }
        console.log(res)
        if (res.data.result == true) {
          this.itemlist = this.itemlist.concat(res.data.pojo.list)
        }
        if (res.data.result == false) {
          this.finished = true
        }
        this.loading = false
      })
    },
    // 历史阅读纪录
    init() {
      // this.onLoad()
    },

    onClose() {
      this.setData({ show: false })
    },
    dianji(id, account_title) {
      this.caogaolist.account_title = account_title
      this.caogaoId = id
      this.show = true
    },
    // 删除
    onSelect(id) {
      if (id.name == '删除') {
        this.$axios({
          method: 'post',
          url: this.GLOBAL.baseURL + '/history/del',
          data: {
            id: this.caogaoId
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
          this.init()
          this.$router.go(0)
          this.$toast(res.data.msg)
          this.show = false
        })
      }
    }
  },
  created() {
    this.init()
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
    .rem(height, 40);
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
  .rem(line-height, 50);
  p {
    width: 62%;
    .rem(padding, 15);
    background: #f3f3f3;
    border-right: none;
    .rem(font-size, 30);
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
  .rem(height, 380);
  background: red;
  .rem(padding-top, 30);

  border-bottom: 7px solid #f3f3f3;
}
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

