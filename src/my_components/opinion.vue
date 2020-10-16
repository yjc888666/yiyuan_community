<template>
    <div class="setup">
        <div class="header">
            <div>
                <img src="../assets/fanhui.png" alt="" @click="fanhui">
            </div>
            <h2>意见反馈</h2>
        </div>
        <div class="jichu">
            <ul>
                <li @click="opinionone">
                    <span>如何通过发文获得收益</span>
                </li>
                <li @click="opiniontwo">
                    <span>我想发表内容</span>
                </li>
                <li @click="opinionthree">
                    <span>我想身份/兴趣认证</span>
                </li>
                <li @click="opinionfour">
                    <span>不喜欢推荐的文章/视频</span>
                </li>
                <li @click="opinionfive">
                    <span>我要举报文章/视频</span>
                </li>
                <li @click="opinionsix">
                    <span>无法修改昵称/上传头像</span>
                </li>
                <li @click="opinionseven">
                    <span>图文推荐机制是神？如何提高阅读量？</span>
                </li>
            </ul>
        </div>
        <div class="footer" @click="myfankui">
            <p>我的反馈</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'setup',
    methods:{
        fanhui(){
           this.$router.push({
                path:'/my'
            }) 
        },
        myfankui(){
            this.$router.push({
                path: '/myfankui'
            })
        },
       opinionone(){
           this.$router.push({
                path: '/opinionone'
            })
       },
       opiniontwo(){
           this.$router.push({
                path: '/opiniontwo'
            })
       },
       opinionthree(){
           this.$router.push({
                path: '/opinionthree'
            })
       },
       opinionfour(){
           this.$router.push({
                path: '/opinionfour'
            })
       },
       opinionfive(){
           this.$router.push({
                path: '/opinionfive'
            })
       },   
       opinionsix(){
           this.$router.push({
                path: '/opinionsix'
            })
       },
       opinionseven(){
           this.$router.push({
                path: '/opinionseven'
            })
       },
    },
}
</script>

<style scoped lang="less">
.px2rem(@name,@px){
@{name}:@px / 75 * 1rem;
}
.footer{
    width: 100%;
    position: fixed;
    bottom: 0;
    .px2rem(height,80);
    background: #fff;
    p{
        .px2rem(line-height,80);
        text-align: center;
        .px2rem(font-size,28)
    }
}
.setup{
    width: 100%;
    height: 100vh;
    background: #f3f3f3;
    div{
        background: #fff;
        
        ul{
            li{
                width: 92%; 
                margin: 0 auto;
                border-bottom: 1px solid #f3f3f3;
                .px2rem(line-height,82);
                .px2rem(font-size,23)
            }
            li:last-child{
                border:none;
            }
        }
    }
    .jichu,.xiaoxi,.banben,.guanggao {
        border-top: 10px solid #f3f3f3;
    }
    .tuichu{
        .px2rem(height,80);
        border-top: 30px solid #f3f3f3;
        p{
            width: 100%;
            text-align: center;
            .px2rem(font-size,27);
            color: #F73635;
            .px2rem(line-height,80);
        }
    }
}
.header{
     width: 100%;
     .px2rem(height,110);
     background: #fff;
     border-bottom: 1px solid #f6f6f6;
     box-shadow:0px 0px  5px 1px #f6f6f6;
     display: flex;
     align-items: center;
     div{
       .px2rem(width,100);
       .px2rem(height,50);
       display: flex;
       align-items: center;
       img{
         .px2rem(width,35);
         margin: 0 auto;
       }
     }
     h2{
       text-align: center;
       .px2rem(padding-right,100);
       flex: 1;
       .px2rem(font-size,38);
       font-weight: 400;
    }
  }
</style>
