<template>
  <div class="geren">
    <div class="grxx">
      <p class="p">
        <i @click="$router.back()">
          <img src="../assets/fanhui.png" alt />
        </i>
        <span class="graa"></span>
      </p>
      <ul>
        <li>
          <i class="diandian"></i>
          <span>主体类型</span>
          <span>个人</span>
        </li>
        <li>
          <i class="diandianr"></i>
          <span>运营者姓名</span>
          <input type="text" v-model="name" />
          <div class="bgeba">请与组织机构代码证或营业执照名称保持一致，审核通过后不可修改</div>
        </li>
        <li class="li1">
          <i class="diandianr"></i>
          <span>运营者证件号码</span>
          <select v-model="document_type" name id>
            <option value="1">居民身份证</option>
            <option value="2">军官证</option>
            <option value="3">护照</option>
            <option value="4">港澳台通行证</option>
          </select>
        </li>
        <li>
          <span></span>
          <input type="text" v-model="document_number" />
        </li>
        <li class="li2">
          <i class="diandian"></i>
          <dl>
            <dt>
              <span id="hspan">运营者证件照片</span>
              <div class="tu">
                <img class="head-img" src ref="goodsImgs" alt />
              </div>
            </dt>
            <dd>
              <p>请勿使用二维码，企业相关或者带有营销信息的图片作为头像，支持jpg、jpeg、png，最大5M</p>
              <div class="back">
                <van-uploader :after-read="onReads" accept="image/*" v-model="Certificates" class="unploadImg1">选择文件</van-uploader>
              </div>
            </dd>
          </dl>
        </li>
        <li id="flag">
          <i class="diandianr"></i>
          <span>居住地址</span>
          <img v-if="handleimg" src="../assets/buttonjian.png" alt="" @click="addBtnFlag && diqu()">
          <input readonly="readonly" onfocus='this.blur()' style="width: 26%;" ref="stylewidth" @click="addBtnFlag && diqu()" placeholder="请选择" v-model="subject" />
        </li>
        <li>
          <span></span>
          <input type="text" v-model="subject_address" placeholder="必填项，请输入居住地址" />
          <van-popup v-model="showone" position="bottom">
            <van-area :area-list="areaList" :columns-num="3" @confirm="queren" @cancel="quxiao" />
          </van-popup>
        </li>
        <li>
          <i class="diandianr"></i>
          <span>手机号码</span>
          <input type="text" v-model="phone" />
          <img src="../assets/duihao.png" v-if="handledioimg" alt />
          <img class="bai" src="../assets/bai.png" v-if="handlediobai" alt />
          <input :disabled="disabled" :value="getCode.txt" @click="yanzhengs" class="button" />
          <div class="bgeba">请填写运营者手机号</div>
          <span></span>
          <input id="yanzheng" @blur="handlefocus" v-model="code" placeholder="请填写验证码" type="text" />
          <i v-if="handlefack">验证码错误</i>
          <van-radio-group v-model="radio" v-if="handleradio">
            <van-radio name="1" shape="square" checked-color="#03a9f4"></van-radio>
          </van-radio-group>
        </li>
        <li>
          <i class="diandianr"></i>
          <span>邮箱号码</span>
          <input type="text" v-model="email" />
          <div class="bgeba">请填写本人常用邮箱，此邮箱将用来接收重要通知邮件</div>
        </li>
      </ul>
      <div class="ps">
        <div>
          <span>亿源社区信息</span>
          <div class="ssss"></div>
        </div>
        <div class="right">

        </div>
      </div>
      <ol>
        <li>
          <i class="diandiant"></i>
          <span>账号名称</span>
          <input type="text" v-model="account_title" />
          <div class="bgeba">2~10个字，请勿使用包含特殊符号或明显营销推广意图的媒体名</div>
        </li>
        <li>
          <i class="diandians"></i>
          <span>账号介绍</span>
          <textarea v-model="account_introduction" name id cols="7" rows="85" style="resize:none"></textarea>
          <div class="bgeba">描述请在10～120字，要求内容完整通顺，无特殊符号和企业信息</div>
        </li>
        <li class="li2">
          <i class="diandians"></i>
          <dl>
            <dt>
              <span id="hspan">账号头像</span>
              <div class="tu">
                <img class="head-img" src ref="goodsImg" alt />
              </div>
            </dt>
            <dd>
              <p>请勿使用二维码，企业相关或者带有营销信息的图片作为头像，支持jpg、jpeg、png，最大5M</p>
              <div class="back">
                <van-uploader :after-read="onRead" accept="image/*" v-model="fistlist">选择文件</van-uploader>
              </div>
            </dd>
          </dl>
        </li>
        <li>
          <i class="diandiant"></i>
          <span>领域</span>
          <select name id v-model="field">
            <option v-for="(item,index) in lingyuList" :key="index" :value="item.id" v-show="item.name !== '关注'&&item.name !== '推荐'">{{item.name}}</option>
          </select>
        </li>
        <!-- <li>
          <span>邀请码</span>
          <input type="text" v-model="invitation_code" />
        </li>-->
        <li>
          <i class="diandians"></i>
          <span>辅助材料</span>
          <textarea type="text" style="resize:none" v-model="auxiliary_materials"></textarea>
          <div class="bgeba">请填写您在个人网址、博客、微信、订阅号或其他互动平台下发布的原创文章链接，可以帮助您获得更多的曝光和推荐</div>
        </li>
        <li class="li2">
          <i class="diandians"></i>
          <dl>
            <dt>
              <span id="hspan">辅助资料图片</span>
              <div class="tu">
                <img class="head-img" src ref="goodsImgrf" alt />
              </div>
            </dt>
            <dd>
              <p>可以上传能证明您专业能力的资料，方便我们评估您的账号，从而获得更多的曝光和推荐</p>
              <div class="back">
                <van-uploader :after-read="onReadrf" accept="image/*" v-model="materials">选择文件</van-uploader>
              </div>
            </dd>
          </dl>
        </li>
        <div class="checknice">
          <van-checkbox v-model="checked" checked-color="#03a9f4" shape="square">
            同意
            <span @click="handlexieyi">《亿源社区服务协议》</span>
          </van-checkbox>
        </div>
      </ol>
    </div>
    <div class="div">
      <button class="button" :disabled="State==false" :class="{btnBg:State}" @click="tijiao">提交</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import areaList from '../../static/citytwo.js'
