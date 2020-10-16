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
          <i class="diandiantop"></i>
          <span>主体类型</span>
          <span>政府</span>
        </li>
        <li>
          <i class="diandiant"></i>
          <span>单位名称</span>
          <input type="text" v-model="subject_name" />
          <div class="bgeba">请与组织机构代码证或营业执照名称保持一致，审核通过后不可修改</div>
        </li>
        <li>
          <i class="diandiant"></i>
          <span>单位级别</span>
          <select name id>
            <option value="1">国家级</option>
            <option value="2">部委级</option>
            <option value="3">省级</option>
            <option value="4">市级</option>
            <option value="5">区县级</option>
          </select>
        </li>
        <li>
          <i class="diandiant"></i>
          <span>单位电话</span>
          <input id="danwei" type="text" v-model="unit_phone" />
          <div class="bgeba">请参照‘区号-固定电话号码（-分机号）’的方式填写</div>
        </li>
        <li id="flag">
          <i class="diandiant"></i>
          <span>单位地址</span>
          <img v-if="handleimg" src="../assets/buttonjian.png" alt="" @click="addBtnFlag && diqu()">
          <input readonly="readonly" onfocus='this.blur()' style="width: 26%;" ref="stylewidth" @click="addBtnFlag && diqu()" placeholder="请选择" v-model="addbtbqiqu" />
        </li>
        <li>
          <span></span>
          <input type="text" placeholder="必填项，请输入详细地址" v-model="unit_level" />
          <van-popup v-model="showone" position="bottom">
            <van-area :area-list="areaList" :columns-num="3" @confirm="queren" @cancel="quxiao" />
          </van-popup>
        </li>
        <li>
          <i class="diandiant"></i>
          <span>组织机构代码</span>
          <input type="text" v-model="organizational_code" />
          <div class="bgeba">请与组织机构代码证或营业执照名称保持一致</div>
        </li>
        <li class="li2">
          <i class="diandian"></i>
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
          <i class="diandian"></i>
          <dl>
            <dt>
              <span id="hspan">授权书扫描件</span>
              <div class="tu">
                <img class="head-img" src ref="goodsImgsss" alt />
              </div>
            </dt>
            <dd>
              <p>请先下载《亿源社区入驻授权书》，填写后上传加盖公章的扫描件；支持jpg、jpeg、png文件，最大5M</p>
              <div class="back">
                <van-uploader :after-read="onReadsss" accept="image/*" multiple>选择文件</van-uploader>
              </div>
            </dd>
          </dl>
        </li>
      </ul>
      <p class="ps">
        <span>亿源社区信息</span>
      </p>
      <ol>
        <li>
          <i class="diandiant"></i>
          <span>账号名称</span>
          <input type="text" v-model="account_title" />
          <div class="bgeba">2~10个字，请勿使用包含特殊符号或明显营销推广意图的媒体名</div>
        </li>
        <li>
          <i class="diandiant"></i>
          <span>账号介绍</span>
          <textarea name id cols="7" rows="85" v-model="account_introduction" style="resize:none"></textarea>
          <div class="bgeba">描述请在10～120字，要求内容完整通顺，无特殊符号和企业信息</div>
        </li>
        <li class="li2">
          <i class="diandian"></i>
          <dl>
            <dt>
              <span id="hspan">账号头像</span>
              <div class="tu">
                <img class="head-img" src ref="goodsImgss" alt />
              </div>
            </dt>
            <dd>
              <p>请勿使用二维码，企业相关或者带有营销信息的图片作为头像，支持jpg、jpeg、png，最大5M....(必传项，请上传头像)</p>
              <div class="back">
                <van-uploader :after-read="onReadss" accept="image/*" multiple v-model="fistlist">选择文件</van-uploader>
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
      </ol>
      <p class="psr">
        <span>运营者信息</span>
      </p>
      <ul>
        <li>
          <i class="diandiant"></i>
          <span>运营者姓名</span>
          <input type="text" v-model="name" />
          <div class="bgeba">请填写有效身份证件上的姓名，一经设置无法修改</div>
        </li>
        <li class="li1">
          <i class="diandiant"></i>
          <span>运营者证件号码</span>
          <select name id v-model="document_type">
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
        <li>
          <i class="diandiant"></i>
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
          <i class="diandiant"></i>
          <span>联系邮箱</span>
          <input type="text" v-model="email" />
          <div class="bgeba">请填本人常用邮箱，此邮箱将用来接收重要通知邮件</div>
        </li>
      </ul>
    </div>
    <div class="checknice">
      <van-checkbox v-model="checked" checked-color="#03a9f4" shape="square">
        同意
        <span @click="handlexieyirt">《亿源社区服务协议》</span>
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
      unit_phone: '',
      unit_level: '',
      lingyuList: [],
      name: '',
      size: '',
      document_type: 1,
      document_number: '',
      subject_name: '',
      phone: '',
      website_weibo: '',
      addbtbqiqu: '',
      document_img: '',
      account_imgr: '',
      account_introduction: '',
      account_img: '',
      field: '20190620160804833109212',
      account_title: '',
      subject_address: '',
      // invitation_code: "",
      subject_type: 7,
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
      code: '',
      radio: '1',
      handleradio: false,
      handlefack: false,
      disabled: false,
      handledioimg: false,
      handlediobai: true,
      handleimg: true
    }
  },
  computed: {
    State() {
      return this.checked !== false
    }
  },
  watch: {
    addbtbqiqu: function(text) {
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
    tijiao() {
      if (this.status == 2 || this.status == 1) {
        this.$toast('用户已入驻请勿反复操作')
      } else if (this.subject_name == '' || this.subject_name == null) {
        this.$toast('请输入单位')
      } else if (!/^[\u4e00-\u9fa5A-Za-z]{2,20}$/.test(this.subject_name)) {
        this.$toast('请输入正确的单位名称')
      } else if (this.unit_phone == '' || this.unit_phone == null) {
        this.$toast('请输入电话号码')
      } else if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.unit_phone)) {
        this.$toast('电话号码填写错误，请重新输入')
      } else if (this.unit_level == '' || this.unit_level == null) {
        this.$toast('请输入单位地址')
      } else if (this.organizational_code == '' || this.organizational_code == null) {
        this.$toast('请输入组织机构代码')
      } else if (!/[a-zA-Z0-9]{8}-[a-zA-Z0-9]/.test(this.organizational_code)) {
        this.$toast('请输入正确的组织机构代码')
      } else if (this.account_title == '' || this.account_title == null) {
        this.$toast('请输入账户名称')
      } else if (this.account_introduction == '' || this.account_introduction == null) {
        this.$toast('请输入账户介绍')
      } else if (this.fistlist == '' || this.fistlist == null) {
        this.$toast('请上传头像')
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
            auxiliary_materials: this.auxiliary_materials,
            account_title: this.account_title,
            addbtbqiqu: this.addbtbqiqu,
            subject_address: this.subject_address,
            subject_type: this.subject_type,
            organizational_code: this.organizational_code,
            organizational_code_img: this.organizational_code_img,
            authorization_scanner: this.authorization_scanner,
            email: this.email
          }
        }).then(res => {
          this.$toast(res.data.msg == '用户已审核通过' ? '用户已入驻请勿反复操作' : res.data.msg)
          this.subject_name = ''
          this.unit_phone = ''
          this.unit_level = ''
          this.organizational_code = ''
          this.account_title = ''
          this.account_introduction = ''
          // this.invitation_code = "";
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
    // 授权书扫描件
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
    // 机构代码证
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
      // console.log(res.data.pojo.status);
      // if (res.data.pojo.status == 2 || res.data.pojo.status == 1) {
      //   //  this.$toast('用户已审核通过,请勿反复操作')
      //   this.isDisable = true;
      // }
    },
    handlexieyirt() {
      var openQertyzhengfu = {
        name: this.name,
        document_type: this.document_type,
        document_number: this.document_number,
        subject_name: this.subject_name,
        phone: this.phone,
        website_weibo: this.website_weibo,
        document_img: this.document_img,
        account_imgr: this.account_imgr,
        account_introduction: this.account_introduction,
        account_img: this.account_img,
        addbtbqiqu: this.addbtbqiqu,
        field: this.field,
        // invitation_code: this.invitation_code,
        auxiliary_materials: this.auxiliary_materials,
        account_title: this.account_title,
        subject_address: this.subject_address,
        subject_type: this.subject_type,
        organizational_code: this.organizational_code,
        organizational_code_img: this.organizational_code_img,
        authorization_scanner: this.authorization_scanner,
        email: this.email,
        unit_phone: this.unit_phone,
        unit_level: this.unit_level
      }
      window.localStorage.setItem('openQertyzhengfu', JSON.stringify(openQertyzhengfu))
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
      this.addbtbqiqu = localStorage.getItem('msgkas')
      this.showone = false
      this.handleimg = false
    }
  },
  created() {
    this.info()
    this.handlestatest()
    var open = JSON.parse(localStorage.getItem('openQertyzhengfu'))
    this.name = open.name
    this.document_type = open.document_type
    this.document_number = open.document_number
    this.subject_name = open.subject_name
    this.addbtbqiqu = open.addbtbqiqu
    this.phone = open.phone
    this.website_weibo = open.website_weibo
    this.document_img = open.document_img
    this.account_imgr = open.account_imgr
    this.account_introduction = open.account_introduction
    this.account_img = open.account_img
    this.field = open.field
    // this.invitation_code = open.invitation_code;
    this.auxiliary_materials = open.auxiliary_materials
    this.account_title = open.account_title
    this.subject_address = open.subject_address
    this.subject_type = open.subject_type
    this.organizational_code = open.organizational_code
    this.organizational_code_img = open.organizational_code_img
    this.authorization_scanner = open.authorization_scanner
    this.email = open.email
    this.unit_phone = open.unit_phone
    this.unit_level = open.unit_level
  },
  mounted() {
    var open = JSON.parse(localStorage.getItem('openQertyzhengfu'))
    this.$refs.goodsImg.src = 'http://47.92.85.1/' + open.organizational_code_img
    this.$refs.goodsImgsss.src = 'http://47.92.85.1/' + open.authorization_scanner
    this.$refs.goodsImgss.src = 'http://47.92.85.1/' + open.account_imgr
  }
}
</script>

