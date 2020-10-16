<template>
  <div class="release">
    <div class="header">
      <div>
        <img src="../assets/jiantoua.png" alt @click="$router.back()" />
      </div>
      <p>文章发布</p>
    </div>
    <!-- <van-tabs v-model="activeName" line-width="60px" color="#03A9F4" title-active-color="#03A9F4">
      <van-tab title="文章发布" name="a"> -->
    <div class="wenzhang">
      <!-- <i @click="$router.back()" class="back-i">
            <img src="../assets/fanhui.png" alt />
          </i> -->
      <div class="bianji">
        <div class="biaoti">
          <input type="text" placeholder="请输入标题" v-model="title" @input="inputTitle" />
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
      </div>
      <div class="zhaiyao">
        <p>摘要</p>
        <div class="zhai_yao">
          <input type="text" v-model="description" />
        </div>
      </div>
      <div class="fengmian">
        <p>文章封面</p>
        <div class="upload">
          <van-uploader v-model="fileList" multiple :max-count="3" @delete="ddd" :after-read="hand" />
        </div>
      </div>
      <!--  -->
      <div class="addkeywords_button" v-if="keywordAdd &&keywordlist.length<5">
        <span @click="keywordAddToinput">+关键词&nbsp;( {{5-keywordAddCount}}/5 )&nbsp;</span>
      </div>
      <div class="Keyword">
        <input type="text" placeholder="请输入关键词" ref="inputAddKeyword" @keyup.enter="addkeywordsEneter" @blur="addkeywords" v-model="inputvalue" v-if="!keywordAdd" />
        <div class="keywordlist">
          <div class="keyworditem" v-for="(item,index) in keywordlist" :key="index">
            {{item}} <span @click="delKeyword(index)">×</span>

          </div>
        </div>
      </div>
      <!--  -->
      <div class="fabu">
        <!-- <button @click="handleRelease">发布</button> -->
        <button @click="handlePreservation">保存</button>
        <!-- <button>预览</button> -->
      </div>
    </div>
    <!-- </van-tab> -->
    <!-- <van-tab title="视频发布" name="b" style> -->
    <!-- <i @click="$router.back()" class="back-z">
          <img src="../assets/fanhui.png" alt />
        </i>
        <div class="video">
          <div class="banner">
            <input type="text" placeholder="请输入标题" />
            <img src="../assets/videopic000001.png" alt />
            <van-uploader>
              <van-button type="primary" accept="video/*">上传视频</van-button>
            </van-uploader>
            <h5>视频简介</h5>
            <textarea rows="3" cols="20" class="text-area" placeholder="请输入5～200字的视频描述，有利于获得"></textarea>
          </div>
        </div>
        <h4>视频封面</h4>
        <van-uploader v-model="fileList" multiple :max-count="1" />
        <h4>频道分类</h4>
        <div>
          <select name id>
            <option value>1</option>
            <option value>2</option>
            <option value>3</option>
            <option value>4</option>
            <option value>5</option>
          </select>
          <select name id>
            <option value>6</option>
            <option value>7</option>
            <option value>8</option>
            <option value>9</option>
            <option value>10</option>
          </select>
        </div>
        <van-button type="info" class="btn-button">发布</van-button>
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
  ['image'] // remove formatting button
]
export default {
  name: 'handlerelasse',
  components: {
    quillEditor
  },
  data() {
    return {
      activeName: 'a',
      content: ``,
      dadada: '',
      str: '',
      keywordlist: [],
      keywordAdd: true,
      keywordAddCount: 5,
      inputvalue: '',
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions, //工具栏
            handlers: {
              image: value => {
                console.log(value)
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
      draft: 0,
      fileList: [],
      filelupload: [],
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
      uploadPic: [], //图片
      uploadId: '', //封面id
      description: '' //摘要
    }
  },
  methods: {
    inputTitle() {
      if (this.title.replace(/\s+/g, ' ').length >= 60) {
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
      if (this.inputvalue.replace(/\s+/g, '') == '') {
        this.$toast('请输入后再添加')
      } else if (this.chkstrlen(this.inputvalue.replace(/\s+/g, '')) > 10) {
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
    ddd(file) {
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/file/del?id=' + this.uploadId[0]
      }).then(res => {
        this.$toast(res.data.msg)
      })
    },
    daada() {},
    dada() {
      this.daada()
    },
    // 保存
    handlePreservation() {
      var date = {
        tid: localStorage.getItem('cityid') ? localStorage.getItem('cityid') : 1,
        title: this.title,
        content: this.content,
        id: this.id,
        uploadId: this.filelupload,
        description: this.description,
        uploadPic: this.uploadPic,
        label: this.keywordlist.join(',')
      }
      console.log(this.uploadId)
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/forum/edit',
        data: date
      }).then(res => {
        console.log(res)
        this.$toast(res.data.msg)
        this.$router.push({
          path: '/caogao'
        })
      })
    },
    //上传图片
    handleSuccess(res) {
      var data = new FormData()
      // console.log(fileData)
      data.append('file', res.file)
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/file/uploadpic',
        data: data
      }).then(res => {
        console.log(res)
        this.str = res.data.pojo.savepath
        console.log(this.str)
        // console.log(res)
        let quill = this.$refs.myQuillEditor.quill
        // 如果上传成功
        if (res.data.result) {
          // 获取光标所在位置
          let length = quill.getSelection().index
          // 插入图片，res为服务器返回的图片链接地址
          quill.insertEmbed(length, 'image', this.GLOBAL.basesURL + this.str)
          console.log(quill.insertEmbed)
          // console.log(quill.insertEmbed(length,'image',res.content))
          // 调整光标到最后
          quill.setSelection(length + 1)
        } else {
          0
          // 提示信息，需引入Message
          Message.error('图片插入失败')
        }
      })
    },
    hand(res) {
      var data = new FormData()
      if (res instanceof Array) {
        data.append('file', res)
        console.log(1)
      } else {
        data.append('file', res.file)
        this.$axios({
          method: 'post',
          url: this.GLOBAL.baseURL + '/file/uploadpic',
          data: data
        }).then(res => {
          this.filelupload.push(res.data.pojo.id)
          console.log(this.filelupload)
        })
      }
    },
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange(aaa) {
      // console.log(aaa)
    }, // 内容改变事件

    //用户草稿箱查询
    // 编辑展示
    info() {
      var id = this.$route.params.id
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/forum/draftpage'
      }).then(res => {
        console.log(res)
        for (var i = 0; i < res.data.pojo.list.length; i++) {
          if (res.data.pojo.list[i].id == id) {
            this.title = res.data.pojo.list[i].title
            this.content = res.data.pojo.list[i].content
            this.description = res.data.pojo.list[i].description
            this.id = res.data.pojo.list[i].id
            this.uploadId = res.data.pojo.list[i].uploadId
            if (res.data.pojo.list[i].label != '') {
              this.keywordlist = res.data.pojo.list[i].label.split(',')
            }

            this.keywordAddCount = 5 - this.keywordlist.length
            if (res.data.pojo.list[i].uploadPic.length == 1) {
              this.fileList.push({
                // url: 'http://47.94.215.133' + res.data.pojo.list[i].uploadPic
                url: this.GLOBAL.basesURL + res.data.pojo.list[i].uploadPic
              })
            } else {
              for (var a = 0; a < res.data.pojo.list[i].uploadPic.length; a++) {
                this.fileList.push({
                  // url: 'http://47.94.215.133' + res.data.pojo.list[i].uploadPic[a]
                  url: this.GLOBAL.basesURL + res.data.pojo.list[i].uploadPic[a]
                })
              }
            }
            // this.fileList.push({url: "http://47.94.215.133" + res.data.pojo.list[i].uploadPic});

            console.log(this.fileList)
          }
        }
      })
    }
    // handletext(){
    //  var ccc = JSON.parse(window.localStorage.getItem('res'))
    // //  console.log(ccc)
    //  this.title = ccc.title
    //  this.tid = ccc.tid
    //  this.content = ccc.content
    //  this.description= ccc.description
    //  if(ccc.uploadPic.length==1){
    //    this.fileList.push({url:'http://47.94.215.133'+ ccc.uploadPic})
    //  }else {
    //    for(var a= 0;a<ccc.uploadPic.length;a++){
    //      this.fileList.push({url:'http://47.94.215.133'+ ccc.uploadPic[a]})
    //    }
    //  }
    // },
    // 视频上传
    // async handleuploading() {
    //   const res = await axios({
    //     method: "post",
    //     url: this.GLOBAL.baseURL + "/postVo/post",
    //     data: {
    //       title: this.title, //标题
    //       description: this.description, //描述
    //       tid: this.tid, //城市
    //       classify_one: this.classify_one, //一级频道
    //       classify_two: this.classify_two, //二级频道
    //       publish: this.publish, //1 发布 2 草稿
    //       m: this.m, //上传视频
    //       m1: this.m1 //上传封面
    //     }
    //   });
    //   //   this.comelist = res.data.pojo
    //   // console.log(this.comelist)
    //   console.log(res);
    // }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  mounted() {
    // this.info();
  },
  created() {
    // this.handletext()
    this.info()
  }
}
</script>

