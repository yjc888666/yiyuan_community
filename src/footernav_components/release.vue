<template>
  <div class="release">
    <!-- <van-tabs v-model="activeName" line-width="60px" color="#03A9F4" title-active-color="#03A9F4"> -->
    <!-- <van-tab title="文章发布" name="a"> -->
    <div class="headerfg">
      <div></div>
      <p>文章发布</p>
    </div>
    <div class="wenzhang">
      <!-- <i @click="$router.back()" class="back-i">
            <img src="../assets/fanhui.png" alt />
      </i>-->
      <div class="bianji">
        <div class="biaoti">
          <!-- <input type="text" placeholder="请输入标题" v-model="title" @input='inputTitle' /> -->
          <van-field v-model="title" rows="2" autosize type="textarea" maxlength="30" placeholder="请输入标题" show-word-limit @input='inputTitle' />

        </div>
        <div class="zhaiyao">
          <p>摘要</p>
          <div class="zhai_yao">
            <input type="text" v-model="description" placeholder="请输入摘要" />
          </div>
        </div>
        <div class="concat">
          <div class="edit_container">
            <div style="display:none">
              <van-uploader :after-read="handleSuccess">
                <van-button icon="photo" type="primary">上传图片</van-button>
              </van-uploader>
            </div>
            <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)"></quill-editor>
          </div>
        </div>
        <div class="number">{{number}}/5000</div>
      </div>
      <div class="fengmian">
        <p>文章封面</p>
        <div class="upload">
          <van-uploader v-model="fileList" multiple :max-count="3" @delete="ddd" :after-read="hand" />
        </div>
      </div>
      <div class="addkeywords_button" v-if="keywordAdd &&keywordlist.length<5">
        <span @click="keywordAddToinput">+关键词&nbsp;( {{5-keywordAddCount}}/5 )&nbsp;</span>
      </div>
      <div class="Keyword">
        <input type="text" ref="inputAddKeyword" placeholder="请输入关键词" @keyup.enter="addkeywordsEneter" @blur="addkeywords" v-model="inputvalue" v-if="!keywordAdd" />
        <div class="keywordlist">
          <div class="keyworditem" v-for="(item,index) in keywordlist" :key="index">
            {{item}} <span @click="delKeyword(index)">×</span>

          </div>
        </div>
      </div>
      <div class="wenzhangshuxing">

      </div>
      <div class="fabu">
        <button class="bbs" @click="haneleRelease">发布</button>
        <button class="bbstop" @click="haneledraft">存草稿</button>
        <button class="bbsconter" @click="haneleconversation">话题发布</button>
        <button class="bbsbottom" @click="handlepass">预览</button>
      </div>
    </div>
    <!-- </van-tab> -->
    <!-- <van-tab title="视频发布" name="b" style> -->
    <!-- <i @click="$router.back()" class="back-z">
        <img src="../assets/fanhui.png" alt />
        </i>
        <div class="video">
          <div class="banner">
            <input type="text" placeholder="请输入标题" v-model="title" />
            <label id="labelr" class="pop_file file_cont" for="pop_video">
              <div class="spanMr">上传视频</div>
              <video id="videoId" autoplay controls></video>
              <input
                type="file"
                style="display:none;maragin-top:50px"
                id="pop_video"
                accept="audio/mp4, video/WMV"
                v-on:change="uploadFile(event,'2')"
                name="fileTrans"
                ref="file"
                value
              />
            </label>
            <h4>视频简介</h4>
            <textarea name="" id="" cols="30" rows="10" v-model="description"></textarea>
          </div>

        </div>
        <h4>视频封面</h4>
        <van-uploader v-model="fileli" id="upolader" multiple :max-count="1"/>
        <h4>频道分类</h4>
        <div>
          <select  v-model="classify_one">
            <option value>1</option>
            <option value>2</option>
            <option value>3</option>
            <option value>4</option>
            <option value>5</option>
          </select>
          <select v-model="classify_two">
            <option value>6</option>
            <option value>7</option>
            <option value>8</option>
            <option value>9</option>
            <option value>10</option>
          </select>
        </div>
        <van-button type="info" class="btn-button" @click="handleuploading()">发布</van-button>
        <van-button type="default" class="btn-button">存草稿</van-button>
    <van-button type="default" class="btn-button">预览</van-button>-->
    <!-- </van-tab> -->
    <!-- </van-tabs> -->
  </div>
