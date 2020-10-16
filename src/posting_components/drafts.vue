<template>
  <div class="drafts">
    <div class="header">
      <img src="../assets/jiantoua.png" alt @click="$router.back()" />
      <p>我的草稿</p>
      <img src="../assets/fangdajing.png" alt />
    </div>
    <div class="main" >
      <div class="box" v-for="(item,index) in list" :key="index" v-show="item.uploadPic.length == 1 || item.uploadPic.length == 0" >
        <dl>
          <dt>
            <div  @click="tiezixiangqing(item.id)">
              <img style="object-fit: cover;" :src="GLOBAL.basesURL+item.uploadPic[0]" alt />
            </div>
          </dt>
          <dd >
            <ul>
              <li>{{item.title}}</li>
              <li
                @click="dianji(item.id,item.title,item.content,item.tid,item.uploadPic,item.uploadId,item.description)"
              >
                <img src="../assets/diandiandian.png" alt />
              </li>
            </ul>
          </dd>
        </dl>
        <p class="drafts-caogaos">{{item.time}}</p>
      </div>
       <div class="box" v-for="(item,indexs) in list" :key="'info2-'+indexs" v-show="item.uploadPic.length == 3 || item.uploadPic.length == 2">
         <div @click="dianji(item.id,item.title,item.content,item.tid,item.uploadPic,item.uploadId,item.description)" class="mlgb" >
                <img src="../assets/diandiandian.png" alt />
         </div>
         <p class="drafs">{{item.title}}</p>
          <ul class="maintherr">
            <li v-for="(items,indexz) in item.uploadPic" :key="indexz"  @click="tiezixiangqing(item.id)">
              <img style="object-fit: cover;" :src="GLOBAL.basesURL+items" alt />
            </li>
          </ul><br><br><br><br>
        <p class="drafts-caogao">{{item.time}}</p>
      </div>
      <van-action-sheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect" />
    </div>
    
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "drafts",
  data() {
    return {
      list: [],
      show: false,
      deletid: "",
      id: "",
      field: "",
      caogaolist: {
        tid: "",
        title: "",
        content: "",
        uploadPic: "", //图片
        uploadId: "", //封面id
        description: "" //摘要
      },
      actions: [
        { name: "编辑" },
        { name: "删除" },
        { name: "发布" },
        { name: "发布到话题" }
      ]
    };
  },
  methods: {
    dianji(id, title, content, tid, uploadPic, uploadId, description) {
      this.show = true;
      this.deletid = id;
      this.caogaolist.title = title;
      this.caogaolist.content = content;
      this.caogaolist.tid = tid;
      this.caogaolist.uploadPic = uploadPic;
      this.caogaolist.uploadId = uploadId;
      this.caogaolist.description = description;
    },
     tiezixiangqing(id) {
      console.log(id);
      this.$router.push({
        path: `/post_details/${id}`
      });
    },
    // 删除
    onSelect(id) {
      // console.log(this.deletid);
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
      } else if (id.name == "编辑") {
        this.$router.push({
          path: `/handlerelasse/${this.deletid}`
        });
      } else if (id.name == "发布") {
        var date = {
          field : this.field
        }
        this.axios({
          method: "post",
          url: this.GLOBAL.baseURL + "/forum/release?id=" + this.deletid,
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
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }).then(res => {
          this.$toast(res.data.msg);
          this.$router.push({
            path: "/history_release"
          });
        });
      } else if (id.name == "发布到话题") {
        this.axios({
          method: "post",
          url: this.GLOBAL.baseURL + "/forum/release?id=" + this.deletid,
          data: { field: "20191017101625895591130" },
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
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }).then(res => {
          this.$toast(res.data.msg);
          this.$router.push({
            path: "/history_release"
          });
        });
      }
    },
    /// 领域查询
    async handlefield() {
      const res = await axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/field/list"
      });
      this.field = res.data.pojo.field;
    },
      // 入驻信息查询
    async handlesettled() {
      const res = await axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/settled/get"
      });
      // console.log(res)
      this.field = res.data.pojo.field;
    },
    // 草稿箱查询
    info() {
      this.$axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/forum/draftpage"
      }).then(res => {
        this.list = res.data.pojo.list;
        console.log(this.list);
      });
    }
  },
  created() {
    this.info();
    this.handlefield();
    this.handlesettled();
  }
};
</script>

<style scoped lang="less">
.rem(@name,@px) {
  @{name}: @px / 75 * 1rem;
}
.header {
  background: #fff;
  border-bottom: 10px solid #f3f3f3;
  .rem(height, 100);
  display: flex;
  align-items: center;
  img {
    .rem(width, 40);
    .rem(height, 40);
    .rem(margin-left, 20);
    .rem(margin-right, 28);
  }
  p {
    flex: 1;
    text-align: center;
    .rem(font-size, 38);
  }
}
.main {
  width: 100%;
  .rem(min-height, 230);
  .box {
    position: relative;
    height: 100%;
    .rem(padding, 25);
    border-bottom: 1px solid #f3f3f3;
    p {
      // .rem(margin-top, 25);
    }
    dl {
      width: 100%;
      display: flex;
      .rem(height, 170);
      dt {
        width: 30%;
        height: 100%;
        display: flex;
        align-items: center;
        div {
          width: 100%;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
              border-radius: 4px;
          }
        }
      }
      dd {
        width: 70%;

        ul {
          display: flex;
          justify-content: space-between;
          li {
            img {
              .rem(width, 50);
              display: flex;
            }
          }
          li:first-child {
            .rem(padding, 20);
            .rem(width, 230);
            .rem(font-size, 29);
            .rem(padding-top, 40);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    .mlgb{
        float: right;
    position: absolute;
    right: 9px;
    top: 0px;
    img{
      width: 24px;
    }
    }
  }
}
.maintherr{
  img{
    width: 32%;
    height: 81px;
    float: left;
    margin-right: 3px;
    border-radius: 4px;
  }
}
.drafs{
    .rem(font-size, 29);
    margin-bottom: 10px;
}
.drafts-caogao{
    .rem(padding-top, 60);
}
.drafts-caogaos{
    .rem(padding-top, 18);
}
</style>