<template>
  <div class="grcenter_ziliao">
    <div class="header">
      <div>
        <img src="../assets/jiantoua.png" alt @click="$router.back()" />
      </div>
      <p>编辑资料</p>
    </div>
    <ul>
      <li v-if="putongxiang">
        <span>头像</span>
        <dl @click="addBtnFlag &&touxiang()">
          <dt class="touxiang">
            <img style="object-fit: cover;" :src="this.GLOBAL.basesURL+usertouxiang" alt />
          </dt>
          <dd>
            <img src="../assets/youjiantou.png" alt />
          </dd>
        </dl>
        <div style="display:none">
          <van-uploader :after-read="handleSuccess" accept="image/*">
            <!-- <van-button icon="photo" type="primary">上传图片</van-button> -->
          </van-uploader>
        </div>
      </li>
        <li v-if="weixintouxiang">
        <span>头像</span>
        <dl @click="addBtnFlag &&touxiang()">
          <dt class="touxiang">
            <img style="object-fit: cover;" :src="this.GLOBAL.basesURL+headimgurl" alt />
          </dt>
          <dd>
            <img src="../assets/youjiantou.png" alt />
          </dd>
        </dl>
        <div style="display:none">
          <van-uploader :after-read="handleSuccess" accept="image/*">
            <!-- <van-button icon="photo" type="primary">上传图片</van-button> -->
          </van-uploader>
        </div>
      </li>
      <li v-if="weixin">
        <span>用户名</span>
        <dl @click="addBtnFlag && wanshan()">
          <dt>{{name}}</dt>
          <dd>
            <img src="../assets/youjiantou.png" alt />
          </dd>
        </dl>
      </li>
         <li v-if="handlept">
        <span>用户名</span>
        <dl @click="addBtnFlag && wanshan()">
          <dt>{{this.$store.state.msg?this.$store.state.msg:msg}}</dt>
          <dd>
            <img src="../assets/youjiantou.png" alt />
          </dd>
        </dl>
      </li>
      <li class="san">
        <span>介绍</span>
        <dl @click="wanshantwo">
          <dt>{{this.$store.state.msgtwo}}</dt>
          <dd>
            <img src="../assets/youjiantou.png" alt />
          </dd>
        </dl>
      </li>
      <li>
        <span>性别</span>
        <dl @click="addBtnFlag && xingbie()">
          <dt>{{this.$store.state.msgthree}}</dt>
          <dd>
            <img src="../assets/youjiantou.png" alt />
          </dd>
        </dl>
      </li>
      <li>
        <span>生日</span>
        <dl @click="shengri">
          <dt>{{this.$store.state.msgfour}}</dt>
          <dd>
            <img src="../assets/youjiantou.png" alt />
          </dd>
        </dl>
      </li>
      <li class="san" @click="addBtnFlag && diqu()" v-if="handlediqu">
        <span>地区</span>
        <dl>
          <dt>{{this.$store.state.msgfive}}</dt>
          <dd>
            <img src="../assets/youjiantou.png" alt />
          </dd>
        </dl>
      </li>
       <li class="san" @click="addBtnFlag && diqu()" v-if="handleweixidiqu">
        <span>地区</span>
        <dl>
          <dt>{{city}}</dt>
          <dd>
            <img src="../assets/youjiantou.png" alt />
          </dd>
        </dl>
      </li>
      <li class="san" @click="renzheng">
        <span>类型</span>
      </li>
    </ul>
    <userhead v-if="this.$store.state.isuserhead"></userhead>
    <userheadtwo v-if="this.$store.state.isuserheads"></userheadtwo>
    <van-action-sheet v-model="showthree" :actions="actiones" cancel-text="取消" @select="onSelects" />
    <van-action-sheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect" />

    <van-popup v-model="showone" position="bottom">
      <van-area :area-list="areaList" :columns-num="2" @confirm="queren" @cancel="quxiao" />
    </van-popup>
    
    <van-popup v-model="showtwo" position="bottom">
      <van-datetime-picker
        @confirm="querens"
        @cancel="quxiaos"
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
  </div>