</template>
<script>
// 工具栏配置
import { quillEditor } from 'vue-quill-editor' //调用编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import axios from 'axios'
// 工具栏配置
const toolbarOptions = [
  [{ color: [] }, { background: [] }],
  ['bold'], // custom button values
  [{ header: [1, 2, 3, 4, 5, 6] }],
  ['image'],
  ['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
  // ["blockquote", "code-block"],
  // [{ indent: "-1" }, { indent: "+1" }],
  [{ align: [] }] // 缩进
]
export default {
  name: 'index',
  components: {
    quillEditor
  },
  data() {
    return {
      activeName: 'a',
      content: ``,
      dadada: '',
      str: '',
      keywordAdd: true,
      keywordAddCount: 5,
      inputvalue: '',
      keywordlist: [],
      editorOption: {
        placeholder: '请输入正文',
        modules: {
          toolbar: {
            container: toolbarOptions, //工具栏
            handlers: {
              image: value => {
                if (value) {
                  document.querySelector('.van-uploader__input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      },
      fileList: [],
      draft: 0,
      fileli: [],
      filelupload: [],
      fileimg: [],
      value1: 0, //下拉
      value2: 'a',
      title: '', //标题
      description: '', //描述
      tid: '', //城市
      classify_one: '', //一级频道
      classify_two: '', //二级频道
      publish: '1', //1发布 2草稿
      m: '', //上传视频
      m1: '', //上传封面
      id: '',
      field: '', //帖子栏目
      event: '',
      nn: [],
      number: '0'
    }
  },

  methods: {
    inputTitle() {
      if (this.title.replace(/\s+/g, ' ').length >= 30) {
        this.$toast('标题最高长度不超过30个汉字！')
      } else {
      }
    },
    //判断字符串中的字符 中文算两个字符
    chkstrlen(str) {
      var strlen = 0
      for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 255)
          //如果是汉字，则字符串长度加2
          strlen += 2
        else strlen++
      }
      return strlen
    },
    keywordAddToinput() {
      this.keywordAdd = false
    },
    addkeywordsEneter() {
      this.$refs.inputAddKeyword.blur()
    },
    addkeywords() {
      if (this.chkstrlen(this.inputvalue.replace(/\s+/g, '')) > 10) {
        this.$toast('关键字最大长度为5个中文或者十个字符')
      } else if (
        this.keywordlist.some(val => {
          return this.inputvalue.replace(/\s+/g, '') == val
        })
      ) {
        this.$toast('请输入不同的关键字')
      } else {
        this.keywordlist.push(this.inputvalue.replace(/\s+/g, ''))

        this.inputvalue = ''
        this.keywordAdd = true
        this.keywordAddCount = this.keywordAddCount - 1
      }
    },
    delKeyword(e) {
      this.keywordlist.splice(e, 1)
      this.keywordAddCount = this.keywordAddCount + 1
    },
    onEditorChange(event) {
      // console.log(event)
      event.quill.deleteText(5000, 4)
      if (this.content === '') {
        this.number = 0
      } else {
        this.number = event.quill.getLength() - 1
      }
    },
    ddd(file, detail) {
      this.filelupload.splice(detail.index, 1)
    },

    dada() {
      this.daada()
    },
    // 发布
    haneleRelease() {
      if (this.title == '' || this.title == null) {
        this.$toast('标题不能为空')
      } else if (this.chkstrlen(this.title) > 60) {
        this.$toast('标题长度超过最大限制')
      } else if (this.content == '' || this.content == null) {
        this.$toast('内容不能为空')
      } else if (this.description == '' || this.description == null) {
        this.$toast('摘要不能为空')
      } else if (this.fileList == '' || this.fileList == null) {
        this.$toast('封面不能为空')
      } else {
        var date = {
          tid: localStorage.getItem('cityid') ? localStorage.getItem('cityid') : 1,
          title: this.title,
          content: this.content,
          draft: 1,
          description: this.description,
          uploadPic: this.filelupload,
          field: this.field,
          label: this.keywordlist.join(',')
        }
        console.log(this.filelupload)
        // 发帖
        this.$axios({
          method: 'post',
          url: this.GLOBAL.baseURL + '/forum/add',
          data: date
        }).then(res => {
          if (res.data.result) {
            this.$router.push({
              path: '/history_release'
            })
            this.$toast('发布成功!')
          } else {
            this.$toast(res.data.msg)
          }
          if (res.data.login == false) {
            this.$router.push({
              path: '/land'
            })
          }
        })
      }
    },
    // 存草稿
    haneledraft() {
      if (this.title == '' || this.title == null) {
        this.$toast('标题不能为空')
      } else if (this.chkstrlen(this.title) > 60) {
        this.$toast('标题长度超过最大限制')
      } else if (this.content == '' || this.content == null) {
        this.$toast('内容不能为空')
      } else if (this.description == '' || this.description == null) {
        this.$toast('摘要不能为空')
      } else {
        var date = {
          tid: localStorage.getItem('cityid') ? localStorage.getItem('cityid') : 1,
          title: this.title,
          content: this.content,
          draft: 2,
          description: this.description,
          uploadPic: this.filelupload,
          field: this.field,
          label: this.keywordlist.join(',')
        }
        console.log(this.filelupload)
        this.$axios({
          method: 'post',
          url: this.GLOBAL.baseURL + '/forum/add',
          data: date
        }).then(res => {
          console.log(res)
          if (res.data.result) {
            this.$router.push({
              path: '/caogao'
            })
          }
          this.$toast(res.data.msg)
          if (res.data.login == false) {
            this.$router.push({
              path: '/land'
            })
          }
        })
      }
    },
    // 预览
    handlepass() {
      if (this.title == '' || this.title == null) {
        this.$toast('标题不能为空')
      } else if (this.chkstrlen(this.title) > 60) {
        this.$toast('标题长度超过最大限制')
      } else if (this.content == '' || this.content == null) {
        this.$toast('内容不能为空')
      } else if (this.description == '' || this.description == null) {
        this.$toast('摘要不能为空')
      } else {
        var html = {
          title: this.title,
          content: this.content
        }

        sessionStorage.setItem('html', JSON.stringify(html))

        this.$router.replace({
          path: '/preview'
        })
      }
    },
    // 话题发布
    haneleconversation() {
      if (this.title == '' || this.title == null) {
        this.$toast('标题不能为空')
      } else if (this.chkstrlen(this.title) > 60) {
        this.$toast('标题长度超过最大限制')
      } else if (this.content == '' || this.content == null) {
        this.$toast('内容不能为空')
      } else if (this.description == '' || this.description == null) {
        this.$toast('摘要不能为空')
      } else {
        var date = {
          tid: localStorage.getItem('cityid') ? localStorage.getItem('cityid') : 1,
          title: this.title,
          content: this.content,
          draft: 1,
          description: this.description,
          uploadPic: this.filelupload,
          field: '20191017101625895591130',
          label: this.keywordlist.join(',')
        }

        // 发帖
        this.$axios({
          method: 'post',
          url: this.GLOBAL.baseURL + '/forum/add',
          data: date
        }).then(res => {
          // console.log(res);
          if (res.data.result) {
            this.$router.push({
              path: '/history_release'
            })
            this.$toast(res.data.msg)
          } else {
            this.$toast(res.data.msg)
          }
          if (res.data.login == false) {
            this.$router.push({
              path: '/land'
            })
          }
        })
      }
    },
    //富文本上传图片
    handleSuccess(res) {
      var data = new FormData()
      data.append('file', res.file)
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/file/uploadpic',
        data: data
      }).then(res => {
        this.str = res.data.pojo.savepath
        let quill = this.$refs.myQuillEditor.quill
        // 如果上传成功
        if (res.data.result) {
          // 获取光标所在位置
          let length = quill.getSelection().index
          // 插入图片，res为服务器返回的图片链接地址
          quill.insertEmbed(length, 'image', this.GLOBAL.basesURL + this.str)
          // 调整光标到最后
          quill.setSelection(length + 1)
        } else {
          // 提示信息，需引入Message
          Message.error('图片插入失败')
        }
      })
    },
    // 上传封面
    hand(res) {
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

          this.filelupload.push(res.data.pojo.id)

          this.fileimg.push(res.data.pojo.savepath)

          if (this.filelupload.length == 2) {
            this.$toast('上传两个，封面只显示一个')
          }
        })
      }
    },
    // 入驻信息查询
    async handlesettled() {
      const res = await axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/settled/get'
      })
      if (res.data.msg == '用户未登陆') {
        this.$router.push({
          path: '/land'
        })
      }
      if (res.data.msg == '登录信息错误') {
        this.$router.push({
          path: '/land'
        })
      }
      if (res.data.pojo) {
        this.field = res.data.pojo.field
      }
    },
    // 领域查询
    async handlefield() {
      const res = await axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/field/list'
      })
      // this.field = res.data.pojo.field;
    },
    onEditorReady(editor) {
      // 准备编辑器
    },
    removeHtml(answerIdx) {
      for (var i = 0; i < this.removeList.length; i++) {
        console.log(answerIdx, this.removeList[i])
        if (answerIdx == this.removeList[i]) {
          //取消点击
          this.answerList[answerIdx].kmAnswer = this.answerList[answerIdx].kmAnswerBak
          this.removeList.splice(answerIdx, 1)
          return
        }
      }
      this.answerList[answerIdx].kmAnswerBak = this.answerList[answerIdx].kmAnswer // 保存一份备份
      this.answerList[answerIdx].kmAnswer = this.answerList[answerIdx].kmAnswer.replace(
        /<[^>]+>/g,
        ''
      )
      this.removeList.push(answerIdx)
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件

    //用户查询
    info() {
      var id = this.$route.params.id
      // console.log(id);
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/forum/draftpage'
      }).then(res => {
        // console.log(res);
        for (var i = 0; i < res.data.pojo.list.length; i++) {
          if (res.data.pojo.list[i].id == id) {
            this.title = res.data.pojo.list[i].title
            this.content = res.data.pojo.list[i].content
            this.description = res.data.pojo.list[i].description
          }
        }
      })
    }

    // 视频上传
    // async handleuploading() {
    //    var daes = {
    //      tid: localStorage.getItem("cityid")
    //         ? localStorage.getItem("cityid")
    //         : 1,
    //       title: this.title, //标题
    //       description: this.description, //描述
    //       classify_one: this.classify_one, //一级频道
    //       classify_two: this.classify_two, //二级频道
    //       publish: 1,
    //       m: this.m, //上传视频
    //       m1: this.fileli //上传封面
    //     };
    //   const res = await axios({
    //     method: "post",
    //     url: this.GLOBAL.baseURL + "/postVo/post",
    //     data: daes
    //   });
    //   console.log(res);
    // }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  created() {
    this.info()
    this.handlesettled()
    this.handlefield()
    window.localStorage.setItem('kong', 1)
    // 内容
  },
  // beforeRouteEnter: (to, from, next) => {
  //   next(vm => {
  //     if (from.name == 'preview') {
  //       console.log('....')
  //       return
  //     }
  //     {
  //       to.meta.keepAlive = false
  //       console.log('不走缓存了')
  //       console.log(from.name)
  //       return
  //     }
  //   })
  // }
  beforeRouteLeave(to, from, next) {
    if (to.name == 'preview') {
      from.meta.keepAlive = true
    } else {
      from.meta.keepAlive = false
    }

    next()
  }
}
</script>

