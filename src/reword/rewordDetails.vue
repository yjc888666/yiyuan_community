<template>
  <div>
    <van-nav-bar title="任务详情" left-arrow class="toptitle" @click-left="quit()" />
    <div class="rewordDetail">

      <div class="title">
        <span>{{item.title}}</span>
      </div>
      <div class="item_img">
        <img :src="item.content" alt="">
      </div>
      <div class="starttime">
        <span>活动时间:</span>
        <p>开始：{{item.startdate.slice(0,4)+"年"+item.startdate.slice(5,7)+'月'+item.startdate.slice(8,10)+'日'+item.startdate.slice(10,19)}}</p>
        <p>结束：{{item.enddate.slice(0,4)+"年"+item.enddate.slice(5,7)+'月'+item.enddate.slice(8,10)+'日'+item.enddate.slice(10,19)}}</p>
      </div>

      <div class="xshjj">
        <span>悬赏金币：</span>
      </div>
      <div class="money">
        <p> {{item.amount}}金币</p>
        <a>注：任务审核成功后金币24小时内到账</a>
      </div>
      <div class="task_xsh">
        <span>任务要求:</span>
        <div>
          <p class="xxx"> {{item.task}}</p>
        </div>
      </div>
      <div class="task_xsh">
        <span>任务链接:</span>

        <img :src="item.url" alt="">
        <b>扫码去完成</b>
      </div>
      <div class="task_xsh">
        <span>提交任务:</span>
      </div>
      <div class="button">
        <button @click="tijiao(item.audit)" :class="(item.audit==null||item.audit==2)?'':'bujinyong'"> 提交任务</button>
      </div>

      <div class="tanchuceng" v-show="show" @click="show=false">
        <div class="task" @click.stop>
          <div class="des">
            <span>上传任务截图</span>
          </div>
          <div class="uploadIMg">
            <van-uploader v-model="fileList" multiple :max-count="6" :before-delete="deleteImg" :after-read="afterRead" />
          </div>

          <div class="tijao_button">
            <button @click="uploadTask">提交</button>
          </div>
          <div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      item: '',
      id: '',
      fileList: [],
      show: false,
      file_id: [],
      tijiaoAble: false
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getData()
    this.handlesettled()
  },
  methods: {
    getData() {
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/reward/info',
        data: {
          id: this.id
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
        console.log(res)
        this.item = res.data.pojo
      })
    },
    quit() {
      this.$router.push('/onepage')
    },

    tijiao(e) {
      if (!this.tijiaoAble) {
        if (e == null || e == 2) {
          this.show = true
        }
      } else {
        this.$router.push({
          path: '/land'
        })
      }
    },
    afterRead(res) {
      var data = new FormData()
      if (res instanceof Array) {
        data.append('file', res)
      } else {
        data.append('file', res.file)
        this.$axios({
          method: 'post',
          url: this.GLOBAL.baseURL + '/file/uploadpic',
          data: data
        }).then(res => {
          this.$toast(res.data.msg)
          this.file_id.push(res.data.pojo.id)
          console.log(this.file_id)
        })
      }
      // console.log(this.fileList)
    },
    deleteImg(file, detail) {
      this.fileList.splice(detail.index, 1)
      this.file_id.splice(detail.index, 1)
      // this.file_id = this.file_id.join(',')
      // console.log(this.file_id)
    },
    uploadTask() {
      if (this.fileList.length != 0) {
        this.$axios({
          method: 'post',
          url: this.GLOBAL.baseURL + 'rewardTask/insert',
          data: {
            rid: this.$route.query.id,
            content: this.file_id.join(',')
          }
        }).then(res => {
          this.$toast.success(res.data.msg)
          this.show = false
          setTimeout(() => {
            // this.$router.go(0)
          }, 1500)
        })
      } else {
        this.$toast('请添加截图后再提交吧！')
      }
    },
    // 入驻信息查询
    async handlesettled() {
      const res = await axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/settled/get'
      })
      if (res.data.msg == '用户未登陆') {
        this.tijiaoAble = true
      }
    }
  }
}
</script>



<style lang="less" scoped>
.rewordDetail {
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  .title {
    font-size: 16px;
    margin-top: 10px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  .item_img {
    width: 100%;
    margin-top: 10px;
    img {
      width: 100%;
      height: 152px;
    }
  }
  .starttime {
    margin-top: 16px;
    margin-left: 40px;
    display: flex;
    flex-direction: column;
    span {
      font-size: 18px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    p {
      font-size: 16px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-top: 6px;
    }
  }
  .xshjj {
    margin-top: 16px;
    margin-left: 40px;
    display: flex;
    flex-direction: column;

    span {
      font-size: 18px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
  }
  .money {
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      font-size: 18px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      margin-top: 6px;
    }
    a {
      font-size: 12px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      margin-top: 2px;
    }
  }
  .task_xsh {
    margin-top: 16px;
    margin-left: 40px;
    margin-right: 40px;
    display: flex;
    flex-direction: column;
    span {
      font-size: 18px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    div {
      margin-top: 10px;
      width: 100%;
      height: 120px;
      background: rgba(244, 244, 244, 1);
      opacity: 0.6615000000000001;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .xxx {
        width: 90%;
        height: 100px;
        word-wrap: break-word;
        font-size: 16px;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
    img {
      width: 120px;
      height: 120px;
      margin: 10px auto;
    }
    b {
      font-size: 16px;
      width: 120px;
      height: 30px;
      margin: 0 auto;
      text-align: center;
      font-weight: 500;
    }
  }
  .button {
    margin-top: 10px;
    margin-bottom: 30px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    button {
      font-size: 16px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      height: 30px;
      background: rgba(3, 169, 244, 1);
      border-radius: 4px;
      border: none;
      padding: 0 8px;
      margin-bottom: 40px;
    }
    .bujinyong {
      background-color: #d8d8d8;
    }
  }
}
//
.van-nav-bar .van-icon {
  margin-bottom: 15px;
  color: #1989fa;
  vertical-align: middle;
}
//
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.tanchuceng {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #cccccc;
  z-index: 9;
  .task {
    width: 92%;
    height: 356px;
    margin: 50% auto;
    background-color: #ffffff;
    z-index: 99;
    display: flex;
    flex-direction: column;
    .des {
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      span {
        font-size: 16px;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
    }
    .uploadIMg {
      width: 90%;
      margin: 20px auto;
      display: flex;
      flex-direction: row;
    }
  }
  .tijao_button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    button {
      width: 1.33rem;
      height: 0.8rem;
      background: rgba(3, 169, 244, 1);
      border-radius: 0.11rem;
      border: none;
      font-size: 0.43rem;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
}

//  .van-uploader__wrapper {
//   width: 2.45rem;
//   height: 2.47rem;
// }
/deep/ .van-uploader__preview {
  display: flex;
  width: 2.45rem;
  height: 2.47rem;
}
/deep/ .van-image .van-uploader__preview-image {
  display: flex;
  width: 2.45rem;
  height: 2.47rem;
}
/deep/ .van-nav-bar .van-icon {
  color: black;
}
</style>