// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import store from './store/store.js'
import '../src/commom/common.js'
import fle from '../static/flexible_css.debug.js'
import flex from '../static/flexible.debug.js'
import 'vant/lib/index.css';
import { NavBar } from 'vant';
import { Field } from 'vant';
import { PullRefresh } from 'vant';
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' //配置使用中文语言包
import relativeTime from 'dayjs/plugin/relativeTime'//dayjs的相对时间插件
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)//图片预览插件
dayjs.extend(relativeTime)//把插件注册到dayjs中
dayjs.locale('zh-cn')//配置使用中文语言包
// 注册一个过滤器来处理日期格式的展示
Vue.filter('relativeTime', value => {
  return dayjs().toNow(value)
});

import { AddressEdit } from 'vant';
Vue.use(AddressEdit);

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

import { RadioGroup, Radio } from 'vant';
Vue.use(Radio);
Vue.use(RadioGroup);

import { Cell, CellGroup } from 'vant';
Vue.use(Cell).use(CellGroup);

import { Search } from 'vant';
Vue.use(Search);

import { Dialog } from 'vant';
Vue.use(Dialog);

Vue.use(PullRefresh);
Vue.use(Field);
Vue.use(NavBar);

import { Tab, Tabs } from 'vant';
Vue.use(Tab).use(Tabs);

import { PasswordInput, NumberKeyboard } from 'vant';

Vue.use(PasswordInput).use(NumberKeyboard);

import { Icon } from 'vant';

Vue.use(Icon);

import { List } from 'vant';
Vue.use(List);

import { ActionSheet } from 'vant';
Vue.use(ActionSheet);
import { Loading } from 'vant';

Vue.use(Loading);

import { Switch } from 'vant';
Vue.use(Switch);

import { Area } from 'vant';
Vue.use(Area);

import { Popup } from 'vant';
Vue.use(Popup);

import { DropdownMenu, DropdownItem } from 'vant';
Vue.use(DropdownMenu).use(DropdownItem);

import { DatetimePicker } from 'vant';
Vue.use(DatetimePicker);

import { Uploader } from 'vant';
Vue.use(Uploader);

import { Button } from 'vant';
Vue.use(Button);

import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer);

import { Toast } from 'vant';
Vue.use(Toast);

import { Checkbox, CheckboxGroup } from 'vant';
Vue.use(Checkbox).use(CheckboxGroup);



import SlideVerify from 'vue-monoplasty-slide-verify';
Vue.use(SlideVerify);

import { Overlay } from 'vant';
Vue.use(Overlay);

import global_ from '../public/Global'//引用文件
Vue.prototype.GLOBAL = global_//挂载到Vue实例上面
axios.defaults.baseURL = global_.BASE_URL;
axios.defaults.basesURL = global_.BASE_URL;
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)

router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  const token = localStorage.getItem('token')
  if (!token && to.path == '/land' && from.path != '/confirmLogin' && from.path != '/Settings') {
    sessionStorage.setItem('redicet_url', from.fullPath)
    next()
  } else {
    next()
  }

})

/* 请求拦截器 */

axios.interceptors.request.use(function (config) { // 每次请求时会从localStorage中获取token
  var token = window.localStorage.getItem('token');
  if (token) {
    config.headers.token = localStorage.getItem('token')
  }
  return config
}, function (error) {
  return Promise.reject(error)
})



/* 响应拦截器 */

axios.interceptors.response.use(function (response) { // ①10010 token过期（30天） ②10011 token无效
  // console.log(response)
  if (response.data.code === 10010 || response.data.code === 10011) {

    Storage.localRemove('token') // 删除已经失效或过期的token（不删除也可以，因为登录后覆盖）

    router.replace({
      path: '/lang' // 到登录页重新获取token
    })

  } else if (response.data.token) { // 判断token是否存在，如果存在说明需要更新token

    Storage.localSet('token', response.data.token) // 覆盖原来的token(默认一天刷新一次)
  }

  return response

}, function (error) {

  return Promise.reject(error)

})




Vue.use(VueAxios, axios)
Vue.prototype.$axios = axios;
Vue.config.productionTip = false
var clwidth = document.body.clienWidth;
var htmldom = document.getElementsByTagName('html')[0];
htmldom.style.fontSize = Math.ceil(clwidth * 0.13) + 'px';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})



