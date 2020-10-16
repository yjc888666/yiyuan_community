<template>
  <div class="onepage">
    <headers></headers>
    <!-- <div class="topnav"> -->
    <van-tabs v-model="activeName" animated swipeable lazy-render color="#03A9F4" title-active-color="#03A9F4" line-width="30px" @change="handlechange">
      <van-tab title="推荐">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoadf" :offset="offsetTujian">

            <div>
              <van-loading v-show="firstLoad" type="spinner" color="#1989fa">
              </van-loading>
              <div class="mytiezi" v-for="(item,index) in recommend" :key="index" @click="postdetails(item.id)" v-show="recommend.length">
                <div class="jianghua" v-show="item.uploadId.length == 0 ">
                  <h2>{{item.title}}</h2>
                  <p>
                    <span class="s2">{{item.username}}</span>
                    <span class="s3">&nbsp;&nbsp;{{item.reply}}评&nbsp;&nbsp;</span>
                    {{item.audit_time}}
                  </p>
                </div>
                <div class="lvyou" v-show="item.uploadId.length == 1 || item.uploadId.length == 2">
                  <div class="dl_left">
                    <h4>{{item.title}}</h4>
                    <p>
                      {{item.username}}
                      <span class="s1">{{item.reply}}评</span>
                      <span>{{item.audit_time}}</span>
                    </p>
                  </div>
                  <div class="dl_right">
                    <div class="ban">
                      <img style="object-fit: cover;" v-lazy="item.uploadId.length?item.uploadId.length === 1?GLOBAL.basesURL+item.uploadId:GLOBAL.basesURL+item.uploadId[0]:''" alt />
                    </div>
                  </div>
                </div>
                <div class="yinyuejie" v-show="item.uploadId.length == 3">
                  <h2>{{item.title}}</h2>
                  <ul class="gg_tu">
                    <li v-for="(items,index) in item.uploadId" :key="index">
                      <img style="object-fit: cover;" v-lazy="GLOBAL.basesURL + items" alt />
                    </li>
                  </ul>
                  <p>
                    {{item.username}}
                    <span class="s1">{{item.reply}}评</span>
                    <span>{{item.audit_time}}</span>
                  </p>
                </div>
              </div>

              <div class="nodata" v-show="!recommend.length &&!firstLoad">
                <div>
                  <img src="../assets/wushuju.png" alt />
                </div>
              </div>

              <div class="sementips" style="overflow-x:auto; white-space: nowrap;" @touchstart="touchstart">
                <h3>他们也在用亿源社区</h3>
                <ul>
                  <li v-for="(ent,index) in entList" :key="index">
                    <div class="fss">
                      <img v-lazy="GLOBAL.basesURL + ent.userhead" alt />
                    </div>
                    <h4>{{ent.name}}</h4>
                    <button @click="handleTipsent(ent.id,$event)">关注</button>
                  </li>
                  <li>
                    <div class="fsst" @click="handlefssttwo()">
                      <img src="../assets/icontop.png" alt />
                    </div>
                    <h4>查看更多</h4>
                  </li>
                </ul>
              </div>
              <div class="mytiezi" v-for="(item,index) in handleaima" :key="'info2-'+index" @click="postdetails(item.id)" v-show="handleaima.length">
                <div class="jianghua" v-show="item.uploadId.length == 0 ">
                  <h2>{{item.title}}</h2>
                  <p>
                    <span class="s2">{{item.username}}</span>
                    <span class="s3">&nbsp;&nbsp;{{item.reply}}评&nbsp;&nbsp;</span>
                    {{item.audit_time}}
                  </p>
                </div>
                <div class="lvyou" v-show="item.uploadId.length == 1 || item.uploadId.length == 2">
                  <div class="dl_left">
                    <h4>{{item.title}}</h4>
                    <p>
                      {{item.username}}
                      <span class="s1">&nbsp;{{item.reply}}评&nbsp;</span>
                      <span>{{item.audit_time}}</span>
                    </p>
                  </div>
                  <div class="dl_right">
                    <div class="ban">
                      <img style="object-fit: cover;" v-lazy="item.uploadId.length?item.uploadId.length === 1?GLOBAL.basesURL+item.uploadId:GLOBAL.basesURL+item.uploadId[0]:''" alt />
                    </div>
                  </div>
                </div>
                <div class="yinyuejie" v-show="item.uploadId.length == 3">
                  <h2>{{item.title}}</h2>
                  <ul class="gg_tu">
                    <li v-for="(items,index) in item.uploadId" :key="index">
                      <img style="object-fit: cover;" v-lazy="GLOBAL.basesURL + items" alt />
                    </li>
                  </ul>
                  <p>
                    {{item.username}}
                    <span class="s1">&nbsp;&nbsp;{{item.reply}}评&nbsp;&nbsp;</span>
                    <span>{{item.audit_time}}</span>
                  </p>
                </div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>

      <van-tab title="关注">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" @load="onLoadfg" :finished="finishedfg" finished-text="没有更多了" :offset="offset">
            <van-loading v-show="vanloading" type="spinner" color="#1989fa" />
            <div>
              <div class="nodata" v-show="!guanzhuList &&!vanloading">
                <div>
                  <img src="../assets/wushuju.png" alt />
                </div>
              </div>
              <!-- 推荐关注 -->
              <div v-if="handleAdvert">
                <div class="guanzhu" v-show="guanzhuList">
                  <div class="Advertisements">
                    <span>还没有关注</span>
                    <br />
                    <span>快来关注您感兴趣的人</span>
                  </div>
                  <div class="interval"></div>
                  <dl v-for="(item,index) in guanzhuList" :key="index">
                    <dt>
                      <span>
                        <img v-lazy="GLOBAL.basesURL + item.userhead" alt />
                      </span>
                    </dt>
                    <dd>
                      <ul>
                        <li>{{item.name}}</li>
                        <li class="introduction">{{item.description}}</li>
                        <li>
                          <span>{{item.field}}</span>
                          &nbsp;&nbsp;&nbsp;{{item.forum}}发帖数
                        </li>
                      </ul>
                      <button type="danger" :class="{'button':item.type == 2}" @click="btn(item.id,$event)">{{crr==true?'已关注':'关注'}}</button>
                    </dd>
                  </dl>
                </div>
                <div>
                  <button class="handlezhu" @click="handleanother">换一批</button>
                  <button class="handlezhutips" @click="handlebatch">一键关注</button>
                </div>
              </div>
              <div v-if="handleAdvertr">
                <div class="guanzhu" v-show="guanzhuList">
                  <div class="Advertisement">大家都在关注</div>
                  <dl v-for="(item,index) in guanzhuList" :key="index">
                    <dt>
                      <span>
                        <img v-lazy="GLOBAL.basesURL + item.userhead" alt />
                      </span>
                    </dt>
                    <dd>
                      <ul>
                        <li>{{item.name}}</li>
                        <li class="introduction">{{item.description}}</li>
                        <li>
                          <span>{{item.field}}</span>
                          &nbsp;&nbsp;&nbsp;{{item.forum}}发帖数
                        </li>
                      </ul>
                      <button type="danger" :class="{'button':item.type == 2}" @click="btn(item.id,$event)">关注</button>
                    </dd>
                  </dl>
                </div>
                <div>
                  <button class="handlezhu" @click="handleanother">换一批</button>
                  <button class="handlezhutips" @click="handlebatch">一键关注</button>
                </div>
              </div>
              <!-- 关注人的帖子 -->
              <div v-if="handlesement">
                <div class="sement" v-if="handletru">
                  <ul>
                    <h3>已关注</h3>
                    <li v-for="(arr,index) in attentlist" :key="index">
                      <div class="fss">
                        <img v-lazy="GLOBAL.basesURL + arr.userhead" alt />
                      </div>
                      <h4>{{arr.name}}</h4>
                    </li>
                    <li>
                      <div class="fsst" @click="handlefsst()">
                        <img src="../assets/pic1545424.png" alt />
                      </div>
                      <h4>关注更多</h4>
                    </li>
                  </ul>
                </div>
                <div class="interval"></div>
                <div>
                  <div class="sementlist" v-for="(num,index) in attentforum" :key="index" v-show="num.uploadId.length == 2 || num.uploadId.length == 1 || num.uploadId.length == 0 ||num.uploadId==null" @click="postdetails(num.id)">
                    <span>
                      <img v-lazy="GLOBAL.basesURL + num.userhead" alt />
                    </span>
                    <ul>
                      <li>{{num.username}}</li>
                      <li>{{num.account_introduction}}</li>
                    </ul>
                    <i>{{num.audit_time}}</i>
                    <div class="sementget">
                      <div class="semet-left">
                        <h2>{{num.title}}</h2>
                        <div class="handlecomment">
                          <span>评论&nbsp;{{num.comment}}</span>
                          <span>点赞&nbsp;{{num.zan}}</span>
                        </div>
                      </div>
                      <div class="semet-right">
                        <p>
                          <img v-lazy="GLOBAL.basesURL+num.uploadId[0]" alt />
                        </p>
                      </div>
                    </div>
                    <div class="intervalplus"></div>
                  </div>
                  <div class="sementdiagram" v-for="(crr,index) in attentforum" :key="'info2-'+index" v-show="crr.uploadId.length == 3 " @click="postdetails(crr.id)">
                    <div>
                      <span>
                        <img v-lazy="GLOBAL.basesURL + crr.userhead" alt />
                      </span>
                      <ul>
                        <li>{{crr.username}}</li>
                        <li>{{crr.account_introduction}}</li>
                      </ul>
                      <i>{{crr.audit_time}}</i>
                      <div class="diagram">
                        <h2>{{crr.title}}</h2>
                        <div>
                          <img v-lazy="GLOBAL.basesURL+crr.uploadId[0]" alt />
                        </div>
                        <div>
                          <img v-lazy="GLOBAL.basesURL+crr.uploadId[1]" alt />
                        </div>
                        <div>
                          <img v-lazy="GLOBAL.basesURL+crr.uploadId[2]" alt />
                        </div>
                      </div>
                    </div>
                    <span class="diagr">评论&nbsp;{{crr.comment}}</span>
                    <span class="diagr">点赞&nbsp;{{crr.zan}}</span>
                  </div>
                  <div class="interval"></div>
                </div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>

      <van-tab title="悬赏" name="悬赏" v-if="xuanshTab">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finishedxsh" finished-text="没有更多了" @load="onLoadXSh" :offset="offsetXS">
            <van-loading v-show="vanloading" type="spinner" color="#1989fa" />
            <div class="xuanshang" v-show="xuanshList.length>0">
              <div class="xsh_item" v-for="(item,index) in xuanshList" :key="index" @click="xShDetail(item.id ,item.draft)">
                <div class="title">
                  <span>{{item.title}}</span>
                </div>
                <div class="item_img">
                  <img v-lazy="GLOBAL.basesURL+item.images[0]" alt="">
                </div>
                <div class="xuanshe_time">
                  <span>悬赏开始时间：{{item.startdate.slice(0,4)+"年"+item.startdate.slice(5,7)+'月'+item.startdate.slice(8,10)+'日'+item.startdate.slice(10,19)}}</span>
                  <span>悬赏结束时间：{{item.enddate.slice(0,4)+"年"+item.enddate.slice(5,7)+'月'+item.enddate.slice(8,10)+'日'+item.enddate.slice(10,19)}}</span>
                </div>
                <div class="xuanshang_line">

                </div>

              </div>
            </div>
            <div class="nodata" v-show="xuanshList.length==0 && !vanloading">
              <div>
                <img src="../assets/wushuju.png" alt />
              </div>
            </div>
          </van-list>
        </van-pull-refresh>

      </van-tab>

      <van-tab title="人文">
        <!-- 频道分类 -->
        <!-- <div class="topnavigation" slot="title" @click="dian(index,item.id)">{{item.name}}</div> -->
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finishedr" finished-text="没有更多了" @load="onLoad" :offset="offsetRenWen">
            <van-loading v-show="vanloading" type="spinner" color="#1989fa" />
            <div class="dadadada">
              <div class="mytiezi" v-for="(item,index) in renwenList" :key="index" @click="postdetails(item.id)" v-show="renwenList.length">
                <div class="jianghua" v-show="item.images.length == 0">
                  <h2>{{item.title}}</h2>
                  <p class="zero">
                    <span class="s2">{{item.username}}</span>&nbsp;&nbsp;
                    <span class="s3">{{item.reply}}评</span>
                    &nbsp;{{item.audit_time}}
                  </p>
                </div>
                <div class="lvyou" v-show="item.images.length == 1 ||item.images.length == 2 ">
                  <div class="dl_left">
                    <h4>{{item.title}}</h4>
                    <p>
                      {{item.username}}
                      <span class="s1">{{item.reply}}评</span>
                      <span>{{item.audit_time}}</span>
                    </p>
                  </div>
                  <div class="dl_right">
                    <div class="ban">
                      <img style="object-fit: cover;" v-lazy="item.images.length?item.images.length === 1?GLOBAL.basesURL+item.images:GLOBAL.basesURL+item.images[0]:''" alt />
                    </div>
                  </div>
                </div>
                <div class="yinyuejie" v-show="item.images.length == 3 ||item.images.length == 4">
                  <h2>{{item.title}}</h2>
                  <ul class="gg_tu">
                    <li v-for="(items,index) in item.images" :key="index">
                      <img style="object-fit: cover;" :src="GLOBAL.basesURL + items" alt />
                    </li>
                  </ul>
                  <p>
                    {{item.username}}
                    <span class="s1">{{item.reply}}评</span>
                    <span>{{item.audit_time}}</span>
                  </p>
                </div>
              </div>
              <div class="nodata" v-show="!renwenList.length && !vanloading">
                <div>
                  <img src="../assets/wushuju.png" alt />
                </div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>

      <van-tab title="历史">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finishedet" finished-text="没有更多了" @load="onLoady" :offset="offsetLiShi">
            <van-loading v-show="vanloading" type="spinner" color="#1989fa" />
            <div>
              <div class="mytiezi" v-for="(item,index) in renwenHistory" :key="index" @click="postdetails(item.id)" v-show="renwenHistory.length">
                <div class="jianghua" v-show="item.images.length == 0">
                  <h2>{{item.title}}</h2>
                  <p>
                    <span class="s2">{{item.username}}</span>
                    <span class="s3">&nbsp;{{item.reply}}评&nbsp;</span>
                    {{item.audit_time}}
                  </p>
                </div>
                <div class="lvyou" v-show="item.images.length == 1 ">
                  <div class="dl_left">
                    <h4>{{item.title}}</h4>
                    <p>
                      {{item.username}}
                      <span class="s1">&nbsp;{{item.reply}}评&nbsp;</span>
                      <span>{{item.audit_time}}</span>
                    </p>
                  </div>
                  <div class="dl_right">
                    <div class="ban">
                      <img style="object-fit: cover;" v-lazy="item.images.length?item.images.length === 1?GLOBAL.basesURL+item.images:GLOBAL.basesURL+item.images[0]:''" alt />
                    </div>
                  </div>
                </div>
                <div class="yinyuejie" v-show="item.images.length == 3">
                  <h2>{{item.title}}</h2>
                  <ul class="gg_tu">
                    <li v-for="(items,index) in item.images" :key="index">
                      <img style="object-fit: cover;" v-lazy="GLOBAL.basesURL + items" alt />
                    </li>
                  </ul>
                  <p>
                    {{item.username}}
                    <span class="s1">&nbsp;{{item.reply}}评&nbsp;</span>
                    <span>{{item.audit_time}}</span>
                  </p>
                </div>
              </div>
              <div class="nodata" v-show="!renwenHistory.length &&!vanloading">
                <div>
                  <img src="../assets/wushuju.png" alt />
                </div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>

      <van-tab title="佛学">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finishedfoxue" finished-text="没有更多了" :offset="offsetFoXue" @load="onLoadLzy">
            <van-loading v-show="vanloading" type="spinner" color="#1989fa" />
            <div>
              <div class="mytiezi" v-for="(item,index) in renwenBuddhism" :key="index" @click="postdetails(item.id)" v-show="renwenBuddhism.length">
                <div class="jianghua" v-show="item.images.length == 0">
                  <h2>{{item.title}}</h2>
                  <p>
                    <span class="s2">{{item.username}}</span>
                    <span class="s3">{{item.reply}}</span>
                    评{{item.audit_time}}
                  </p>
                </div>
                <div class="lvyou" v-show="item.images.length == 1 ">
                  <div class="dl_left">
                    <h4>{{item.title}}</h4>
                    <p>
                      {{item.username}}
                      <span class="s1">{{item.reply}}评</span>
                      <span>{{item.audit_time}}</span>
                    </p>
                  </div>
                  <div class="dl_right">
                    <div class="ban">
                      <img style="object-fit: cover;" v-lazy="item.images.length?item.images.length === 1?GLOBAL.basesURL+item.images:GLOBAL.basesURL+item.images[0]:''" alt />
                    </div>
                  </div>
                </div>
                <div class="yinyuejie" v-show="item.images.length == 3">
                  <h2>{{item.title}}</h2>
                  <ul class="gg_tu">
                    <li v-for="(items,index) in item.images" :key="index">
                      <img style="object-fit: cover;" v-lazy="GLOBAL.basesURL + items" alt />
                    </li>
                  </ul>
                  <p>
                    {{item.username}}
                    <span class="s1">{{item.reply}}评</span>
                    <span>{{item.audit_time}}</span>
                  </p>
                </div>
              </div>
              <div class="nodata" v-show="!renwenBuddhism.length&&!vanloading">
                <div>
                  <img src="../assets/wushuju.png" alt />
                </div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>

      <van-tab title="话题">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">

          <van-list v-model="loading" :finished="finishedppy" finished-text="没有更多了" :offset="offsetHuaTi">
            <van-loading v-show="vanloading" type="spinner" color="#1989fa" />
            <div>
              <div class="mytiezi" v-for="(item,index) in renwensation" :key="index" @click="postdetails(item.id)" v-show="renwensation.length" @load="onLoadrry">

                <div class="jianghua" v-show="item.images.length == 0">
                  <h2>{{item.title}}</h2>
                  <p>
                    <span class="s2">{{item.username}}</span>
                    <span class="s3">&nbsp;&nbsp;{{item.reply}}评</span>
                    &nbsp;&nbsp;{{item.audit_time}}
                  </p>
                </div>
                <div class="lvyou" v-show="item.images.length == 1 || item.images.length == 2">
                  <div class="dl_left">
                    <h4>{{item.title}}</h4>
                    <p>
                      {{item.username}}
                      <span class="s1">{{item.reply}}评</span>
                      <span>{{item.audit_time}}</span>
                    </p>
                  </div>
                  <div class="dl_right">
                    <div class="ban">
                      <img style="object-fit: cover;" v-lazy="item.images.length?item.images.length === 1?GLOBAL.basesURL+item.images:GLOBAL.basesURL+item.images[0]:''" alt />
                    </div>
                  </div>
                </div>
                <div class="yinyuejie" v-show="item.images.length == 3">
                  <h2>{{item.title}}</h2>
                  <ul class="gg_tu">
                    <li v-for="(items,index) in item.images" :key="index">
                      <img style="object-fit: cover;" v-lazy="GLOBAL.basesURL + items" alt />
                    </li>
                  </ul>
                  <p>
                    {{item.username}}
                    <span class="s1">&nbsp;&nbsp;{{item.reply}}评&nbsp;&nbsp;</span>
                    <span>{{item.audit_time}}</span>
                  </p>
                </div>
              </div>
              <div class="nodata" v-show="!renwensation.length&&!vanloading">
                <div>
                  <img src="../assets/wushuju.png" alt />
                </div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import axios from 'axios'
