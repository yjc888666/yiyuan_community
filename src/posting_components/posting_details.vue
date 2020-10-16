<template>
  <div class="posting_details">
    <div class="ql-editor" v-html="dadada"></div>
  </div>
</template>
<script>
export default {
  name: 'posting_details',
  data() {
    return {
      dadada: '',
      str: ''
    }
  },
  methods: {
    info() {
      var id = this.$route.params.id
      // console.log(id)
      this.axios({
        method: 'post',
        url: this.GLOBAL.baseURL + '/forum/info',
        data: {
          id: id
        },
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
        console.log(res)
        this.dadada = res.data.pojo.content
        // this.content = res.data.pojo.content;
        // console.log(res)
      })
    }
    // getRecommend() {
    //   this.axios({
    // method: 'post',
    //     url: this.GLOBAL.baseURL + '/forum/recommend',
    //     data: {
    //       field: field
    //     },
    //     transformRequest: [
    //       function(data) {
    //         // console.log(data)
    //         let ret = ''
    //         for (let it in data) {
    //           ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    //         }
    //         return ret
    //       }
    //     ],
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //     }
    //   }).then(res => {
    //     console.log(res)
    //   })
    // }
  },
  created() {
    this.info()
  }
}
</script>

<style scoped lang="less">
.posting_details {
  img {
    width: 100% !important;
  }
}
</style>
