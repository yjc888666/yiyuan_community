<template>
  <div class="qunmeitia">
    <div class="qunmeiti">
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
          <select v-model="subject_type">
            <option value="4">企业</option>
            <option value="5">机构</option>
            <option value="6">其他组织</option>
          </select>
        </li>
        <li>
          <i class="diandian"></i>
          <span>组织名称</span>
          <input type="text" v-model="subject_name" />
          <div class="bgeba">请与营业执照名称保持一致，审核通过后不可修改</div>
        </li>
        <li id="flag">
          <i class="diandian"></i>
          <span>所在地</span>
          <img v-if="handleimg" src="../assets/buttonjian.png" alt="" @click="addBtnFlag && diqu()">
          <input style="width: 26%;" ref="stylewidth" @click="addBtnFlag && diqu()" placeholder="请选择" v-model="addbtnqiqu" readonly="readonly" onfocus='this.blur()' />
        </li>
        <li id="subjt">
          <span></span>
          <input type="text" v-model="subject_address" placeholder="必填项，请输入详细地址" />
          <van-popup v-model="showone" position="bottom">
            <van-area :area-list="areaList" :columns-num="3" @confirm="queren" @cancel="quxiao" />
          </van-popup>
        </li>
        <li id="zuzhi">
          <i class="diandian"></i>
          <span>组织机构代码</span>
          <input type="text" v-model="organizational_code" />
          <div class="bgeba">请与组织机构代码证或营业执照名称保持一致</div>
        </li>
        <li class="li2">
          <i class="diandiant"></i>
          <dl>
            <dt>
              <span id="hspan">组织机构代码证</span>
              <div class="tu">
                <img class="head-img" src ref="goodsImg" alt />
              </div>
            </dt>
            <dd>
              <p>请上传营业执照/组织机构代码证/法人证书扫描件，支持jpg、jpeg、png文件，最大5M</p>
              <div class="back">
                <van-uploader :after-read="onRead" accept="image/*" multiple>选择文件</van-uploader>
              </div>
            </dd>
          </dl>
        </li>
        <li class="li2">
          <i class="diandiant"></i>
          <dl>
            <dt>
              <span id="hspan">授权书扫描件</span>
              <div class="tu">
                <img class="head-img" src ref="goodsImgsss" alt />
              </div>
            </dt>
            <dd>
              <p>请请先下载《亿源社区入驻授权书》,填写后上传加盖公章的扫描件；支持jpg、jpeg、png文件</p>
              <div class="back">
                <van-uploader :after-read="onReadsss" accept="image/*" multiple>选择文件</van-uploader>
              </div>
            </dd>
          </dl>
        </li>
        <li>
          <i class="diandian"></i>
          <span>网站/微博</span>
          <input type="text" v-model="website_weibo" placeholder="可填写您的官方微博或网址" />
        </li>
      </ul>
      <p class="ps">
        <span>亿源社区信息</span>
      </p>
      <ol>
        <li>
          <i class="diandian"></i>
          <span>账号名称</span>
          <input type="text" v-model="account_title" />
          <div class="bgeba">2~10个字，请勿使用包含特殊符号或明显营销推广意图的媒体名</div>
        </li>
        <li>
          <i class="diandiankt"></i>
          <span>账号介绍</span>
          <textarea name id cols="7" rows="85" v-model="account_introduction" style="resize:none"></textarea>
          <div class="bgeba">描述请在10～120字，要求内容完整通顺，无特殊符号和企业信息</div>
        </li>
        <li class="li2">
          <i class="diandiant"></i>
          <dl>
            <dt>
              <span id="hspan">账号头像</span>
              <div class="tu">
                <img class="head-img" src ref="goodsImgss" alt />
              </div>
            </dt>
            <dd>
              <p>请勿使用二维码，企业相关或者带有营销信息的图片作为头像，支持jpg、jpeg、png，最大5M....</p>
              <div class="back">
                <van-uploader :after-read="onReadss" accept="image/*" multiple v-model="fistlist">选择文件</van-uploader>
              </div>
            </dd>
          </dl>
        </li>
        <li>
          <i class="diandian"></i>
          <span>领域</span>
          <select name id v-model="field" v-on:change="indexSelect">
            <option v-for="(item,index) in lingyuList" :key="index" :value="item.id" v-show="item.name !== '关注'&&item.name !== '推荐'">{{item.name}}</option>
          </select>
        </li>
      </ol>
      <p class="psr">
        <span>运营者信息</span>
      </p>
      <ul>
        <li>
          <i class="diandian"></i>
          <span>运营者姓名</span>
          <input type="text" v-model="name" placeholder="必填项，请输入运营者姓名" />
        </li>
        <li class="li1">
          <i class="diandian"></i>
          <span>运营者证件号码</span>
          <select name id v-model="document_type" v-on:change="indexSelect">
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
          <i class="diandiant"></i>
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
                <van-uploader :after-read="onReads" accept="image/*" multiple>选择文件</van-uploader>
              </div>
            </dd>
          </dl>
        </li>
        <li>
          <i class="diandian"></i>
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
            <van-radio name="1" checked-color="#03a9f4"></van-radio>
          </van-radio-group>
        </li>
        <li>
          <i class="diandian"></i>
          <span>联系邮箱</span>
          <input type="text" v-model="email" />
          <div class="bgeba">请填本人常用邮箱，此邮箱将用来接收重要通知邮件</div>
        </li>
      </ul>
    </div>
    <div class="checknice">
      <van-checkbox v-model="checked" checked-color="#03a9f4" shape="square">
        同意
        <span @click="handlexieyirtrt">《亿源社区服务协议》</span>
      </van-checkbox>
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
      addbtnqiqu: '',
      account_introduction: '',
      account_img: '',
      account_imgr: '',
      field: '20190620160804833109212',
      account_title: '',
      subject_province: '山西',
      subject_city: '运城',
      subject_address: '',
      subject_type: 4,
      organizational_code: '',
      organizational_code_img: '',
      authorization_scanner: '',
      email: '',
      isDisable: false,
      fistlist: [], //头像
      status: '',
      getCode: {
        txt: '获取验证码'
      },
      disabled: false,
      code: '',
      radio: '1',
      handleradio: false,
      handlefack: false,
      handledioimg: false,
      handlediobai: true,
      handleimg: true
    }
  },
  watch: {
    addbtnqiqu: function(text) {
      console.log(text.length)
      if (text.length <= 11) {
        this.$refs.stylewidth.style.width = '40%'
      } else if (text.length <= 14) {
        this.$refs.stylewidth.style.width = '40%'
      } else if (text.length <= 18) {
        this.$refs.stylewidth.style.width = '60%'
      }
    }
  },
  methods: {
    indexSelect() {
      console.log(this.document_type)
    },
    tijiao() {
      if (this.status == 2 || this.status == 1) {
        this.$toast('用户已入驻请勿反复操作')
      } else if (this.subject_name == '' || this.subject_name == null) {
        this.$toast('请输入企业名称')
      } else if (!/^[\u4e00-\u9fa5A-Za-z]{2,20}$/.test(this.subject_name)) {
        this.$toast('请输入正确的企业名称')
      } else if (this.subject_address == '' || this.subject_address == null) {
        this.$toast('请输入所在地')
      } else if (this.organizational_code == '' || this.organizational_code == null) {
        this.$toast('请输入组织机构代码')
      } else if (!/[a-zA-Z0-9]{8}-[a-zA-Z0-9]/.test(this.organizational_code)) {
        this.$toast('请输入正确的组织机构代码')
      } else if (this.website_weibo == '' || this.website_weibo == null) {
        this.$toast('请输入官方微博或网址')
      } else if (this.account_title == '' || this.account_title == null) {
        this.$toast('请输入账户名称')
      } else if (this.account_introduction == '' || this.account_introduction == null) {
        this.$toast('请输入账户介绍')
      } else if (this.fistlist == '' || this.fistlist == null) {
        this.$toast('请上传头像')
      } else if (this.name == '' || this.name == null) {
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
      } else if (this.code == '' || this.code == null) {
        this.$toast('请输入验证码')
      } else if (this.email == '' || this.email == null) {
        this.$toast('请输入邮箱')
      } else if (!/^\w+@[a-z0-9]+\.[a-z]{2,4}$/.test(this.email)) {
        this.$toast('邮箱格式错误，请重新输入')
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
            subject_province: localStorage.getItem('sheng'),
            subject_conuty: localStorage.getItem('qu'),
            subject_city: localStorage.getItem('shi'),
            invitation_code: this.invitation_code,
            auxiliary_materials: this.auxiliary_materials,
            account_title: this.account_title,
            subject_province: '山西',
            subject_city: '运城',
            subject_address: this.subject_address,
            subject_type: 4,
            organizational_code: this.organizational_code,
            organizational_code_img: this.organizational_code_img,
            authorization_scanner: this.authorization_scanner,
            email: this.email
          }
        }).then(res => {
          this.$toast(res.data.msg == '用户已审核通过' ? '用户已入驻请勿反复操作' : res.data.msg)
          this.subject_name = ''
          this.subject_address = ''
          this.organizational_code = ''
          this.website_weibo = ''
          this.account_title = ''
          this.account_introduction = ''
          this.name = ''
          this.document_number = ''
          this.phone = ''
          this.email = ''
          this.$router.replace({
            path: '/authentication'
          })
        })
      }
    },
    // 账号头像
    onReadss(file) {
      this.size = file.content
      this.jiancai = true
      //将原图片显示为选择的图片
      var fileData = file.file
      console.log(fileData)
      this.$refs.goodsImgss.src = file.content

      var data = new FormData()
      console.log(data)
      data.append('file', fileData)
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/file/uploadimg',
        data: data
      }).then(res => {
        this.account_imgr = res.data.pojo
      })
    },
    onReads(file) {
      this.size = file.content
      this.jiancai = true
      //将原图片显示为选择的图片
      var fileData = file.file
      console.log(fileData)
      this.$refs.goodsImgs.src = file.content

      var data = new FormData()
      console.log(data)
      data.append('file', fileData)
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/file/uploadimg',
        data: data
      }).then(res => {
        console.log(res)
        console.log(res.data.pojo)
        this.document_img = res.data.pojo
      })
    },
    onReadsss(file) {
      this.size = file.content
      this.jiancai = true
      //将原图片显示为选择的图片
      var fileData = file.file
      console.log(fileData)
      this.$refs.goodsImgsss.src = file.content
      var data = new FormData()
      console.log(data)
      data.append('file', fileData)
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/file/uploadimg',
        data: data
      }).then(res => {
        console.log(res)
        console.log(res.data.pojo)
        this.authorization_scanner = res.data.pojo
      })
    },
    // 组织机构代码
    onRead(file) {
      this.size = file.content
      this.jiancai = true
      //将原图片显示为选择的图片
      var fileData = file.file
      console.log(fileData)
      this.$refs.goodsImg.src = file.content

      var data = new FormData()
      console.log(data)
      data.append('file', fileData)
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/file/uploadimg',
        data: data
      }).then(res => {
        console.log(res)
        console.log(res.data.pojo)
        this.organizational_code_img = res.data.pojo
      })
    },
    info() {
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/field/list'
      }).then(res => {
        console.log(res)
      })
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/settled/get'
      }).then(res => {
        console.log(res)
      })
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/master/field/getpage'
      }).then(res => {
        this.lingyuList = res.data.list.slice(0, 3)
      })
    },
    async handlestatest() {
      const res = await axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/settled/get'
      })
      this.status = res.data.pojo.status
      console.log(this.status)

      // if (res.data.pojo.status == 2 || res.data.pojo.status == 1) {
      //   //  this.$toast('用户已审核通过,请勿反复操作')
      //   this.isDisable = true;
      // }
    },
    handlexieyirtrt() {
      var openQerqita = {
        name: this.name,
        document_type: this.document_type,
        document_number: this.document_number,
        subject_name: this.subject_name,
        phone: this.phone,
        website_weibo: this.website_weibo,
        document_img: this.document_img,
        account_imgr: this.account_imgr,
        account_introduction: this.account_introduction,
        addbtnqiqu: this.addbtnqiqu,
        account_img: this.account_img,
        field: this.field,
        invitation_code: this.invitation_code,
        auxiliary_materials: this.auxiliary_materials,
        account_title: this.account_title,
        subject_address: this.subject_address,
        organizational_code: this.organizational_code,
        organizational_code_img: this.organizational_code_img,
        authorization_scanner: this.authorization_scanner,
        email: this.email,
        code: this.code
      }
      window.localStorage.setItem('openQerqita', JSON.stringify(openQerqita))
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
      localStorage.setItem('sheng', item[0].name)
      localStorage.setItem('shi', item[1].name)
      localStorage.setItem('qu', item[2].name)
      localStorage.setItem('msgkas', item[0].name + '/' + item[1].name + '/' + item[2].name)
      this.addbtnqiqu = localStorage.getItem('msgkas')
      this.showone = false
      this.handleimg = false
    }
  },
  computed: {
    State() {
      return this.checked !== false
    }
  },
  created() {
    this.info()
    this.handlestatest()
    var open = JSON.parse(localStorage.getItem('openQerqita'))
    this.name = open.name
    this.document_type = open.document_type
    this.document_number = open.document_number
    this.subject_name = open.subject_name
    this.phone = open.phone
    this.account_imgr = open.account_imgr
    this.website_weibo = open.website_weibo
    this.addbtnqiqu = open.addbtnqiqu
    this.document_img = open.document_img
    this.account_introduction = open.account_introduction
    this.account_img = open.account_img
    this.field = open.field
    this.invitation_code = open.invitation_code
    this.auxiliary_materials = open.auxiliary_materials
    this.account_title = open.account_title
    this.subject_address = open.subject_address
    this.organizational_code = open.organizational_code
    this.organizational_code_img = open.organizational_code_img
    this.authorization_scanner = open.authorization_scanner
    this.email = open.email
    this.code = open.code
  },
  mounted() {
    var open = JSON.parse(localStorage.getItem('openQerqita'))
    this.$refs.goodsImg.src = 'http://47.92.85.1/' + open.organizational_code_img
    this.$refs.goodsImgsss.src = 'http://47.92.85.1/' + open.authorization_scanner
    this.$refs.goodsImgss.src = 'http://47.92.85.1/' + open.account_imgr
    this.$refs.goodsImgs.src = 'http://47.92.85.1/' + open.document_img
  }
}
</script>