<style scoped lang="less">
.rem(@name, @px) {
  @{name}: @px / 75 * 1rem;
} // .ql-snow .ql-editor h1{
//     font-size: 2rem !important;
// }
.addkeywords_button {
  padding-left: 14px;
  font-size: 17px;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: rgba(3, 169, 244, 1);
}
.Keyword {
  padding-left: 14px;
  margin-top: 20px;
  input {
    width: 116px;
    height: 34px;
    border: 1px solid #ccc;
    padding-left: 14px;
    font-size: 14px;
  }
  .keywordlist {
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .keyworditem {
      margin-right: 13px;
      display: flex;
      flex-direction: row;
      background: #a0defa;
      border-radius: 2px;

      font-size: 17px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: rgba(3, 169, 244, 1);
      padding: 0 6px;
      align-items: center;
      margin-bottom: 10px;
      span {
        font-size: 20px;
        margin-left: 4px;
      }
    }
  }
}
.number {
  position: relative;
  width: 70px;
  height: 20px;
  float: right;
  bottom: 20px;
  left: -18px;
  text-align: right;
  .rem(font-size, 24);
  color: #757575;
}
.headerfg {
  width: 100%;
  .rem(height, 110);
  display: flex;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #f6f6f6;
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
    .rem(font-size, 38);
  }
}
.ql-align-center {
  text-align: center !important;
}

