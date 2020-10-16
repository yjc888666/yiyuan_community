<template>
  <div class="history_release">
    <div class="header">
      <img src="../assets/jiantoua.png" alt @click="$router.back()" />
      <p>我的发布</p>
      <p @click="handledrafts">我的草稿</p>
      <!-- <img src="../assets/fangdajing.png" alt /> -->
    </div>
    <div class="mytiezi" v-for="(item,index) in postList" :key="index">
      <dl class="dl">
        <dt>
          <span>
            <img style="object-fit: cover;" :src="GLOBAL.basesURL+item.userhead" alt />
          </span>
        </dt>
        <dd>
          <ul>
            <span>{{item.audit == 3?'草稿':item.audit == 4?'强制下线':item.audit==0?'审核中':item.audit==1?'审核通过':'审核未通过'}}</span>
            <li class="history-name">{{item.username}}</li>
            <li v-html="item.time"></li>
          </ul>
          <p
            @click="handledelet(item.id,item.title,item.content,item.tid,item.uploadPic,item.uploadId,item.description)"
          >
            <img src="../assets/diandiandian.png" alt />
          </p>
        </dd>
      </dl>

      <div class="zy" @click="tiezixiangqing(item.id)">
        <div class="nofengmian" v-show="item.uploadPic.length == 0">
          <p>{{item.title}}</p>
        </div>
        <dl v-show="item.uploadPic.length == 1 || item.uploadPic.length == 2">
          <dt>
            <p>{{item.title}}</p>
          </dt>
          <dd>
            <span>
              <img
                style="object-fit: cover;"
                :src="item.uploadPic.length?item.uploadPic.length === 1?GLOBAL.basesURL+item.uploadPic:GLOBAL.basesURL+item.uploadPic[0]:''"
                alt
              />
            </span>
          </dd>
        </dl>
        <div class="threefengmian" v-show="item.uploadPic.length == 3">
          <p>{{item.title}}</p>
          <ul>
            <li v-for="(items,index) in item.uploadPic" :key="index">
              <img style="object-fit: cover;" :src="GLOBAL.basesURL+items" alt />
            </li>
          </ul>
        </div>
      </div>

      <ol>
        <li>
          <img src="../assets/yanjing.png" alt />
          <span>{{item.view}}</span>
        </li>
        <li @click="hanldezhuanfa(item.id)">
          <img src="../assets/zhuanfa.png" alt />
          <span>转发</span>
        </li>
        <li>
          <img src="../assets/pinglun.png" alt @click="tiezixiangqing(item.id)" />
          <span>{{item.reply}}</span>
        </li>
        <li>
          <img src="../assets/zan.png" alt @click="dianzan(item.id)" />
          <span>{{item.zan}}</span>
        </li>
      </ol>
    </div>
    <div class="pinglun"></div>
    <van-action-sheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect" />
  </div>
