import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
Vue.use(Router)
var routerLink = new Router({
  routes: [
    {
      path: '/',
      component: index,
      redirect: '/onepage',
      children: [
        {
          path: '/onepage',
          name: 'onepage',
          component: () => import('@/footernav_components/onepage'),
          meta: {
            keepAlive: true,
          }
        },
        {
          path: '/posting',
          name: 'posting',
          component: () => import('@/footernav_components/posting')
        },
        {
          path: '/my',
          name: 'my',
          component: () => import('@/footernav_components/my'),
          meta: {
            keepAlive: false
          }
        },
        {
          path: '/coin',
          name: 'coin',
          // component: coin
          component: () => import('@/footernav_components/coin.vue')
        },
        {
          path: '/release',
          name: 'release',
          // component: release
          component: () => import('@/footernav_components/release'),
          meta: {
            keepAlive: true
          }
        },

      ]
    },
    {
      path: '/city',
      name: 'city',
      component: () => import('@/index_components/index_city')
    },
    {
      path: '/jinbi',
      name: 'jinbi',
      component: () => import('@/my_components/jinbi.vue')
    },
    {
      path: '/vitation',
      name: 'vitation',
      component: () => import('@/my_components/vitation.vue')
    },
    {
      path: '/replacetion',
      name: 'replacetion',
      component: () => import('@/onpage_components/replacetion')
    },
    {
      path: '/wxchat',
      name: 'wxchat',
      component: () => import('@/onpage_components/wxchat')
    },
    {
      path: '/langlogin',
      name: 'langlogin',
      component: () => import('@/my_components/langlogin.vue')
    },
    {
      path: '/Verification',
      name: 'Verification',
      component: () => import('@/onpage_components/Verification')
    },
    {
      path: '/Successful',
      name: 'Successful',
      component: () => import('@/onpage_components/Successful')
    },
    {
      path: '/modify',
      name: 'modify',
      component: () => import('@/onpage_components/modify')
    },
    {
      path: '/Lastsetup',
      name: 'Lastsetup',
      component: () => import('@/onpage_components/Lastsetup')
    },
    {
      path: '/cationCode',
      name: 'cationCode',
      component: () => import('@/onpage_components/cationCode')
    },
    {
      path: '/fillin',
      name: 'fillin',
      component: () => import('@/onpage_components/fillin')
    },
    {
      path: '/Cancellation',
      name: 'Cancellation',
      component: () => import('@/onpage_components/Cancellation')
    },

    {
      path: '/account',
      name: 'account',
      component: () => import('@/my_components/account.vue')
    },
    {
      path: '/personal',
      name: 'personal',
      component: () => import('@/my_components/personal.vue')
    },
    {
      path: '/searchresult',
      name: 'searchresult',
      component: () => import('@/footernav_components/searchresult')
    },
    {
      path: '/thumbs',
      name: 'thumbs',
      component: () => import('@/my_components/thumbs.vue')
    },
    {
      path: '/Tying',
      name: 'Tying',
      component: () => import('@/my_components/Tying.vue')
    },
    {
      path: '/agreement',
      name: 'agreement',
      component: () => import('@/my_components/agreement.vue')
    },
    {
      path: '/Settings',
      name: 'Settings',
      component: () => import('@/pages/Settings.vue')
    },
    {
      path: '/follow',
      name: 'follow',
      component: () => import('@/footernav_components/follow.vue')
    },
    {
      path: '/fans',
      name: 'fans',
      component: () => import('@/footernav_components/fans.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/footernav_components/search')
    },
    {
      path: '/cashs',
      name: 'cashs',
      component: () => import('@/posting_components/cashs.vue')
    },
    {
      path: '/withdrawal',
      name: 'withdrawal',
      component: () => import('@/my_components/withdrawal.vue')
    },
    {
      path: '/bianji/:id',
      name: 'bianji',
      component: () => import('@/posting_components/bianji.vue')
    },
    {
      path: '/handlerelasse/:id',
      name: 'handlerelasse',
      component: () => import('@/posting_components/handlerelasse.vue')
    },
    {
      path: '/xinmima',
      name: 'xinmima',
      component: () => import('@/retrievepassword/xinmima.vue')
    },
    {
      path: '/preview',
      name: 'preview',
      component: () => import('@/posting_components/preview.vue')
    },
    {
      path: '/opinion',
      name: 'opinion',
      component: () => import('@/my_components/opinion.vue')
    },
    {
      path: '/xiaoxi',
      name: 'xiaoxi',
      component: () => import('@/my_components/xiaoxi.vue')
    },
    {
      path: '/shenfen',
      name: 'shenfen',
      component: () => import('@/retrievepassword/shenfen.vue')
    },
    {
      path: '/zhanghao',
      name: 'zhanghao',
      component: () => import('@/retrievepassword/zhanghao.vue')
    },
    {
      path: '/readingHistory',
      name: 'readingHistory',
      component: () => import('@/my_components/readingHistory')
    },
    {
      path: '/comment',
      name: 'comment',
      component: () => import('@/my_components/comment')
    },
    {
      path: '/collection',
      name: 'collection',
      component: () => import('@/my_components/collection')
    },
    {
      path: '/caogao',
      name: 'caogao',
      component: () => import('@/posting_components/drafts')
    },
    {
      path: '/post_details/:id',
      name: 'post_details',
      component: () => import('@/onpage_components/post_details.vue')
    },
    {
      path: '/enter_geren',
      name: 'enter_geren',
      component: () => import('@/enter/enter_geren')
    },
    {
      path: '/enter_meiti',
      name: 'enter_meiti',
      component: () => import('@/enter/enter_meiti')
    },
    {
      path: '/enter_qunmeiti',
      name: 'enter_qunmeiti',
      component: () => import('@/enter/enter_qunmeiti')
    },
    {
      path: '/enter_zhengfu',
      name: 'enter_zhengfu',
      component: () => import('@/enter/enter_zhengfu')
    },
    {
      path: '/cropper',
      name: 'cropper',
      component: () => import('@/enter/cropper')
    },
    {
      path: '/qita',
      name: 'qita',
      component: () => import('@/enter/enter_qita')
    },
    {
      path: '/land',
      name: 'land',
      component: () => import('@/my_components/land')
    },
    {
      path: '/confirmLogin',
      name: 'confirmLogin',
      component: () => import('@/my_components/confirmLogin')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/my_components/register')
    },
    {
      path: '/personalData',
      name: 'personalData',
      component: () => import('@/my_components/personalData')
    },
    {
      path: '/authentication',
      name: 'authentication',
      component: () => import('@/my_components/authentication')
    },
    {
      path: '/headmodify',
      name: 'headmodify',
      component: () => import('@/my_components/headmodify')
    },

    {
      path: '/history_release',
      name: 'history_release',
      component: () => import('@/posting_components/history_release')
    },
    {
      path: '/posting_details/:id',
      name: 'posting_details',
      component: () => import('@/posting_components/posting_details')
    },
    {
      path: '/setup',
      name: 'setup',
      component: () => import('@/my_components/setup')
    },
    {
      path: '/service',
      name: 'service',
      component: () => import('@/onpage_components/service')
    },
    {
      path: '/rewordDetais',
      name: 'rewordDetais',
      component: () => import('@/reword/rewordDetails')
    },

  ]
})




export default routerLink