.ql-editor .ql-align-justify {
  text-align: justify !important;
}

.ql-editor .ql-align-right {
  text-align: right !important;
}
.van-tabs__wrap {
  border-bottom: 8px solid #f3f3f3 !important;
  box-shadow: 0px 1px 1px 0px rgba(234, 234, 234, 1);
}
.back-i {
  position: relative;
  img {
    position: absolute;
    margin-top: -45px;
    .rem(width, 40);
    .rem(left, 10);
  }
}
.back-z {
  position: relative;
  img {
    position: absolute;
    margin-top: -50px;
    .rem(width, 40);
    .rem(left, 10);
  }
}
.wenzhang {
  .bianji {
    width: 93%;
    .rem(min-height, 570);
    margin: 0 auto;
    .rem(margin-top, 30);
    .biaoti {
      width: 98%;
      input {
        width: 100%;
        margin: 0 auto;
        .rem(height, 60);
        border: 1px solid #ccc;
        .rem(margin-top, 30);
        text-align: center;
        .rem(font-size, 32);
        border-radius: 2px;
        font-family: SourceHanSansCN-Bold, SourceHanSansCN;
        -webkit-appearance: none;
      }
    }
    .concat {
      width: 98%;
      margin: 0 auto;
      .rem(min-height, 350); // border: 1px solid #f3f3f3;
      .rem(margin-top, 30);
      .rem(margin-left, 0);
      .rem(margin-right, 0);
    }
  }
  .zhaiyao {
    margin: 0 auto;
    p {
      .rem(line-height, 60);
      // .rem(font-size, 24);
      font-size: 16px;
      font-family: SourceHanSansCN-Normal, SourceHanSansCN;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
    }
    .zhai_yao {
      width: 98%;
      .rem(height, 70);
      border: 1px solid rgba(209, 209, 209, 1);
      input {
        border: none;
        width: 93%;
        height: 100%;
        .rem(padding-left, 30);
        .rem(font-size, 27);
      }
    }
  }
  .fengmian {
    width: 93%;
    margin: 0 auto;
    p {
      .rem(line-height, 60);
      font-size: 16px;
      font-family: SourceHanSansCN-Normal, SourceHanSansCN;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
    }
  }
  .van-tabs__line {
    background-color: #fff !important;
  }
  .fabu {
    padding-top: 4%;
    .rem(padding-left, 27);
    margin: 0 auto;
    margin-bottom: 90px;
    .bbs {
      .rem(width, 130);
      border: none;
      padding: 3px 0px 3px 0px;
      background: #03a9f4;
      .rem(font-size, 28);
      color: #fff;
      font-family: SourceHanSansCN-Normal, SourceHanSansCN;
      border-radius: 2px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin-right: 5px;
    }
  }
  .wenzhangshuxing {
    padding: 5px;
    width: 90%;
    margin: 0 auto;
    p {
      .rem(line-height, 60);
      .rem(font-size, 25);
    }
    .shuxing {
      ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li {
          .rem(width, 100);
          background: #f3f3f3;
          .rem(padding, 8);
          .rem(margin-bottom, 20);
        }
      }
    }
  }
  .bbstop {
    .rem(width, 130);
    padding: 3px 0px 3px 0px;
    .rem(font-size, 28);
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
    margin-right: 5px;
    border: 1px solid rgba(209, 209, 209, 1);
  }
  .bbsconter {
    .rem(width, 130);
    padding: 3px 0px 3px 0px;
    .rem(font-size, 28);
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
    margin-right: 5px;
    border: 1px solid rgba(209, 209, 209, 1);
  }
  .bbsbottom {
    .rem(width, 130);
    padding: 3px 0px 3px 0px;

    .rem(font-size, 28);
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
    margin-right: 5px;
    border: 1px solid rgba(209, 209, 209, 1);
  }
}
.banner {
  .rem(margin-top, 20);
  input {
    .rem(height, 64);
    width: 90%;
    text-align: center;
    .rem(margin-left, 40);
    .rem(margin-top, 50);
  }
  img {
    .rem(width, 196);
    .rem(height, 182);
    .rem(margin-left, 230);
    .rem(margin-top, 100);
  }
  h5 {
    .rem(margin-left, 40);
  }
}
.text-area {
  .rem(height, 128);
  .rem(width, 576);
  .rem(margin-left, 40);
  .rem(margin-top, 10);
}
h4 {
  .rem(margin-left, 40);
}
select {
  .rem(margin-left, 162);
  background: #fff;
  .rem(width, 176);
  .rem(height, 36);
}
.btn-button {
  .rem(margin-left, 30);
  .rem(margin-top, 20);
}
.van-button {
  .rem(width, 174);
  .rem(height, 44);
  line-height: 0;
  display: inline-block;
  vertical-align: middle;
}
.van-tabs /deep/ .van-ellipsis {
  font-size: 18px;
}
/////////////////////////////////////////////////上传视频
.content {
  background: rgba(0, 222, 0, 0.3);
  .rem(width, 100%);
  .rem(height, 640);
}
.spanMr {
  .rem(width, 120);
  .rem(margin-top, 20);
  .rem(font-size, 30);
  margin-left: 35%;
  background: #1989fa;
  color: #fff;
  padding: 5px;
  border-radius: 5%;
  margin: 0 auto;
}
#videoId {
  border: 1px solid #a9a9a9;
  .rem(height, 300);
  width: 90%;
  .rem(margin-left, 35);
}
textarea {
  .rem(height, 150);
  .rem(margin-left, 35);
  width: 90%;
}
/deep/.van-field__control {
  border: 1px solid #999999;
  padding-left: 0.4rem;
  padding-top: 2px;
}
/deep/.van-cell {
  padding: 0;
}
</style>
<style>
/* .van-uploader {
  margin-left: 20px;
} */
</style>
<style>
.ql-container.ql-snow {
  height: 178px;
}
.ql-snow .ql-editor img {
  width: 100px;
}
.van-icon .van-image img {
  display: block !important;
}
.van-icon,
.van-image,
.van-image img {
  display: block !important;
}

.ql-toolbar.ql-snow .ql-formats {
  margin-right: 0px !important;
}
.ql-toolbar.ql-snow {
  padding: 0 !important;
  display: inline-block;
  width: 100%;
}
</style>