import wx from 'weixin-js-sdk'
import Axios from 'axios'
const wxApi = {
  /**
   * [wxRegister 微信Api初始化]
   * @param  {Function} callback [ready回调函数]
   */
  wxRegister(callback) {
    let datc = encodeURIComponent(location.href.split('#')[0]);
    // 这边的接口请换成你们自己的
    Axios.get('http://47.92.85.1:8081/wx/share?url=' + datc, {
      // Axios.get('http://47.94.215.133/wx/share?url=' + datc, {
      timeout: 5000,
    }).then((res) => {
      //   console.log(res.data)
      // let data = JSON.parse(res.data) // PS: 这里根据你接口的返回值来使用
      wx.config({
        debug: false, // 开启调试模式
        appId: res.data.appid, // 必填，公众号的唯一标识
        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.noncestr, // 必填，生成签名的随机串
        signature: res.data.signature, // 必填，签名，见附录1
        jsApiList: [
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "onMenuShareQQ",
          "onMenuShareWeibo",
          "onMenuShareQZone"
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
    }).catch((error) => {
      console.log(error)
    })
    wx.ready((res) => {
      console.log(res)
      // 如果需要定制ready回调方法
      if (callback) {
        callback()
      }
    })
  },
  /**
   * [ShareTimeline 微信分享到朋友圈]
   * @param {[type]} option [分享信息]
   * @param {[type]} success [成功回调]
   * @param {[type]} error   [失败回调]
   */
  ShareTimeline(option) {
    wx.onMenuShareTimeline({
      title: option.title, // 分享标题
      link: option.link, // 分享链接
      imgUrl: option.imgUrl, // 分享图标
      success() {
        // 用户成功分享后执行的回调函数
        option.success()
      },
      cancel() {
        // 用户取消分享后执行的回调函数
        option.error()
      }
    })
  },
  /**
   * [ShareAppMessage 微信分享给朋友]
   * @param {[type]} option [分享信息]
   * @param {[type]} success [成功回调]
   * @param {[type]} error   [失败回调]
   */
  ShareAppMessage(option) {
    wx.onMenuShareAppMessage({
      title: option.title, // 分享标题
      desc: option.desc, // 分享描述
      link: option.link, // 分享链接
      imgUrl: option.imgUrl, // 分享图标
      success() {
        // 用户成功分享后执行的回调函数
        option.success()
      },
      cancel() {
        // 用户取消分享后执行的回调函数
        option.error()
      }
    })
  }
}
export default wxApi