export default {
  name: 'App',
  data() {
    return {
      addBtnFlag: true,
      showone: false,
      areaList: areaList,
      checked: false,
      lingyuList: [],
      name: '',
      size: '',
      document_type: 1,
      document_number: '',
      subject_name: '',
      phone: '',
      website_weibo: '',
      document_img: '',
      subject: '',
      account_introduction: '',
      account_img: '',
      account_imgone: '',
      account_imgrf: '',
      field: '20190620160804833109212',
      account_title: '',
      subject_address: '',
      subject_province: '',
      subject_type: 1,
      organizational_code: '',
      organizational_code_img: '',
      authorization_scanner: '',
      email: '',
      auxiliary_materials: '',
      jiancai: false,
      isDisable: false,
      fistlist: [],
      status: '',
      getCode: {
        txt: '获取验证码'
      },
      disabled: false,
      materials: [],
      Certificates: [],
      code: '',
      radio: '1',
      handleradio: false,
      handledioimg: false,
      handlefack: false,
      fileDete: '',
      handleradioty: true,
      handlediobai: true,
      bbs: '',
      handleimg: true
    }
  },
  computed: {
    State() {
      return this.checked !== false
    }
  },
  watch: {
    subject: function(text) {
      if (text.length <= 11) {
        this.$refs.stylewidth.style.width = '40%'
      } else if (text.length <= 14) {
        console.log('小于14')
        this.$refs.stylewidth.style.width = '40%'
      } else if (text.length <= 18) {
        console.log('小于14')
        this.$refs.stylewidth.style.width = '60%'
      }
    }
  },
  methods: {
    tijiao() {
      if (this.status == 2 || this.status == 1) {
        this.$toast('用户已入驻请勿反复操作')
      } else if (this.name == '' || this.name == null || this.name.length >= 8) {
        this.$toast('请输入姓名')
      } else if (!/^[\u4E00-\u9FA5]{2,4}$/.test(this.name)) {
        this.$toast('请输入正确的姓名')
      } else if (this.document_number == '' || this.document_number == null) {
        this.$toast('请输入身份证号')
      } else if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.document_number)) {
        this.$toast('身份证号填写错误，请重新输入')
      } else if (this.phone == '' || this.phone == null) {
        this.$toast('请输入手机号码')
      } else if (this.phone.length < 11) {
        this.$toast('手机号码填写错误，请重新输入')
      } else if (this.subject_address == '' || this.subject_address == null) {
        this.$toast('请输入详细地址')
      } else if (this.code == '' || this.code == null) {
        this.$toast('请输入验证码')
      } else if (this.email == '' || this.email == null) {
        this.$toast('请输入邮箱')
      } else if (!/^\w+@[a-z0-9]+\.[a-z]{2,4}$/.test(this.email)) {
        this.$toast('邮箱格式错误，请重新输入')
      } else if (this.account_title == '' || this.account_title == null) {
        this.$toast('请输入账户名称')
      } else if (this.account_introduction == '' || this.account_introduction == null) {
        this.$toast('请输入账户介绍')
      } else if (this.fistlist == '' || this.fistlist == null) {
        this.$toast('请上传头像')
      } else if (this.materials == '' || this.materials == null) {
        this.$toast('请上传辅助资料图片')
      } else {
        this.$axios({
          method: 'post',
          url: this.GLOBAL.baseURL + '/settled/set',
          data: {
            name: this.name,
            document_type: this.document_type,
            document_number: this.document_number,
            subject_name: this.subject_name,
            phone: this.phone,
            website_weibo: this.website_weibo,
            document_img: this.document_img,
            account_introduction: this.account_introduction,
            account_img: this.account_img,
            field: this.field,
            subject: localStorage.getItem('msgkas'),
            subject_province: localStorage.getItem('sheng'),
            subject_conuty: localStorage.getItem('qu'),
            subject_city: localStorage.getItem('shi'),
            auxiliary_materials: this.auxiliary_materials,
            account_title: this.account_title,
            subject_address: this.subject_address,
            subject_type: this.subject_type,
            organizational_code: this.organizational_code,
            organizational_code_img: this.organizational_code_img,
            authorization_scanner: this.authorization_scanner,
            email: this.email
          }
        }).then(res => {
          console.log(this.subject)
          this.$toast(res.data.msg == '用户已审核通过' ? '用户已入驻请勿反复操作' : res.data.msg)
          this.name = ''
          this.document_number = ''
          this.subject_address = ''
          this.phone = ''
          this.email = ''
          this.account_title = ''
          this.account_introduction = ''
          // this.invitation_code = "";
          this.auxiliary_materials = ''
          this.$router.replace({
            path: '/authentication'
          })
        })
      }
    },
    onReadrf(file) {
      this.size = file.content
      this.jiancai = true
      //将原图片显示为选择的图片
      var fileData = file.file
      // console.log(fileData)
      this.$refs.goodsImgrf.src = file.content
      var data = new FormData()
      // console.log(data)
      data.append('file', fileData)
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/file/uploadimg',
        data: data
      }).then(res => {
        // console.log(res)
        // console.log(res.data.pojo)
        this.account_imgrf = res.data.pojo
      })
    },
    onReadss(file) {
      this.size = file.content
      this.jiancai = true
      //将原图片显示为选择的图片
      var fileData = file.file
      this.$refs.goodsImgss.src = file.content
      var data = new FormData()
      data.append('file', fileData)
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/file/uploadimg',
        data: data
      }).then(res => {
        this.account_img = res.data.pojo
      })
    },
    onReads(file) {
      this.size = file.content
      this.jiancai = true
      //将原图片显示为选择的图片
      var fileData = file.file
      console.log(fileData)
      this.$refs.goodsImgs.src = file.content
      window.localStorage.setItem('fielDate', file.content)
      var data = new FormData()
      data.append('file', fileData)
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/file/uploadimg',
        data: data
      }).then(res => {
        this.document_img = res.data.pojo
      })
    },
    onReadsss(file) {
      this.size = file.content
      this.jiancai = true
      //将原图片显示为选择的图片
      var fileData = file.file
      this.$refs.goodsImgsss.src = file.content
      var data = new FormData()
      data.append('file', fileData)
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/file/uploadimg',
        data: data
      }).then(res => {
        this.authorization_scanner = res.data.pojo
      })
    },
    // 账号头像
    onRead(file) {
      this.size = file.content
      this.jiancai = true
      //将原图片显示为选择的图片
      var fileData = file.file
      // console.log(fileData)
      this.$refs.goodsImg.src = file.content

      var data = new FormData()
      // console.log(data)
      data.append('file', fileData)
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/file/uploadimg',
        data: data
      }).then(res => {
        // console.log(res)
        console.log(res.data.pojo)
        this.account_imgone = res.data.pojo
      })
    },
    async handlestates() {
      const res = await axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/settled/get'
      })
      this.status = res.data.pojo.status
    },
    info() {
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/field/list'
      }).then(res => {
        // console.log(res)
      })
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/settled/get'
      }).then(res => {
        // console.log(res)
      })
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/master/field/getpage'
      }).then(res => {
        this.lingyuList = res.data.list.slice(0, 3)
      })
    },
    handlexieyi() {
      var openQerty = {
        name: this.name,
        document_type: this.document_type,
        document_number: this.document_number,
        subject_name: this.subject_name,
        phone: this.phone,
        website_weibo: this.website_weibo,
        document_img: this.document_img,
        account_introduction: this.account_introduction,
        account_img: this.account_img,
        account_imgrf: this.account_imgrf,
        subject: this.subject,
        field: this.field,
        account_imgone: this.account_imgone,
        auxiliary_materials: this.auxiliary_materials,
        account_title: this.account_title,
        subject_address: this.subject_address,
        subject_type: this.subject_type,
        organizational_code: this.organizational_code,
        organizational_code_img: this.organizational_code_img,
        authorization_scanner: this.authorization_scanner,
        email: this.email
      }
      window.localStorage.setItem('openQer', JSON.stringify(openQerty))
      console.log(openQerty)
      this.$router.push({
        path: '/service'
      })
    },
    // 接收验证码
    yanzhengs: function() {
      var datae = { mobile: this.phone }
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/user/phonesend',
        data: datae,
        transformRequest: [
          function(data) {
            console.log(data)
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
        this.$toast(res.data.msg)
        if (res.data.result == true) {
          this.disabled = true
          this.getCode.txt = '获取中...'
          let seconds = 60
          let self = this
          let time = setInterval(function() {
            --seconds
            self.getCode.txt = seconds + 's'
            if (seconds <= 0) {
              clearInterval(time)
              self.disabled = false
              self.getCode.txt = '获取验证码'
            }
          }, 1000)
          this.handledioimg = true
          this.handlediobai = false
        }
      })
    },
    handlefocus() {
      var datae = { mobile: this.phone, code: this.code }
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/user/getphone',
        data: datae,
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
        if (res.data.result == true) {
          this.handleradio = true
          this.handlefack = false
        } else {
          this.handlefack = true
          this.handleradio = false
        }
      })
    },
    quxiao() {
      this.showone = false
    },
    diqu() {
      this.showone = true
    },
    queren(item) {
      console.log(item[0].name)
      localStorage.setItem('sheng', item[0].name)
      localStorage.setItem('shi', item[1].name)
      localStorage.setItem('qu', item[2].name)
      localStorage.setItem('msgkas', item[0].name + '/' + item[1].name + '/' + item[2].name)
      this.subject = localStorage.getItem('msgkas')
      this.showone = false
      this.handleimg = false
    }
  },
  created() {
    this.info()
    this.handlestates()
    var open = JSON.parse(localStorage.getItem('openQer'))
    var fileDete = window.localStorage.getItem('fielDate')
    // this.$refs.goodsImgs.src = fileDete;
    console.log(this.size)
    this.name = open.name
    this.document_number = open.document_number
    this.subject_name = open.subject_name
    this.phone = open.phone
    this.website_weibo = open.website_weibo
    this.document_img = open.document_img
    this.account_introduction = open.account_introduction
    this.account_img = open.account_img
    this.field = open.field
    this.subject = open.subject
    this.auxiliary_materials = open.auxiliary_materials
    this.account_title = open.account_title
    this.subject_address = open.subject_address
    this.subject_type = open.subject_type
    this.organizational_code = open.organizational_code
    this.organizational_code_img = open.organizational_code_img
    this.authorization_scanner = open.authorization_scanner
    this.email = open.email
  },
  mounted() {
    var open = JSON.parse(localStorage.getItem('openQer'))
    this.$refs.goodsImgs.src = 'http://47.92.85.1/' + open.document_img
    this.$refs.goodsImg.src = 'http://47.92.85.1/' + open.account_imgone
    this.$refs.goodsImgrf.src = 'http://47.92.85.1/' + open.account_imgrf
  }
}
</script>