</template>
<script>
export default {
  name: "history_release",
  data() {
    return {
      postList: [],
      msg: "",
      head: "",
      show: false,
      deletid: "",
      id: "", //帖子id
      caogaolist: {
        tid: "", //城市
        title: "", //标题
        content: ``, //内容
        uploadPic: "", //图片
        uploadId: "", //封面id
        description: "", //摘要
        audit: ""
      },
      actions: [
        { name: "删除" },
        { name: "编辑", disabled: false },
        { name: "重新审核" }
      ]
    };
  },
  methods: {
    handledrafts() {
      this.$router.push({
        path: "/caogao"
      });
    },
    hanldezhuanfa(id) {
      console.log(id);
      this.$router.push({
        path: `/post_details/${id}`
      });
    },
    handledelet(id, title, content, tid, uploadPic, uploadId, description) {
      this.show = true;
      this.deletid = id;
      this.caogaolist.title = title;
      this.caogaolist.content = content;
      this.caogaolist.tid = tid;
      this.caogaolist.uploadPic = uploadPic;
      this.caogaolist.uploadId = uploadId;
      this.caogaolist.description = description;
    },
    onSelect(id) {
      if (id.name == "删除") {
        this.$axios({
          method: "post",
          url: this.GLOBAL.baseURL + "/forum/del",
          data: {
            id: this.deletid
          },
          transformRequest: [
            function(data) {
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
        }).then(res => {
          this.$toast(res.data.msg);
          this.info();
          this.show = false;
        });
      } else if (id.name == "重新审核") {
        this.$axios({
          method: "GET",
          url: this.GLOBAL.baseURL + "/forum/editAudit?id=" + this.deletid,
          transformRequest: [
            function(data) {
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
        }).then(res => {
          this.$toast(res.data.msg);
          this.info();
          this.show = false;
        });
      } else if (id.name == "编辑") {
        this.$router.push({
          path: `/bianji/${this.deletid}`
        });
      }
    },
    // 帖子分页查询
    info() {
      this.$axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/forum/my",
        data: {
          // id: localStorage.getItem("userid")
        },
        transformRequest: [
          function(data) {
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
      }).then(res => {
        this.postList = res.data.list;
        if (res.data.list[0] == "用户未登录") {
          this.$router.push({
            path: "/land"
          });
        }
      });
    },
    // 点赞、收藏、关注
    dianzan(id) {
      var id = id;
      console.log(id);
      var date = {
        action: "zan",
        target: "forum",
        id: id
      };
      this.$axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/user/interact",
        data: date,
        transformRequest: [
          function(data) {
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
      }).then(res => {
        alert(res.data.msg);
        this.info();
      });
    },
    tiezixiangqing(id) {
      console.log(id);
      this.$router.push({
        path: `/post_details/${id}`
      });
    }
    // handleinfo() {
    //   var id = this.$route.params.id;
    //   // console.log(id);
    //   this.$axios({
    //     method: "post",
    //     url: this.GLOBAL.baseURL + "/forum/draftpage"
    //   }).then(res => {
    //     console.log(res)
    //     for (var i = 0; i < res.data.pojo.list.length; i++) {
    //       if (res.data.pojo.list[i].id == id) {
    //         this.title = res.data.pojo.list[i].title;
    //         this.content = res.data.pojo.list[i].content;
    //         this.description = res.data.pojo.list[i].description;
    //         this.id = res.data.pojo.list[i].id
    //         this.uploadId=res.data.pojo.list[i].uploadId
    //         if(res.data.pojo.list[i].uploadPic.length==1){
    //            this.fileList.push({url:'http://47.94.215.133'+ res.data.pojo.list[i].uploadPic})
    //         }else {
    //           for(var a= 0;a<res.data.pojo.list[i].uploadPic.length;a++){
    //           this.fileList.push({url:'http://47.94.215.133'+ res.data.pojo.list[i].uploadPic[a]})
    //         }
    //         }
    //         // this.fileList.push({url: "http://47.94.215.133" + res.data.pojo.list[i].uploadPic});
    //       }
    //     }
    //   });
    // },
  },
  created() {
    this.info();
    // this.handleinfo();
  }
};
</script>

<style scoped lang="less">
.rem(@name,@px) {
  @{name}: @px / 75 * 1rem;
}
.history_release {
  width: 100%;
  height: 100vh;
  background: #f3f3f3;
}
.header {
  background: #fff;
  .rem(height, 100);
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f6f6f6;
  box-shadow: 0px 0px 5px 1px #f6f6f6;
  img {
    .rem(width, 40);
    .rem(height, 40);
    .rem(margin-left, 20);
    .rem(margin-right, 24);
  }
  p {
    flex: 1;
    text-align: center;
    .rem(font-size, 32);
  }
}
.mytiezi {
  background: #fff;
  .rem(padding-right, 30);
  .rem(padding-left, 30);
  .rem(padding-top, 30);
  .rem(padding-bottom, 30);
  border-top: 10px solid #f3f3f3;
  .dl {
    .rem(height, 90);
    display: flex;
    dt {
      span {
        .rem(width, 90);
        .rem(height, 90);
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
          .rem(margin-bottom, 5);
        }
        li:last-child {
          .rem(font-size, 24);
          color: #999;
        }
      }
      p {
        .rem(width, 55);
        display: flex;
        align-items: center;
        font-family:SourceHanSansCN-Normal,SourceHanSansCN;
        font-weight:400;
        color:rgba(0,0,0,1);
        img {
          width: 100%;
        }
      }
    }
  }
  .zy {
    .rem(margin-top, 15);
    dl {
      .rem(height, 170);
      display: flex;
      dt {
        p {
          .rem(padding, 20);
          .rem(font-size, 25);
        }

        width: 100vh;
        .rem(height, 170);
        background: #f3f3f3;
      }
      dd {
        span {
          .rem(width, 223);
          .rem(height, 170);
          display: block;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .threefengmian {
      p {
        .rem(padding-top, 15);
        .rem(padding-bottom, 20);
        .rem(font-size, 28);
      }
      ul {
        display: flex;
        justify-content: space-between;
        li {
          .rem(width, 223);
          .rem(height, 170);
          img {
            width: 102%;
            height: 100%;
            border-radius: 4px;
          }
        }
      }
    }
  }
  ol {
    display: flex;
    .rem(margin-top, 30);
    justify-content: space-around;
    align-items: center;
    li {
      display: flex;
      align-items: center;
      img {
        .rem(width, 33);
      }
      span {
        .rem(margin-left, 8);
      }
    }
  }
}
.history-name {
  .rem(font-size, 29);
  font-family: SourceHanSansCN-Normal, SourceHanSansCN;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
    .rem(margin-bottom, 6);
}
</style>