<style scoped lang="less">
.rem(@name, @px) {
  @{name}: @px / 75 * 1rem;
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
    .rem(left, 28);
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
    width: 90%;
    .rem(min-height, 570);
    margin: 0 auto;
    .rem(margin-top, 30);
    .biaoti {
      width: 100%;
      input {
        width: 100%;
        margin: 0 auto;
        .rem(height, 60);
        border: 1px solid #ccc;
        .rem(margin-top, 30);
        text-align: center;
      }
    }
    .concat {
      width: 100%;
      margin: 0 auto;
      .rem(min-height, 350); // border: 1px solid #f3f3f3;
      .rem(margin-top, 30);
    }
  }
  .zhaiyao {
    padding: 5px;
    width: 90%;
    margin: 0 auto;
    p {
      .rem(line-height, 60);
      font-size: 16px;
    }
    .zhai_yao {
      width: 100%;
      .rem(height, 70);
      border: 1px solid #ccc;
      input {
        border: none;
        width: 100%;
        height: 100%;
      }
    }
  }
  .fengmian {
    padding: 5px;
    width: 90%;
    margin: 0 auto;
    p {
      .rem(line-height, 60);
      font-size: 16px;
    }
  }
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
  .fabu {
    padding: 5px;
    width: 90%;
    margin: 0 auto;
    button {
      .rem(width, 130);
      .rem(height, 60);
      border: none;
      background: #03a9f4;
      .rem(font-size, 25);
      color: #fff;
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
}
.banner {
  .rem(height, 634);
  .rem(width, 656);
  border: 1px solid rgba(209, 209, 209, 1);
  margin: 0 auto;
  margin-top: 20px;
  input {
    .rem(width, 567);
    .rem(height, 64);
    text-align: center;
    .rem(margin-left, 40);
    .rem(margin-top, 34);
    .rem(font-size, 40);
    font-weight: 550;
    border-left: 1px solid rgba(209, 209, 209, 1);
    border-top: 1px solid rgba(209, 209, 209, 1);
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
  .rem(margin-left, 80);
}
select {
  .rem(margin-left, 162);
  background: #fff;
  .rem(width, 176);
  .rem(height, 36);
}
.btn-button {
  margin-left: 30px;
  margin-top: 20px;
}
.van-button {
  .rem(width, 174);
  .rem(height, 44);
  line-height: 0;
  display: inline-block;
  vertical-align: middle;
}
// .van-uploader__upload {
//   width: 88px;
//   /* margin-left: ; */
//   margin: 0 125px 8px 0;
// }
</style>
<style>
.van-button--primary {
  background: #d8d8d8;
  border: 1px solid #d8d8d8;
}
.van-uploader {
  display: inline;
  text-align: center;
  display: flex;
  /* justify-content: center; */
}
.van-button__text {
  font-size: 12px;
  color: #515151;
}
</style>

<style>
.ql-snow .ql-editor img {
  width: 100px;
}
</style>