import headers from '../index_components/index_header.vue'
export default {
  name: 'onepage',
  components: { headers },
  data() {
    return {
      firstLoad: true,
      activeName: 0,
      active: 0,
      data: [],
      renwenList: [],
      lingyuList: [], //频道分类
      guanzhuList: [], //随机关注
      renwenHistory: [], //历史列表
      renwenBuddhism: [], //佛学列表
      renwensation: [], //话题列表
      count: 0,
      field: '',
      isLoading: false,
      pageoA: 1, //页码
      pages: 1, //页码
      pagez: 1, //页码
      pagenice: 1, //页码
      pagenrry: 1, //页码
      psgefg: 6,
      size: 0, //每页数量
      recommend: [],
      list: [],
      loading: false, //控制上拉加载的加载动画
      finished: false, //控制在页面往下移动到底部时是否调用接口获取数据
      finishedr: false,
      finishedet: false,
      finishedfg: false,
      finishedppy: false,
      finishedfoxue: false,
      isLoading: false, //控制下拉刷新的加载动画
      vanloading: true,
      handleAdvert: false, //推荐关注
      handlesement: false, //关注人帖子
      handletru: false,
      handlesementArt: false,
      handleAdvertr: false,
      attentlist: [],
      id: [], //一键关注
      attentforum: [],
      entList: [],
      handleaima: [],
      total: '',
      crr: '',
      show: false, // 弹框
      getCode: {
        txt: '获取验证码'
      },
      disabled: false,
      mobile: '',
      code: '',
      fffff: [],
      // weixinmobile: "",
      xuanshList: [],
      offset: 300, //滚动条与底部距离小于 offset 时触发load事件
      offsetXS: 300,
      pageXSh: 1,
      finishedxsh: false,
      xuanshTab: true,
      offsetTujian: 300,
      offsetHuaTi: 300,
      offsetFoXue: 300,
      offsetRenWen: 300,
      offsetLiShi: 300
    }
  },
  computed: {
    State() {
      return this.mobile !== '' && this.code !== ''
    }
  },
  methods: {
    // 点赞、收藏、关注
    btn(id, e) {
      var date = {
        action: 'care',
        id: id
      }
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/user/interact',
        data: date,
        transformRequest: [
          function(data) {
            // console.log(data)
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
        this.handlerand()
        this.handlent()
        location.reload()
        this.crr = res.data.result
        if (this.crr) {
          if (res.data.pojo.iscare) {
            e.target.style.background = '#f0f0f0'
            e.target.style.color = '#999'
          } else {
            e.target.style.background = '#03A9F4'
            e.target.style.color = '#fff'
          }
        } else {
          this.$router.push({
            path: '/land'
          })
        }
      })
    },
    postdetails(id) {
      this.$router.push({
        path: `/post_details/${id}`
      })
    },
    dian(index, id) {
      this.$store.commit('renwenId', id)
    },
    handlefsst() {
      this.$router.push({ path: '/follow?tab=second' })
    },
    handlefssttwo() {
      this.$router.push({ path: '/follow?tab=second' })
    },
    // 上拉
    onLoad() {
      this.vanloading = true
      this.getpendetail()
      // console.log("人文");
    },
    onLoady() {
      this.vanloading = true
      this.handleHistory()
    },
    onLoadf() {
      let date = {
        page: this.pageoA + 1,
        type: 'recommend'
      }
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/forum/bypage',
        data: date
      }).then(res => {
        console.log(res)
        this.size = res.data.pages + 1
        this.handleaima = this.handleaima.concat(res.data.list)
        this.loading = false
        this.pageoA++
        if (this.pageoA >= this.size) {
          this.finished = true
        }
      })
    },
    onLoadrry() {
      this.vanloading = true
      this.handleconversation()
    },
    onLoadLzy() {
      this.vanloading = true
      this.handleBuddhism()
      // console.log("佛学");
    },
    onLoadfg() {},
    // 人文
    async getpendetail() {
      let date = {
        page: this.pagez,
        size: '6',
        field: '20190620160804833109212'
      }
      const res = await axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/forum/bypage',
        data: date
      })

      //
      console.log(res)
      this.vanloading = false
      this.size = res.data.pages + 1
      console.log(this.size)
      this.renwenList = this.renwenList.concat(res.data.list)
      this.loading = false
      this.pagez += 1
      console.log(this.pagez)
      if (this.pagez >= this.size) {
        this.finishedr = true
      }
    },
    // 历史查询
    async handleHistory() {
      let datesr = {
        page: this.pages,
        field: '20190620160808254266929'
      }
      const res = await axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/forum/bypage',
        data: datesr
      })

      // this.renwenHistory = res.data.list;
      this.vanloading = false
      this.size = res.data.pages + 1
      this.renwenHistory = this.renwenHistory.concat(res.data.list)
      this.loading = false
      this.pages += 1
      if (this.pages >= this.size) {
        this.finishedet = true
      }
    },
    // 佛学查询
    async handleBuddhism() {
      let datedf = {
        page: this.pagenice,
        field: '20190620160812434163690'
      }
      const res = await axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/forum/bypage',
        data: datedf
      })
      // this.renwenBuddhism = res.data.list;
      // console.log(res);
      this.vanloading = false
      this.size = res.data.size
      this.renwenBuddhism = this.renwenBuddhism.concat(res.data.list)
      this.loading = false
      if ((res.data.list = [])) {
        this.finishedfoxue = true
        this.loading = false
      } else {
        this.pagenice++
        if (this.pagenice >= this.size) {
          this.finishedfoxue = true
        }
      }
    },
    // 话题查询
    async handleconversation() {
      let datell = {
        page: this.pagenrry,
        field: '20191017101625895591130'
      }
      const res = await axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/forum/bypage',
        data: datell
      })

      this.vanloading = false
      this.size = res.data.pages
      // console.log(this.size)
      this.renwensation = this.renwensation.concat(res.data.list)
      this.loading = false
      if (res.data.list.length < 6) {
        this.finishedppy = true
      }
      // this.pages++;
      if (this.pagenrry >= this.size) {
        this.finishedppy = true
      }
    },
    // 帖子分页查询
    infon() {
      // 频道分类
      // this.$axios({
      //   method: "post",
      //   url: this.GLOBAL.baseURL + "field/list"
      // }).then(res => {
      //   this.lingyuList = res.data.pojo;
      // });
    },
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 }
    },
    // 帖子推荐
    infons() {
      var datf = {
        type: 'recommend',
        page: 1
      }
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/forum/bypage',
        data: datf
      }).then(res => {
        this.recommend = res.data.list.splice(2, 2)
        if (res.status == 200) {
          this.firstLoad = false
        }
        console.log(res.status)
      })
    },
    xShDetail(e, f) {
      if (f == 1) {
        this.$toast('活动未开始，敬请期待！')
      } else {
        this.$router.push({
          path: '/rewordDetais',
          query: {
            id: e
          }
        })
      }
    },
    //悬赏任务列表
    onLoadXSh() {
      this.vanloading = true
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/reward/getPage',
        data: {
          page: this.pageXSh,
          size: '5'
        },
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
        this.vanloading = false
        if (res.data.msg == '无记录') {
          this.loading = false
          this.finishedxsh = true
        } else {
          this.loading = false
          this.xuanshList = this.xuanshList.concat(res.data.pojo.list)
          if (res.data.pojo.list.length < 5) {
            this.finishedxsh = true
          } else {
            if (res.data.result) {
              if (res.data.pojo.total != this.xuanshList.length) {
                this.pageXSh = this.pageXSh + 1
              } else {
                this.finishedxsh = true
              }
            } else {
              this.finishedxsh = true
            }
          }
        }
      })
    },

    // 随机关注查询
    handlerand() {
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/attent/rand',
        data: {
          sex: '6'
          // page: "6"
        }
      }).then(res => {
        // this.vanloading = false;
        // this.size = res.data.pojo.length;
        // this.guanzhuList = this.guanzhuList.concat(res.data.pojo.splice(0, 6));
        // this.loading = false;
        // // this.psgefg++;
        // if (this.psgefg >= this.size) {
        //   this.finishedfoxue = true;
        // }
        this.guanzhuList = res.data.pojo
        this.finishedfg = true
        this.loading = false
        this.vanloading = false
        // console.log( this.guanzhuList)

        for (let i = 0; i < this.guanzhuList.length; i++) {
          this.id.push(this.guanzhuList[i].id)
        }
      })
    },
    // 随机关注查询
    async handlent() {
      const res = await axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/attent/rand',
        data: {
          sex: '3'
        }
      })
      this.entList = res.data.pojo
    },
    // 下拉
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        // this.infon();
      }, 500)
    },
    // 入驻信息查询
    async handlesettled() {
      const res = await axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/settled/get'
      })
      if (res.data.pojo) {
        this.field = res.data.pojo.field
      }
    },
    // 我的关注
    async handleattent() {
      var date = {
        page: '1',
        size: '2',
        type: 2
      }
      const res = await axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/attent/page',
        data: date
      })
      if (res.data == '' || res.data.list.length == 0) {
        this.handleAdvert = true
        this.handleAdvertr = false
      } else {
        this.handlesement = true
        this.handletru = true
        this.handlesementArt = true
      }
      if (res.data.list[0] == '用户未登录') {
        this.handletru = false
      }
      this.attentlist = res.data.list.slice(0, 3)
    },
    // 我的关注人帖子
    async handleattentforum() {
      const res = await axios({
        method: 'post',
        url: this.GLOBAL.baseURL + 'attent/attentforum'
      })
      if (res.data.msg == '用户未登录') {
        this.show = false
        this.handlesement = false
        this.handletru = false
        this.handleAdvertr = true
      }
      this.attentforum = res.data.pojo
      console.log(this.attentforum)
      for (let i = 0; i < this.attentforum.length; i++) {
        if (this.attentforum[i].uploadId == null) {
          console.log(12)
        }
      }
    },
    // 一键关注
    async handlebatch() {
      const res = await axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/user/batchCare?id=' + this.id
      })
      // console.log(res);
      this.$toast('关注成功')
      this.handlerand()
    },
    handleTipsent(id, e) {
      var date = {
        action: 'care',
        id: id
      }
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/user/interact',
        data: date,
        transformRequest: [
          function(data) {
            // console.log(data)
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
        this.handlent()
      })
    },
    // 换一批
    handleanother() {
      this.handlerand()
    },
    yanzhengs: function() {
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
      var datae = { mobile: this.mobile }
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/wxLog/weChatMobile',
        data: datae,
        transformRequest: [
          function(data) {
            // console.log(data);
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
      }).then(function(res) {
        // console.log(res);
      })
    },
    handlestying() {
      if (this.mobile == '' || this.mobile == null) {
        this.$toast('请输入手机号')
      } else if (this.code == '' || this.code == null) {
        this.$toast('请输入验证码')
      } else if (!/^1[34578]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
      } else {
        var datae = { mobile: this.mobile, code: this.code }
        this.$axios({
          method: 'post',
          url: this.GLOBAL.baseURL + '/wxLog/binding',
          data: datae,
          transformRequest: [
            function(data) {
              // console.log(data);
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
        })
          .then(
            function(res) {
              // console.log(res);
              this.$toast(res.data.msg)
              // this.$toast("绑定成功");
              this.show = false
            }.bind(this)
          )
          .catch(function(error) {
            // console.log(error);
          })
      }
    },
    touchstart(e) {
      e.stopPropagation()
    },
    handlechange(name, title) {
      if (name == 1) {
        this.vanloading = true
        this.handleattent()
        this.handleattentforum()
        this.handlerand()
      } else if (title == '话题') {
        if (!this.finishedppy) {
          this.handleconversation() //话题
        }
      } else if (name == 2) {
        // this.pagez = 1
        // this.onLoad()
      } else if (name == 4) {
        // this.pages = 1
        // this.onLoady()
      } else if (name == 5) {
        // this.handleBuddhism()
      } else if (name == '悬赏') {
      }
    },
    //初始判断有没有悬赏
    rewardTab() {
      this.$axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/reward/getPage',
        data: {
          page: 1,
          size: '5'
        },
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
        if (res.data.msg == '无记录') {
          this.xuanshTab = false
        }
      })
    }
  },
  watch: {
    activeName(a) {
      var regex = /\,(.+?)\]/g
      var regexs = /\[(.+?)\,/g
      var navindex
      var renwenId
      this.$store.commit('navindex', a)
      if ((renwenId = regex.exec(a)) != null) {
        this.$store.commit('renwenId', renwenId[1])
      }
    }
  },
  created() {
    this.handlent()
    this.infons()
    this.handlesettled()

    // var handleopenid = localStorage.getItem('openid')
    // bugbug
    this.rewardTab()
  },
  mounted() {
    var ut = window.localStorage.removeItem('kong')
    if (ut == undefined) {
      window.localStorage.removeItem('t')
      window.localStorage.removeItem('x')
      window.localStorage.removeItem('v')
      window.localStorage.removeItem('u')
      window.localStorage.removeItem('ur')
      window.localStorage.removeItem('ut')
    }
  }
}
</script>

