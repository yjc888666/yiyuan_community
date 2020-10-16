<template>
  <div>
    <!-- 导航头部 -->
    <div class="handleffg">
      <img src="../assets/tops.png" alt @click="$router.back()" />
    </div>
    <p></p>
    <!-- 搜索框 -->
    <van-search v-model="searchText" placeholder="请输入搜索关键词" show-action @cancel="$router.back()" @search="handleSearch(searchText)" background="#03A9F4">
      <div class="search" slot="action" @click="onSearch(searchText)">搜索</div>
    </van-search>
    <!-- 搜索框 -->
    <!-- 联想建议 -->
    <van-cell-group v-if="suggestions.length && searchText.length">
      <van-cell v-for="item in suggestions" :key="item.index" icon="search" @click="handleSearch(item)">
        <div slot="title" v-html="highlight(item.title, searchText)"></div>
      </van-cell>
    </van-cell-group>
    <!-- 联想建议 -->

    <!-- 历史记录 -->
    <van-cell-group v-if="searchHistories.length >0">
      <van-cell title="历史记录" style="font-size:16px;">
        <van-icon v-show="searchHistories.length >0" slot="right-icon" name="delete" style="line-height: inherit;" @click="delAll" size="16px" />

      </van-cell>

    </van-cell-group>
    <!-- /历史记录 -->
    <div class="historyList">
      <div v-for="(item,index) in searchHistories" :key="index">
        <span @click="onSearch(item)"> {{item}}</span>
        <p @click="delSearchHistories(index)"> ×</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
  name: 'search',
  data() {
    return {
      searchText: '', // 输入的搜索文本内容
      suggestions: [],
      isDeleteShow: false, // 控制删除的显示状态
      searchHistories: [] // 存储搜索历史记录
    }
  },

  watch: {
    // searchText: function(text) {
    //   // 去除首尾空格
    //   text = text.trim()
    //   // 非空判断
    //   if (!text.length) {
    //     return
    //   }
    //   // 请求获取搜索建议
    //   try {
    //     var date = {
    //       title: this.searchText
    //     }
    //     this.$axios({
    //       method: 'post',
    //       url: this.GLOBAL.baseURL + '/forum/findbykey',
    //       data: date
    //     }).then(res => {
    //       this.suggestions = res.data.pojo.list
    //     })
    //   } catch (err) {
    //     // console.log(err);
    //   }
    // },
    // searchHistories() {
    //   const data = JSON.stringify(this.searchHistories)
    //   console.log(data)
    //   window.localStorage.setItem('serach-histories', data)
    // }
  },
  methods: {
    delAll() {
      Dialog.confirm({
        message: '是否删除全部的搜索历史记录？'
      })
        .then(() => {
          this.searchHistories = []
          localStorage.removeItem('searchHistories')
        })
        .catch(() => {
          // on cancel
        })
    },
    highlight(text, keyword) {
      return text
        .toLowerCase()
        .split(keyword)
        .join(`<span style="color: red">${keyword}</span>`)
    },
    onSearch(e) {
      if (e == '') {
        this.$toast('请输入内容后搜索')
      } else {
        if (
          this.searchHistories.some(val => {
            return val == e
          })
        ) {
        } else {
          this.searchHistories.unshift(e)
          localStorage.setItem('searchHistories', JSON.stringify(this.searchHistories))
        }

        this.$router.push({
          path: '/searchresult',
          query: {
            searchContent: e
          }
        })
      }
    },
    handleSearch(queryText) {
      console.log(queryText)
      this.searchHistories.unshift(queryText)

      localStorage.setItem('searchHistories', JSON.stringify(this.searchHistories))
      // 跳转到搜索结果页面
      this.$router.push({
        path: '/searchresult',
        query: {
          searchContent: this.searchText
        }
      })
    },
    handleSe(queryText) {
      // console.log(queryText);
      // window.localStorage.setItem("query", queryText);
      window.localStorage.setItem('querytitle', queryText)
      this.$router.push({
        path: '/searchresult'
      })
    },
    delSearchHistories(e) {
      this.searchHistories.splice(e, 1)
      localStorage.setItem('searchHistories', JSON.stringify(this.searchHistories))
    }
  },
  created() {
    if (localStorage.getItem('searchHistories')) {
      this.searchHistories = JSON.parse(localStorage.getItem('searchHistories'))
    }
  }
}
</script>

<style scoped lang="less">
.px2rem(@name,@px) {
  @{name}: @px / 75 * 1rem;
}
.handleffg {
  position: absolute;
  img {
    position: relative;
    .px2rem(width, 50);
    margin: 0 auto;
    top: 15px;
    right: -6px;
  }
}

.van-search/deep/.van-search__content {
  border-radius: 4px;
  margin-left: 30px;
}
.search {
  color: #fff;
  .px2rem(font-size, 32);
}

//
.historyList {
  display: flex;
  padding: 0 20px;
  flex-direction: column;

  div {
    width: 100%;
    font-size: 17px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    // display: -webkit-box;
    color: rgba(51, 51, 51, 1);
    // overflow: hidden;
    // -webkit-line-clamp: 1;
    // -webkit-box-orient: vertical;

    p {
      width: 30px;
      font-size: 18px;
      font-weight: bold;
    }
  }
}
</style>