<style scoped lang="less">
.px2rem(@name, @px) {
  @{name}: @px / 75 * 1rem;
}
#flag {
  input {
    .px2rem(height, 58);
    border: 1px solid #d0d0d0;
    text-align: left;
    padding-left: 10px;
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
#subjt {
  .px2rem(margin-top, 12);
}
.diandiant {
  position: absolute;
  width: 8px;
  height: 8px;
  background: rgba(3, 169, 244, 1);
  border-radius: 50%;
  left: -5px;
  .px2rem(margin-top, 10);
}
.diandiankt {
  position: absolute;
  width: 8px;
  height: 8px;
  background: rgba(3, 169, 244, 1);
  border-radius: 50%;
  left: -5px;
  .px2rem(margin-top, 10);
}
.diandian {
  position: absolute;
  width: 8px;
  height: 8px;
  background: rgba(3, 169, 244, 1);
  border-radius: 50%;
  left: -5px;
  .px2rem(margin-top, 20);
}
#hspan {
  width: 52%;
}
#zuzhi {
  input {
    width: 66%;
    -webkit-appearance: none;
  }
}
.van-radio-group {
  width: 35%;
  float: right;
  padding-top: 8px;
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
.div {
  display: flex;
  width: 88%;
  margin: 0 auto;
  .px2rem(margin-top, 40);
  .px2rem(margin-bottom, 30);
  justify-content: center;
}

dl {
  display: flex;
  // .px2rem(margin-top, 25);
  .px2rem(margin-bottom, 20);
  dt {
    width: 28%;
    .tu {
      .px2rem(width, 180);
      .px2rem(height, 180);
      background: #f6f6f6;
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
    }
  }
}

input {
  padding-left: 2%;
  -webkit-appearance: none;
}

.back {
  // .px2rem(height, 50);
  width: fit-content;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  // .px2rem(width, 120);
  border-radius: 2px;
  background: #d1d1d1;
  padding: 3px;
  color: #333333;
  .px2rem(font-size, 22);
  // .px2rem(line-height, 50);
}

select {
  .px2rem(font-size, 24);
  .px2rem(padding-bottom, 2);
}

.qunmeiti {
  position: relative;
  width: 93%;
  margin: 20px auto;

  .p {
    .px2rem(line-height, 65);
    margin-top: 15px;
    span {
      display: block;
      .px2rem(height, 60);
      .px2rem(width, 228);
      text-align: center;
      .px2rem(font-size, 32);
      border-bottom: 1.5px solid #03a9f4;
    }
  }
  .ps {
    .px2rem(line-height, 65);
    margin-top: 15px;
    span {
      display: block;
      .px2rem(height, 60);
      .px2rem(width, 200);
      .px2rem(font-size, 32);
      border-bottom: 1.5px solid #03a9f4;
    }
  }
  .psr {
    .px2rem(line-height, 65);
    margin-top: 15px;
    border-bottom: 1px solid #e5e5e5;
    span {
      display: block;
      .px2rem(height, 60);
      .px2rem(width, 170);
      .px2rem(font-size, 32);
      border-bottom: 1.5px solid #03a9f4;
    }
  }
  i {
    img {
      position: absolute;
      .px2rem(width, 40);
      .px2rem(padding-top, 15);
    }
  }
  .graa {
    .px2rem(margin-left, 50);
    width: 0px !important;
  }
  ul {
    width: 95%;
    margin: 0 auto;
    li {
      .px2rem(font-size, 26);
      color: #666;
      width: 100%;
      .px2rem(margin-top, 40);
      // .px2rem(line-height, 100);
      span {
        display: inline-block;
        width: 30%;
        .px2rem(font-size, 26);
        font-family: SourceHanSansCN-Normal, SourceHanSansCN;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
      select {
        width: 27%;
        .px2rem(height, 62);
        border: none;
        border: 1px solid #d0d0d0;
        border-radius: 2px;
        background: #fff;
        .px2rem(font-size, 24);
      }
      input {
        width: 66%;
        .px2rem(height, 55);
        border: none;
        border: 1px solid #d0d0d0;
        border-radius: 2px;
        .px2rem(font-size, 24);
        -webkit-appearance: none;
      }
    }
    li:nth-child(3) {
      .px2rem(margin-top, 14);
    }
    li:nth-child(5) {
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
    #yanzheng {
      width: 25%;
      .px2rem(margin-top, 10);
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
      dl {
        display: flex;
        // .px2rem(margin-top, 25);
        .px2rem(margin-bottom, 20);
        dt {
          width: 100%;
          .tu {
            .px2rem(width, 172);
            .px2rem(height, 180);
            background: #f6f6f6;
            float: right;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        dd {
          position: relative;
          width: 70%;
          margin-left: 2%;
          p {
            height: 50%;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
          button {
            position: absolute;
            bottom: 0;
            .px2rem(height, 50);
            .px2rem(width, 120);
            border: none;
            background: #d6d6d6;
            border-radius: 2px;
            .px2rem(font-size, 22);
          }
        }
      }
    }
  }
  ol {
    width: 95%;
    margin: 0 auto;
    .px2rem(font-size, 26);
    li {
      color: #666;
      width: 100%;
      // .px2rem(line-height, 100);
      .px2rem(margin-top, 40);
      span {
        display: inline-block;
        width: 30%;
        .px2rem(font-size, 26);
        font-family: SourceHanSansCN-Normal, SourceHanSansCN;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
      input {
        width: 66%;
        .px2rem(height, 55);
        .px2rem(font-size, 24);
        border: none;
        border: 1px solid #d0d0d0;
        border-radius: 2px;
        -webkit-appearance: none;
      }
      textarea {
        float: right;
        width: 66%;
        .px2rem(height, 150);
        border: none;
        border: 1px solid #d0d0d0;
        border-radius: 2px;
        .px2rem(padding-top, 16);
        .px2rem(padding-left, 13);
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
      dl {
        display: flex;
        // .px2rem(margin-top, 25);
        .px2rem(margin-bottom, 20);
        dt {
          width: 100%;
          .tu {
            .px2rem(width, 172);
            .px2rem(height, 180);
            background: #f6f6f6;
            float: right;
          }
        }
        dd {
          position: relative;
          width: 70%;
          margin-left: 2%;
          p {
            height: 50%;
            color: #999999;
          }
          button {
            position: absolute;
            bottom: 0;
            .px2rem(height, 50);
            .px2rem(width, 120);
            border: none;
            background: #d6d6d6;
            border-radius: 2px;
            .px2rem(font-size, 22);
          }
        }
      }
    }
  }
}

h1 {
  .px2rem(font-size, 26);
  .px2rem(margin-top, 35);
  .px2rem(margin-bottom, 20);
}

h2 {
  .px2rem(font-size, 26);
}
.bgeba {
  font-style: normal;
  margin-left: 31%;
  .px2rem(font-size, 24);
  font-family: SourceHanSansCN-Normal, SourceHanSansCN;
  font-weight: 400;
  color: #999999;
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
</style>
<style>
.van-image {
  display: none;
}
.van-image img {
  display: none;
}
.van-icon {
  display: none;
}

/* i.van-icon {
  border-radius: 20%;
} */
</style>