<style scoped lang="less">
.px2rem(@name, @px) {
  @{name}: @px / 75 * 1rem;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: normal;
}

.Advertisement {
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  background: #eaeaea;
  color: #999999;
  padding-left: 20px;
}
.Advertisements {
  width: 100%;
  height: 74px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 1px 0px rgba(234, 234, 234, 1);
  text-align: center;
  padding-top: 29px;
  span {
    .px2rem(font-size, 32);
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 25px;
  }
}
.sement {
  .px2rem(height, 294);
  h3 {
    .px2rem(font-size, 29);
    font-family: SourceHanSansCN-Normal, SourceHanSansCN;
    font-weight: 400;
    color: rgba(63, 59, 59, 1);
    .px2rem(margin-left, 36);
    .px2rem(padding-top, 26);
  }
  ul {
    li {
      width: 20%;
      .px2rem(height, 144);
      .px2rem(margin-top, 16);
      .px2rem(margin-left, 17);
      float: left;
      text-align: center;
      .fss {
        margin: 0 auto;
        .px2rem(width, 120);
        .px2rem(height, 120);
        width: 60px;
        height: 60px;
        border: 1px solid #d0d0d0;
        border-radius: 48%;
        margin-top: 2px;
        img {
          width: 94%;
          height: 58px;
          margin-top: 1px;
          border-radius: 50%;
        }
      }
      h4 {
        .px2rem(font-size, 26);
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-top: 8px;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .fsst {
        width: 60px;
        height: 60px;
        margin: 0 auto;
        border: 1px solid #d0d0d0;
        border-radius: 48%;
        margin-top: 2px;
        img {
          .px2rem(margin-top, 30);
          width: 50%;
          height: 30px;
        }
      }
    }
  }
}
.sementips {
  overflow-x: auto !important;
  white-space: nowrap !important;
  .px2rem(height, 440);
  border-bottom: 8px solid #f3f3f3;
  overflow: hidden;
  border-top: 8px solid #f3f3f3;
  h3 {
    position: absolute;
    .px2rem(font-size, 32);
    font-family: SourceHanSansCN-Normal, SourceHanSansCN;
    font-weight: 400;
    color: rgba(63, 59, 59, 1);
    .px2rem(margin-left, 30);
    .px2rem(padding-top, 16);
    font-weight: 600;
  }
  ul {
    .px2rem(height, 460);
    width: 600px;
    li {
      position: relative;
      width: 22%;
      .px2rem(height, 328);
      .px2rem(margin-top, 74);
      .px2rem(margin-left, 28);
      float: left;
      text-align: center;
      border-radius: 6px;
      border: 1px solid rgba(204, 204, 204, 1);
      .fss {
        margin: 0 auto;
        .px2rem(width, 120);
        .px2rem(height, 120);
        width: 60px;
        height: 60px;
        border: none;
        border-radius: 48%;
        .px2rem(margin-top, 32);
        img {
          width: 94%;
          height: 58px;
          margin-top: 1px;
          border-radius: 50%;
        }
      }
      h4 {
        .px2rem(font-size, 26);
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-top: 11px;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .fsst {
        width: 60px;
        height: 60px;
        margin: 0 auto;
        border: none;
        border-radius: 48%;
        .px2rem(margin-top, 62);
        background: rgba(3, 169, 244, 1);
        box-shadow: 0px 2px 3px 0px rgba(119, 213, 255, 1);
        img {
          .px2rem(margin-top, 10);
          width: 80%;
          height: 48px;
        }
      }
      button {
        // .px2rem(width, 224);
        width: 75%;
        .px2rem(height, 58);
        background: rgba(3, 169, 244, 1);
        border-radius: 6px;
        border: 0px;
        color: #fff;
        .px2rem(font-size, 28);
        .px2rem(margin-top, 28);
      }
    }
    li:last-child {
      border: 0px;
      h4 {
        color: #03a9f4;
      }
    }
  }
  .Tips-ent {
    position: absolute;
    left: 50px;
    top: 50px;
    img {
      width: 20px;
      height: 20px;
    }
  }
}
.interval {
  .px2rem(height, 20);
  background: #f4f5f7;
}
.sementlist {
  position: relative;
  .px2rem(height, 400);
  .px2rem(margin-top, 20);
  span {
    img {
      float: left;
      width: 50px;
      height: 50px;
      .px2rem(margin-top, 40);
      .px2rem(margin-left, 34);
      border-radius: 50%;
    }
  }
  i {
    position: absolute;
    float: left;
    right: 0px;
    top: 10px;
    .px2rem(font-size, 24);
    font-family: Roboto-Regular, Roboto;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    font-style: normal;
    .px2rem(margin-right, 30);
    .px2rem(margin-top, 36);
  }
  ul {
    height: 65px;
    .px2rem(padding-top, 20);
    li:first-child {
      .px2rem(line-height, 80);
      .px2rem(font-size, 32);
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      .px2rem(margin-left, 150);
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
    }
    li:last-child {
      height: 20px;
      .px2rem(margin-left, 150);
      .px2rem(margin-right, 36);
      .px2rem(font-size, 26);
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
}
.sementdiagram {
  position: relative;
  .px2rem(height, 470);
  .px2rem(margin-top, 20);
  span {
    img {
      float: left;
      width: 50px;
      height: 50px;
      .px2rem(margin-top, 30);
      .px2rem(margin-left, 34);
      border-radius: 50%;
    }
  }
  i {
    position: absolute;
    float: left;
    right: 0px;
    top: 10px;
    .px2rem(font-size, 24);
    font-family: Roboto-Regular, Roboto;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    font-style: normal;
    .px2rem(margin-right, 30);
    .px2rem(padding-top, 20);
  }
  ul {
    .px2rem(padding-top, 20);
    li:first-child {
      .px2rem(line-height, 74);
      .px2rem(font-size, 29);
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      .px2rem(margin-left, 150);
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
    }
    li:last-child {
      .px2rem(margin-right, 34);
      .px2rem(margin-left, 150);
      .px2rem(font-size, 26);
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
  .diagram {
    h2 {
      .px2rem(margin-left, 36);
      .px2rem(margin-right, 32);
      .px2rem(margin-top, 24);
      .px2rem(margin-bottom, 24);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      /*控制在3行*/
      -webkit-box-orient: vertical;
    }
    img {
      width: 30%;
      height: 80px;
      .px2rem(margin-left, 19);
      float: left;
      border-radius: 4px;
    }
  }
  .diagr {
    .px2rem(margin-left, 36);
    .px2rem(font-size, 26);
    line-height: 40px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
}
.sementget {
  .px2rem(margin-top, 20);
  width: 100%;
  height: 70px;
  background: #fff;
  .semet-left {
    width: 65%;
    background: #fff;
    height: 70px;
    float: left;
    h2 {
      .px2rem(margin-right, 24);
      .px2rem(margin-left, 36);
      .px2rem(font-size, 32);
      font-weight: 600;
      word-break: break-all;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    span {
      .px2rem(margin-left, 36);
      .px2rem(font-size, 26);
      line-height: 40px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
  }
  .semet-right {
    float: right;
    width: 35%;
    height: 70px;
    p {
      img {
        width: 82%;
        height: 80px;
        .px2rem(margin-right, 24);
        border-radius: 4px;
      }
    }
  }
}

.handlezhu {
  width: 24%;
  height: 33px;
  border-radius: 16px;
  border: 1px solid rgba(3, 169, 244, 1);
  font-size: 14px;
  font-family: SourceHanSansCN-Normal, SourceHanSansCN;
  font-weight: 400;
  color: rgba(3, 169, 244, 1);
  line-height: 21px;
  background: #fff;
  margin-bottom: 30px;
  margin-left: 64px;
}
.handlezhutips {
  width: 24%;
  height: 33px;
  border-radius: 16px;
  border: 1px solid rgba(3, 169, 244, 1);
  font-size: 14px;
  font-family: SourceHanSansCN-Normal, SourceHanSansCN;
  font-weight: 400;
  color: #fff;
  line-height: 33px;
  background: rgba(3, 169, 244, 1);
  margin-bottom: 30px;
  margin-left: 64px;
}
.nodata {
  @val: 2.8rem;
  @vals: 52px;
  width: 100%;
  height: calc(100vh - @val - @vals);
  background: #f3f3f3;
  div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    img {
      width: 30%;
      margin: 0 auto;
    }
  }
}
.handledetails {
  height: 124px;
  background: pink;
}
.tuijian::after {
  content: '';
  display: block;
  width: 100%;
  .px2rem(height, 120);
}
.guanzhu::after {
  content: '';
  display: block;
  width: 100%;
  .px2rem(height, 64);
}
.dadadada {
  background: #f3f3f3;
}
.dadadada::after {
  content: '';
  display: block;
  width: 100%;
}
.intervalplus {
  .px2rem(height, 20);
  background: #f4f5f7;
  .px2rem(margin-top, 20);
}
.mytiezi {
  background: #fff;
  .px2rem(padding-right, 30);
  .px2rem(padding-left, 30);
  .dl {
    .px2rem(height, 90);
    display: flex;
    dt {
      span {
        .px2rem(width, 90);
        .px2rem(height, 90);
        display: block;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
    }
    dd {
      display: flex;
      width: 100vh;
      justify-content: space-between;
      align-items: center;
      .px2rem(padding-left, 30);
      ul {
        li:first-child {
          .px2rem(font-size, 32);
          .px2rem(margin-bottom, 5);
        }
        li:last-child {
          .px2rem(font-size, 20);
          color: #999;
        }
      }
      p {
        .px2rem(width, 55);
        display: flex;
        align-items: center;
        img {
          width: 100%;
        }
      }
    }
  }
  .zy {
    .px2rem(margin-top, 25);
    dl {
      .px2rem(height, 170);
      display: flex;
      dt {
        p {
          .px2rem(padding, 20);
          .px2rem(font-size, 25);
        }

        width: 100vh;
        .px2rem(height, 170);
        background: #f3f3f3;
      }
      dd {
        span {
          .px2rem(width, 223);
          .px2rem(height, 170);
          display: block;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .threefengmian {
      p {
        .px2rem(padding-top, 15);
        .px2rem(padding-bottom, 20);
      }
      ul {
        display: flex;
        justify-content: space-between;
        li {
          .px2rem(width, 223);
          .px2rem(height, 170);
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  ol {
    display: flex;
    .px2rem(margin-top, 30);
    justify-content: space-around;
    align-items: center;
    li {
      display: flex;
      align-items: center;
      img {
        .px2rem(width, 33);
      }
      span {
        .px2rem(margin-left, 8);
      }
    }
  }
}
.title {
  p {
    .px2rem(line-height, 35);
    background: #f3f3f3;
    color: #999;
    .px2rem(font-size, 8);
    .px2rem(padding-left, 45);
  }
}
.gzfooter {
  text-align: center;
  .px2rem(margin-top, 60);
  button {
    .px2rem(margin-left, 30);
    .px2rem(margin-right, 30);
  }
  button:first-child {
    .px2rem(width, 198);
    .px2rem(height, 69);
    .px2rem(border-radius, 33);
    color: #ee3010;
    background: #fff;
    .px2rem(font-size, 30);
    border: 1px solid #ee3010;
  }
  button:last-child {
    .px2rem(width, 198);
    .px2rem(height, 69);
    .px2rem(border-radius, 33);
    color: #fff;
    background: #ee3010;
    .px2rem(font-size, 30);
    border: 1px solid #ee3010;
  }
}
.guanzhu {
  dl {
    display: flex;
    align-items: center;
    .px2rem(height, 140);
    border-bottom: 1px solid #f3f3f3;
    dt {
      width: 20%;
      span {
        display: block;
        .px2rem(width, 88);
        .px2rem(height, 88);
        border-radius: 50%;
        margin: 0 auto;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    dd {
      width: 80%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      ul {
        width: 70%;
        .li1 {
          display: block;
          width: 200px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        li {
          color: #999;
          max-width: 100%;
          .px2rem(font-size, 24);
        }
        li:first-child {
          color: #000;
          .px2rem(font-size, 29);
          .px2rem(margin-bottom, 8);
          font-weight: 600;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        li:last-child {
          .px2rem(margin-top, 5);
        }
      }
      button {
        .px2rem(width, 123);
        .px2rem(height, 50);
        .px2rem(font-size, 24);
        background: #03a9f4 url(../assets/button-jia.png) 8px no-repeat;
        background-size: 21%;
        color: #fff;
        .px2rem(border-radius, 33);
        border: none;
        .px2rem(margin-right, 30);
        .px2rem(padding-left, 20);
      }
      .button {
        background: #f0f0f0;
        color: #999;
      }
    }
  }
  .noguanzhu {
    dl {
      display: flex;
      align-items: center;
      .px2rem(height, 155);
      border-bottom: 1px solid #f3f3f3;
      dt {
        width: 20%;
        span {
          display: block;
          .px2rem(width, 88);
          .px2rem(height, 88);
          border-radius: 50%;
          margin: 0 auto;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      dd {
        width: 80%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        ul {
          width: 70%;
          .li1 {
            display: block;
            width: 200px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          li {
            .px2rem(font-size, 12);
            color: #999;
            max-width: 100%;
          }
          li:first-child {
            color: #000;
            .px2rem(font-size, 27);
            .px2rem(margin-bottom, 10);
          }
          li:last-child {
            .px2rem(margin-top, 5);
          }
        }
        button {
          .px2rem(width, 123);
          .px2rem(height, 50);
          background: #fff;
          .px2rem(font-size, 20);
          color: #ee3010;
          .px2rem(border-radius, 33);
          border: 1px solid #ee3010;
          .px2rem(margin-right, 30);
        }
      }
    }
  }
}
.yinying {
  width: 100%;
  .px2rem(height, 20);
  background: #f3f3f3;
}
.jianghua {
  border-bottom: 1px solid #f4f4f4;
  padding-bottom: 10px;
  h2 {
    .px2rem(font-size, 32);
    .px2rem(padding-top, 24);
    display: flex;
    font-weight: 600;
    display: inline-block;
    text-align: left;
    flex-wrap: wrap;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-family: SourceHanSansCN-Normal, SourceHanSansCN;
  }
  p {
    .px2rem(font-size, 24);
    color: #959595;
    .px2rem(margin-top, 12);
    .s1 {
      color: #ed8512;
    }
  }
}
.video {
  img {
    width: 100%;
    height: 100%;
  }
}
.tuijian {
  margin: 0 auto;
  width: 93%;
}
.gg_tu {
  img {
    width: 100%;
    height: 100%;
    border-radius: 3px;
  }
}
.lvyou {
  .px2rem(height, 250);
  border-bottom: 1px solid #f3f3f3;
  display: flex;
  justify-content: space-between;
}
.dl_left {
  width: 68%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  // margin: 14px auto;
  h4 {
    .px2rem(margin-top, 30);
    .px2rem(margin-right, 24);
    .px2rem(font-size, 32);
    display: flex;
    font-family: SourceHanSansCN-Normal, SourceHanSansCN;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    display: inline-block;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  p {
    .px2rem(font-size, 24);
    color: #999;
    .px2rem(margin-right, 24);
    display: inline-block;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    .px2rem(margin-bottom, 24);
    .s2 {
      float: right;
    }
    .s1 {
      .px2rem(margin-left, 10);
      .px2rem(margin-right, 10);
    }
  }
}
.dl_right {
  width: 32%;
  height: 100%;
  display: flex;
  // align-items: center;
  .px2rem(margin-top, 24);
  .ban {
    width: 100%;
    .px2rem(height, 180);
    margin: 0 auto;
    img {
      width: 97%;
      height: 89%;
      border-radius: 4px;
    }
  }
}
.xiaodu {
  .lyou {
    .px2rem(height, 195);
    display: flex;
    justify-content: space-between;
  }
  .px2rem(height, 240);
  border-bottom: 1px solid #f3f3f3;
  .dl_left {
    h3 {
      .px2rem(font-size, 30);
      display: flex;
      .px2rem(line-height, 50);
      align-items: center;
    }
  }
  p {
    .px2rem(font-size, 24);
    color: #959595;
    .s2 {
      float: right;
      .px2rem(margin-right, 10);
    }
    .s1 {
      .px2rem(margin-left, 10);
    }
  }
}
.guangg {
  .px2rem(height, 360);
  border-bottom: 1px solid #f3f3f3;
  h2 {
    .px2rem(margin-top, 15);
    .px2rem(font-size, 30);
    display: flex;
    .px2rem(line-height, 50);
    align-items: center;
  }
  ul {
    .px2rem(margin-top, 15);
    .px2rem(height, 167);
    border: 1px solid #f3f3f3;
    display: flex;
    justify-content: space-between;
    li {
      width: 32%;
      height: 100%;
      border: 1px solid #f3f3f3;
    }
  }
  p {
    .px2rem(font-size, 24);
    color: #6d7278;
    .px2rem(height, 80);
    .px2rem(line-height, 80);
    font-family: Roboto-Regular, Roboto;
    .s2 {
      float: right;
      .px2rem(margin-right, 10);
    }
    .s3 {
      border: 1px solid #f98b00;
      color: #f98b00;
      .px2rem(font-size, 30);
      border-radius: 2px;
      padding: 1px 3px;
    }
  }
}
.introduction {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.yinyuejie {
  border-bottom: 1px solid #f3f3f3;
  padding-bottom: 8px;
  h2 {
    .px2rem(padding-top, 16);
    .px2rem(font-size, 32);
    .px2rem(line-height, 50);
    // overflow: hidden;
    // text-overflow: ellipsis;
    // white-space: nowrap;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
  }
  ul {
    .px2rem(margin-top, 14);
    display: flex;
    justify-content: space-between;
    li {
      width: 32.5%;
      height: 80px;
      border: 1px solid #f3f3f3;
      border-radius: 5px;
    }
  }
  p {
    .px2rem(font-size, 24);
    color: #959595;
    margin-top: 8px;
    font-family: Roboto-Regular, Roboto;
    font-weight: 400;
    color: rgba(109, 114, 120, 1);
    .s2 {
      float: right;
      .px2rem(margin-right, 20);
    }
  }
}
.gg_game {
  .px2rem(height, 548);
  border-bottom: 1px solid #f3f3f3;
  h2 {
    .px2rem(margin-top, 15);
    .px2rem(font-size, 30);
    display: flex;
    .px2rem(line-height, 50);
    align-items: center;
  }
  .video {
    .px2rem(height, 390);
    .px2rem(margin-top, 15);
    border: 1px solid #f3f3f3;
  }
  p {
    .px2rem(font-size, 24);
    color: #959595;
    .px2rem(height, 80);
    .px2rem(line-height, 80);
    .s2 {
      float: right;
      .px2rem(margin-right, 10);
    }
    .s3 {
      border: 1px solid #f98b00;
      color: #f98b00;
      .px2rem(font-size, 30);
      border-radius: 2px;
      padding: 1px 3px;
      .px2rem(margin-right, 10);
    }
  }
}
.tiezipaihang {
  margin: 0 auto;
  width: 93%;
  dl {
    .px2rem(height, 125);
    border-bottom: 1px solid #f2f2f2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    dt {
      width: 10%;
      .pai {
        .px2rem(width, 40);
        .px2rem(height, 65);
        text-align: center;
        .px2rem(line-height, 65);
        color: #8b8b8b;
        .px2rem(font-size, 25);
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    dd {
      width: 90%;
      height: 100%;
      ul {
        height: 100%;
        li {
          .px2rem(line-height, 45);
        }
        li:first-child {
          display: flex;
          justify-content: space-between;
          p {
            width: 80%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .px2rem(font-size, 30);
          .px2rem(margin-top, 18);
          span {
            color: #ff8500;
          }
        }
        li:last-child {
          .px2rem(font-size, 24);
          color: #b9b9b9;
        }
        li span {
          float: right;
        }
      }
    }
  }
}
.yonghu {
  margin: 0 auto;
  width: 93%;
  dl {
    .px2rem(height, 125);
    border-bottom: 1px solid #f2f2f2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    dt {
      width: 10%;
      .pai {
        .px2rem(width, 40);
        .px2rem(height, 65);
        text-align: center;
        .px2rem(line-height, 65);
        color: #8b8b8b;
        .px2rem(font-size, 25);
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    dd {
      width: 90%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      p {
        display: flex;
        align-items: center;
        .px2rem(font-size, 26);
        span {
          display: inline-block;
          margin-right: 15px;
          .px2rem(width, 76);
          .px2rem(height, 76);
          border: 1px solid #f3f3f3;
          border-radius: 50%;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      ul {
        height: 100%;
        li {
          .px2rem(line-height, 45);
        }
        li:first-child {
          .px2rem(font-size, 30);
          .px2rem(margin-top, 18);
          color: #ff8500;
        }
        li:last-child {
          .px2rem(font-size, 24);
          color: #b9b9b9;
          span {
            float: right;
          }
        }
      }
    }
  }
}
.van-tabs--line /deep/ .van-tabs__wrap {
  position: fixed;
  z-index: 1;
  width: 100%;
  border-bottom: 1px solid #f6f6f6;
  // box-shadow: 0px 0px 5px 1px #f6f6f6;
}
.van-tabs__wrap--scrollable /deep/ .van-tab {
  flex-basis: 15% !important;
}
.elime {
  .px2rem(width, 550);
  margin: 0 auto;
  .px2rem(margin-top, 60);
  span {
    .px2rem(font-size, 28);
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: rgba(132, 132, 132, 1);
  }
  ol {
    li {
      .px2rem(height, 90);
      border-bottom: 1px solid #f6f6f6;
      display: flex;
      align-items: flex-end;
      input:first-child {
        width: 70%;
        .px2rem(height, 80);
        border: none;
        .px2rem(font-size, 30);
      }
      .buttona {
        width: 30%;
        .px2rem(height, 44);
        border: none;
        text-align: center;
        background: #fff;
        border-radius: 3px;
        color: #03a9f4;
        .px2rem(font-size, 25);
      }
    }
  }
}
/*button禁用时的背景颜色*/
button {
  background: #cccccc;
}
/*button可用时的背景颜色*/
.btnBg {
  background: #03a9f4;
}
.weixinbutton {
  .px2rem(width, 500);
  margin: 0 auto;
  button {
    width: 100%;
    .px2rem(height, 80);
    .px2rem(margin-top, 100);
    .px2rem(margin-bottom, 80);
    border: none;
    // background: #03a9f4;
    .px2rem(font-size, 36);
    color: #fff;
    border-radius: 2px;
  }
  p {
    .px2rem(margin-top, 20);
    .px2rem(font-size, 24);
    text-align: center;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
}
/deep/.van-list {
  margin-top: 45px;
}

.xuanshang {
  padding-left: 15px;
  padding-right: 15px;

  .xsh_item {
    display: flex;
    flex-direction: column;
    width: 100%;

    .title {
      font-size: 16px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .item_img {
      width: 100%;
      margin-top: 10px;
      img {
        width: 100%;
        height: 152px;
      }
    }
    .starttime {
      margin-top: 16px;
      margin-left: 40px;
      display: flex;
      flex-direction: column;
      span {
        font-size: 18px;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
      p {
        font-size: 16px;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-top: 6px;
      }
    }
    .xshjj {
      margin-top: 16px;
      margin-left: 40px;
      display: flex;
      flex-direction: column;

      span {
        font-size: 18px;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
      p {
        font-size: 18px;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        margin: 6px auto;
        width: 140px;
      }
      a {
        font-size: 12px;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        width: 210px;
        margin: 0 auto;
      }
    }
    .xuanshe_time {
      margin-top: 6px;
      display: flex;
      flex-direction: column;
      font-size: 14px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    .xuanshang_line {
      margin-top: 12px;
      height: 10px;
      background-color: rgba(244, 245, 247, 1);
      width: 100%;
      margin-bottom: 10px;
    }
    .task_xsh {
      margin-top: 16px;
      margin-left: 40px;
      margin-right: 40px;
      display: flex;
      flex-direction: column;
      span {
        font-size: 18px;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
      div {
        margin-top: 10px;
        width: 100%;
        height: 120px;
        background: rgba(244, 244, 244, 1);
        opacity: 0.6615000000000001;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        .xxx {
          width: 90%;
          height: 100px;

          word-wrap: break-word;
          font-size: 16px;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
      }
    }
  }
}
</style>
<style>
.van-pull-refresh {
  width: 100%;
}
.van-loading__spinner {
  margin: 0 auto;
}
.van-loading {
  text-align: center;
  background: transparent;
  z-index: 2;
  margin-top: 60px;
}
.van-list__placeholder {
  background: #fff;
  padding-bottom: 56px;
}
.van-tabs__line {
  width: 0px !important;
}
</style>