</template>
<script>
import userhead from "../my_components/model.vue";
import userheadtwo from "../my_components/modeltwo.vue";
import areaList from "../../static/citytwo.js";
import axios from "axios";
export default {
  name: "grcenter_ziliao",
  components: { userhead, userheadtwo },
  data() {
    return {
      msg: localStorage.getItem("msg"),
      msgtwo: localStorage.getItem("msgtwo"),
      show: false,
      showone: false,
      showtwo: false,
      showthree: false,
      areaList: areaList,
      userhead: "是",
      actions: [{ name: "男" }, { name: "女" }],
      actiones: [{ name: "上传头像" }, { name: "默认头像" }],
      currentDate: new Date(),
      maxDate: new Date(),
      minDate: new Date(1900, 0, 1),
      addBtnFlag: true,
      name:"",
      handlept: false,
      weixin:false,
      handlediqu:false,
      handleweixidiqu:false,
      city:'',
      usertouxiang:'',
      putongxiang:false,
      weixintouxiang:false
    };
  },
  methods: {
    renzheng() {
      this.$router.push({
        path: "/authentication"
      });
    },
    wanshan() {
      this.$store.commit("isuserhead", true);
      console.log(areaList);
    },
    wanshantwo() {
      this.$store.commit("isuserheads", true);
    },
    queren(item) {
      var userhome = {
        name: this.$store.state.msg,
        userhome: item[0].name + "-" + item[1].name,
        description: this.$store.state.msgtwo,
        sex: this.$store.state.msgthree == "男" ? 1 : 0,
        birthday: this.$store.state.msgfour
      };
      this.$axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/user/edit",
        data: userhome
      }).then(res => {
        this.$toast(res.data.msg == "操作成功！" ? "修改成功" : res.data.msg);
        if (res.data.result) {
          this.$store.commit("msgfive", item[0].name + "-" + item[1].name);
          localStorage.setItem("msgfive", item[0].name + "-" + item[1].name);
          this.showone = false;
        }
      });
      console.log(item[0].name);
    },
    querens(item) {
      var d = new Date(item);
      var resDate =
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      console.log(item);
      var mobile = {
        birthday: resDate,
        name: this.$store.state.msg,
        userhome: localStorage.getItem("msgfive"),
        description: this.$store.state.msgtwo,
        sex: this.$store.state.msgthree == "男" ? 1 : 0
      };
      this.$axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/user/edit",
        data: mobile
      }).then(res => {
        this.$toast(res.data.msg == "操作成功！" ? "修改成功" : res.data.msg);
        if (res.data.result) {
          this.$store.commit("msgfour", resDate);
          localStorage.setItem("msgfour", resDate);
          this.showtwo = false;
        }
      });

      console.log(resDate);
    },
    quxiao() {
      this.showone = false;
    },
    quxiaos() {
      this.showtwo = false;
    },
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      // console.log(item.name);
      var sex = {
        userhome: localStorage.getItem("msgfive"),
        name: this.$store.state.msg,
        sex: item.name == "男" ? 1 : 0,
        description: this.$store.state.msgtwo,
        birthday: this.$store.state.msgfour
      };
      this.$axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/user/edit",
        data: sex
      }).then(res => {
        this.$toast(res.data.msg == "操作成功！" ? "修改成功" : res.data.msg);
        console.log(res);
        if (res.data.result) {
          this.$store.commit("msgthree", item.name);
          localStorage.setItem("msgthree", item.name);
        }
      });
      this.show = false;
      // Toast(item.name);
    },
    onSelects(id) {
      this.showthree = false;
      if (id.name == "上传头像") {
        document.querySelector(".van-uploader__input").click();
      } else if (id.name == "默认头像") {
        var datr = {
          userhead: "/images/default.png"
        };
        this.$axios({
          method: "post",
          url: this.GLOBAL.baseURL + "/user/userhead",
          data: datr,
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
          // console.log(res);
          this.$toast(res.data.msg == "操作成功！" ? "修改成功" : res.data.msg);
          this.info();
        });
      }
    },
    handleSuccess(res) {
      var data = new FormData();
      data.append("file", res.file);
      this.$axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/file/uploadimg",
        data: data
      }).then(res => {
        //   console.log(res)
        if (res.data.result) {
          this.$store.commit("userhead", res.data.pojo);
          // localStorage.setItem('userhead',res.data.pojo.savepath)
          var date = {
            userhead: res.data.pojo
          };
          this.$axios({
            method: "post",
            url: this.GLOBAL.baseURL + "/user/userhead",
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
            // console.log(res);
            this.$toast(
              res.data.msg == "操作成功！" ? "修改成功" : res.data.msg
            );
            this.info();
          });
        }
      });
    },
    xingbie() {
      this.show = true;
    },
    shengri() {
      this.showtwo = true;
    },
    diqu() {
      this.showone = true;
    },
    touxiang() {
      this.showthree = true;
    },
    info() {
      var id = { id: localStorage.getItem("userid") };
      this.$axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/user/info",
        data: id
      }).then(res => {
        console.log(res);
        this.$store.commit(
          "msgtwo",
          res.data.pojo.description ? res.data.pojo.description : "待完善"
        );
        this.$store.commit("msgthree", res.data.pojo.sex == 1 ? "男" : "女");
        this.$store.commit(
          "msgfour",
          res.data.pojo.birthday ? res.data.pojo.birthday : "待完善"
        );
        this.$store.commit("msgfive", res.data.pojo.userhome);
        this.$store.commit("msg", res.data.pojo.name);
        this.usertouxiang = res.data.pojo.userhead
        this.name = res.data.pojo.nickname
        console.log(this.name)
        this.headimgurl = res.data.pojo.headimgurl;
        this.city = res.data.pojo.city;
      });
    },
    handleweixin() {
      var handleopenid = localStorage.getItem("openid");
      console.log(handleopenid);
      if (handleopenid) {
        this.addBtnFlag = false;
        this.weixin = true;
        this.handleweixidiqu= true
        this.weixintouxiang = true
      }else{
        this.handlediqu = true;
        this.addBtnFlag = true;
        this.handlept = true;
        this.putongxiang = true;
      }
    }
  },
  created() {
    this.info();
    this.handleweixin();
  }
};
</script>
<style scoped lang="less">
.px2rem(@name,@px) {
  @{name}: @px / 75 * 1rem;
}
.grcenter_ziliao {
  width: 100%;
  height: 100%;
  background: #f8f8f8;
}
.san {
  .px2rem(margin-bottom, 10);
}
.header {
  width: 100%;
  .px2rem(height, 110);
  display: flex;
  align-items: center;
  background: #fff;
  div {
    .px2rem(width, 100);
    .px2rem(height, 50);
    display: flex;
    align-items: center;
    img {
      .px2rem(width, 35);
      margin: 0 auto;
    }
  }
  p {
    text-align: center;
    .px2rem(padding-right, 100);
    flex: 1;
    .px2rem(font-size, 38);
    font-family:SourceHanSansCN-Normal,SourceHanSansCN;
    font-weight:400;
    color:rgba(0,0,0,1);
  }
}
ul {
  .px2rem(margin-top, 16);
  li {
    background: #fff;
    display: flex;
    .px2rem(height, 100);
    align-items: center;
    .px2rem(font-size, 28);
    justify-content: space-between;
    border-bottom: 1px solid #f3f3f3;
    .px2rem(padding-left, 29);
    .px2rem(padding-right, 25);
    dl {
      width: 65%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .touxiang {
        .px2rem(width, 55);
        .px2rem(height, 55);
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      dt {
        .px2rem(font-size, 28);
        .px2rem(margin-right, 10);
        color: #929292;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      dd {
        display: flex;
        align-items: center;
        img {
          .px2rem(width, 30);
          height: 100%;
        }
      }
    }
  }
}
</style>