<style scoped lang="less">
.px2rem(@name,@px) {
  @{name}: @px / 75 * 1rem;
}
#flag {
  input {
    // position: relative;
    .px2rem(height, 58);
    border: 1px solid #d0d0d0;
    text-align: left;
    padding-left: 6px;
    // background: #fff url(../assets/buttonjian.png) 70px 6px no-repeat;
    .px2rem(background-size, 32);
    .px2rem(font-size, 24);
  }
  img {
    position: absolute;
    width: 16px;
    padding-left: 20%;
    padding-top: 2.5%;
  }
}
.diandian {
  position: absolute;
  width: 8px;
  height: 8px;
  background: rgba(3, 169, 244, 1);
  border-radius: 50%;
  left: -15px;
  .px2rem(margin-top, 10);
}
.diandiant {
  position: absolute;
  width: 8px;
  height: 8px;
  background: rgba(3, 169, 244, 1);
  border-radius: 50%;
  left: -5px;
  .px2rem(margin-top, 20);
}
.diandianr {
  position: absolute;
  width: 8px;
  height: 8px;
  background: rgba(3, 169, 244, 1);
  border-radius: 50%;
  left: -15px;
  .px2rem(margin-top, 20);
}
.diandians {
  position: absolute;
  width: 8px;
  height: 8px;
  background: rgba(3, 169, 244, 1);
  border-radius: 50%;
  left: -5px;
  margin-top: 6px;
}
.van-radio-group {
  width: 40%;
  float: right;
  padding-top: 8px;
}
.bgeba {
  font-style: normal;
  margin-left: 31%;
  .px2rem(font-size, 24);
  font-family: SourceHanSansCN-Normal, SourceHanSansCN;
  font-weight: 400;
  color: #999999;
}
/*button可用时的背景颜色*/
.btnBg {
  background: #03a9f4 !important;
}
.button {
  .px2rem(width, 120);
  .px2rem(height, 55);
  .px2rem(margin-bottom, 30);
  background: #81d4fa;
  border: none;
  border-radius: 2px;
  color: #fff;
}
.cropper {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #000;
}
.box {
  width: 250px;
  height: 70%;
  background: #fff;
  margin: 0 auto;
}
.back {
  position: relative;
  // .px2rem(height, 50);
  width: fit-content;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  // .px2rem(width, 120);
  border-radius: 2px;
  background: #d1d1d1;
  padding: 4px;
  color: #333333;
  .px2rem(font-size, 22);
  // .px2rem(line-height, 50);
}
dl {
  display: flex;
  // .px2rem(margin-top, 25);
  .px2rem(margin-bottom, 20);
  dt {
    width: 100%;
    .tu {
      .px2rem(width, 172);
      .px2rem(height, 180);
      background: #f4f5f7;
      float: right;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  dd {
    display: flex;
    flex-flow: column;
    width: 70%;
    margin-left: 2%;
    p {
      flex: 1;
      height: 50%;
      .px2rem(font-size, 24);
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
  }
}
select {
  .px2rem(font-size, 12);
}
.tu {
  img {
    width: 100%;
    height: 100%;
  }
}
.grxx {
  position: relative;
  // width: 93%;
  margin: 20px auto;
  margin-left: 18px;
  padding-right: 10px;
  i {
    img {
      position: absolute;
      .px2rem(width, 40);
      padding-top: 7px;
    }
  }
  .p {
    .px2rem(line-height, 65);
    margin-top: 20px;
    .px2rem(margin-bottom, 20);
    span {
      display: block;
      .px2rem(height, 60);
      .px2rem(width, 200);
      .px2rem(font-size, 32);
      .px2rem(margin-left, 20);
      font-family: SourceHanSansCN-Normal, SourceHanSansCN;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
    }
    .graa {
      margin-left: 30px;
      .px2rem(margin-left, 50);
    }
  }
  .ps {
    .px2rem(line-height, 65);
    margin-top: 20px;
    .px2rem(margin-bottom, 20);
    display: flex;
    flex-direction: row;
    // border-bottom: 1px solid #e5e5e5;
    span {
      display: block;
      .px2rem(height, 60);
      .px2rem(width, 200);
      .px2rem(font-size, 32);
      // .px2rem(margin-left, 20);
      font-family: SourceHanSansCN-Normal, SourceHanSansCN;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
    }
    .graa {
      margin-left: 30px;
      .px2rem(margin-left, 50);
    }
  }
  ul {
    width: 95%;
    margin: 0 auto;
    li {
      position: relative;
      color: #666;
      .px2rem(margin-top, 30);
      width: 100%;
      font-family: SourceHanSansCN-Normal, SourceHanSansCN;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      span {
        display: inline-block;
        width: 30%;
        .px2rem(font-size, 28);
        font-family: SourceHanSansCN-Normal, SourceHanSansCN;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
      select {
        width: 28%;
        .px2rem(height, 58);
        border: none;
        border: 1px solid #d0d0d0;
        border-radius: 2px;
        background: #fff;
        .px2rem(font-size, 24);
      }
      input {
        width: 66%;
        .px2rem(height, 56);
        border: none;
        border: 1px solid #d0d0d0;
        border-radius: 2px;
        -webkit-appearance: none;
      }
    }
    li:nth-child(4) {
      .px2rem(margin-top, 12);
    }
    li:nth-child(7) {
      .px2rem(margin-top, 12);
    }
    li:nth-child(8) {
      input {
        width: 34%;
        -webkit-appearance: none;
      }
      .bai {
        width: 24px;
        height: 24px;
        vertical-align: middle;
      }
      img {
        width: 20px;
        height: 20px;
        vertical-align: middle;
      }
      .button {
        width: 20%;
        .px2rem(height, 56);
        border: 1px solid #b0b0b0;
        border-radius: 4px;
        background: #ebeaea;
        color: #626060;
        margin-bottom: 0px;
      }
      i {
        color: red;
        font-style: normal;
        .px2rem(font-size, 24);
        font-family: SourceHanSansCN-Normal, SourceHanSansCN;
        font-weight: 400;
      }
    }
    .li1 {
      input {
        width: 38%;
        -webkit-appearance: none;
      }
    }
    .li2 {
      .px2rem(line-height, 30);
      .px2rem(font-size, 15);
    }
  }
  ol {
    width: 95%;
    margin: 0 auto;
    li {
      color: #666;
      width: 100%;
      .px2rem(margin-top, 30);
      span {
        display: inline-block;
        width: 30%;
        .px2rem(font-size, 28);
        font-family: SourceHanSansCN-Normal, SourceHanSansCN;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
      input {
        width: 66%;
        .px2rem(height, 55);
        border: none;
        border: 1px solid #d0d0d0;
        border-radius: 2px;
        -webkit-appearance: none;
      }
      textarea {
        width: 66%;
        .px2rem(height, 150);
        border: none;
        border: 1px solid #d0d0d0;
        border-radius: 2px;
        .px2rem(padding-top, 16);
        .px2rem(padding-left, 13);
        float: right;
        -webkit-appearance: none;
      }
      textarea:nth-child(2) {
        width: 66%;
        .px2rem(height, 150);
        border: none;
        border: 1px solid #d0d0d0;
        border-radius: 2px;
        .px2rem(padding-top, 16);
        .px2rem(padding-left, 10);
        float: right;
        -webkit-appearance: none;
      }
      select {
        width: 26%;
        .px2rem(height, 62);
        border: none;
        border: 1px solid #d0d0d0;
        border-radius: 2px;
        background: #fff;
        .px2rem(font-size, 24);
      }
    }
    .li2 {
      .px2rem(line-height, 30);
      .px2rem(font-size, 15);
    }
  }
}
#yanzheng {
  width: 24%;
  .px2rem(margin-top, 10);
}
.ssss {
  .px2rem(width, 200);
  height: 2px;
  background: #03a9f4;
  // margin-left: 12px;
}
.h1 {
  .px2rem(font-size, 26);
  // .px2rem(margin-top, 35);
  .px2rem(margin-bottom, 20);
}
#hspan {
  width: 52%;
}
h2 {
  .px2rem(font-size, 26);
  font-family: SourceHanSansCN-Normal, SourceHanSansCN;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
}
input {
  padding-left: 2%;
  -webkit-appearance: none;
}
.checknice {
  .px2rem(margin-top, 35);
  display: flex;
  justify-content: center;
  .px2rem(font-size, 26);
  font-family: SourceHanSansCN-Normal, SourceHanSansCN;
  font-weight: 400;
  span {
    color: #ee3010;
  }
}
.div {
  width: 88%;
  display: flex;
  justify-content: center;
  button {
    text-align: center;
  }
}
.van-image {
  display: none;
}
.van-image img {
  display: none;
}
/deep/ i.van-icon {
  border-radius: 20%;
}
</style>