<style scoped lang="less">
.px2rem(@name,@px) {
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
.diandiantop {
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
  .px2rem(margin-top, 8);
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
#danwei {
  width: 66%;
}
#hspan {
  width: 52%;
}
.van-radio-group {
  width: 35%;
  float: right;
  padding-top: 8px;
}
.div {
  display: flex;
  width: 88%;
  margin: 0 auto;
  .px2rem(margin-top, 40);
  .px2rem(margin-bottom, 30);
  justify-content: center;
}

select {
  .px2rem(font-size, 24);
}
input {
  .px2rem(font-size, 24);
  -webkit-appearance: none;
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
      .px2rem(width, 230);
      text-align: center;
      .px2rem(font-size, 32);
      border-bottom: 1.5px solid #03a9f4;
      font-family: SourceHanSansCN-Normal, SourceHanSansCN;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
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
      font-family: SourceHanSansCN-Normal, SourceHanSansCN;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
    }
  }
  .psr {
    .px2rem(line-height, 65);
    margin-top: 15px;

    span {
      display: block;
      .px2rem(height, 60);
      .px2rem(width, 170);
      .px2rem(font-size, 32);
      border-bottom: 1.5px solid #03a9f4;
      font-family: SourceHanSansCN-Normal, SourceHanSansCN;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
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
      // .px2rem(line-height, 100);
      .px2rem(margin-top, 40);
      span {
        display: inline-block;
        width: 30%;
        .px2rem(font-size, 28);
        font-family: SourceHanSansCN-Normal, SourceHanSansCN;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
      select {
        width: 27%;
        .px2rem(height, 60);
        border: none;
        border: 1px solid #d0d0d0;
        border-radius: 2px;
        .px2rem(font-size, 24);
        background: #fff;
        padding-left: 4px;
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
    li:nth-child(6) {
      .px2rem(margin-top, 12);
    }
    li:nth-child(4) {
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
      width: 24%;
      .px2rem(margin-top, 10);
    }
    .li1 {
      input {
        width: 40%;
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
  ol {
    width: 95%;
    margin: 0 auto;
    .px2rem(font-size, 26);
    li {
      color: #666;
      width: 100%;
      .px2rem(margin-top, 40);
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
        -webkit-appearance: none;
        float: right;
      }
      select {
        width: 26%;
        .px2rem(height, 62);
        .px2rem(font-size, 24);
        border: none;
        border: 1px solid #d0d0d0;
        border-radius: 2px;
        background: #fff;
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
            color: #999;
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

///////////////////////////////////////

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
</style>