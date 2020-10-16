import Vue from 'vue'
import Vuex from 'Vuex'
Vue.use(Vuex);
var login = localStorage.getItem('zhuangtai') ? localStorage.getItem('zhuangtai') : false;
var changecity = localStorage.getItem('changecity') ? localStorage.getItem('changecity') : '北京';
const store = new Vuex.Store({
	state: {
		zhuangtai: login,
		name: window.localStorage.getItem('name'),
		userhead: '',
		yidong: [],
		isshow: true,
		yidonghuayuan: '',
		changecity: changecity,
		filedata: '',
		filedatas: '',
		filedatass: '',
		filedatasss: '',
		isuserhead: false,
		isuserheads: false,
		cityid: '',
		msg: '',
		msgtwo: '',
		msgthree: '',
		sousuo: '',
		msgfour: '',
		msgfive: '',
		msge: '',
		mmmsg: '用户未登陆',
		renwenId: '',
		navindex: 3,
		// 存储token
		Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
		// 
		// redicet_url: 'my'
	},

	// 设置属性状态
	mutations: {
		//保存登录状态
		cityid(state, cityid) {
			state.cityid = cityid
		},
		renwenId(state, renwenId) {
			state.renwenId = renwenId
		},
		navindex(state, navindex) {
			state.navindex = navindex
		},
		zhuangtai(state, zhuangtai) {
			state.zhuangtai = zhuangtai
		},
		name(state, username) {
			console.log(username)
			state.name = username
		},
		changecity(state, b) {
			state.changecity = b;
		},
		sousuo(state, b) {
			state.sousuo = b;
			console.log(state.sousuo)
		},
		// 	yidonghuayuan(state,b){
		// 		state.yidonghuayuan = b;
		// 	},
		filedatass(state, b) {
			state.filedatass = b;
		},
		filedatas(state, b) {
			state.filedatas = b;
		},
		filedata(state, b) {
			state.filedata = b;
		},
		filedatasss(state, b) {
			state.filedatasss = b;
		},
		isuserhead(state, b) {
			state.isuserhead = b;
		},
		isuserheads(state, b) {
			state.isuserheads = b;
		},
		userhead(state, b) {
			state.userhead = b;
		},
		msg(state, b) {
			state.msg = b;
		},
		msge(state, b) {
			state.msge = b;
		},
		msgtwo(state, b) {
			state.msgtwo = b;
		},
		msgthree(state, b) {
			state.msgthree = b;
		}
		,
		msgfive(state, b) {
			state.msgfive = b;
		},
		msgfour(state, b) {
			state.msgfour = b;
		},
		// changeredicet_url(state, payload) {
		// 	state.redicet_url = payload.redicet_url
		// }

	},
});

export default store