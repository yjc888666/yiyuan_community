<template>
    <div class="postong">
        <!-- <div class="toui">
            <div class="geqian">
                <dl>
                    <dt>
                        <div class="tu"><img style="object-fit: cover;" :src="this.GLOBAL.basesURL+userhead != this.GLOBAL.basesURL?this.GLOBAL.basesURL+userhead:require('../assets/moren.jpg')" preview="1" preview-text="" alt="">
                        <span>{{subject_type}}</span></div>
                    </dt>
                    <dd>
                        <h1></h1>
                        <ol>
                            <li>
                                <p>关注</p>
                                <span>{{follow}}</span>
                            </li>
                            <li>
                                <p>粉丝</p>
                                <span>{{fans}}</span>
                            </li>
                            <li>
                                <p>获赞</p>
                                <span>{{zan}}</span>
                            </li>
                        </ol>
                    </dd>
                </dl>
            </div>
        </div> -->
        <div class="gongneng">
            <dl @click="caogao">
                <dt><img src="../assets/cg.png" alt=""></dt>
                <dd>草稿箱</dd>
            </dl>
            <dl @click="fabu">
                <dt><img src="../assets/fb.png" alt=""></dt>
                <dd>文章发布</dd>
            </dl>
            <dl @click="lishifabu">
                <dt><img src="../assets/ls.png" alt=""></dt>
                <dd>历史发布</dd>
            </dl>
        </div>
        <!-- <div class="shezhi">
            <ul>
                <li>
                    <p><img src="../assets/qian.png" alt="">消息通知</p>
                    <span>></span>
                </li>
            </ul>
        </div> -->
    </div>
</template>
<script>
export default {
    name: 'index',
    data() {
        return {
            userhead: "",
            zan:'',
            follow:'',
            fans:'',
            subject_type:''
        }
    },
    methods: {
        caogao() {
            this.$router.push({
                path: '/caogao'
            })
        },
        fabu() {
            this.$router.push({
                path:'/release'
            })
        },
        lishifabu() {
            this.$router.push({
                path: '/history_release'
            })
        },
        info() {
            var id = { id: localStorage.getItem('userid') }
            this.$axios({
                method: 'post',
                url: this.GLOBAL.baseURL + '/settled/get',
                data: id
            }).then((res) => {
                if (res.data.result) {
                    this.userhead = res.data.pojo.account_img;
                    this.zan = res.data.pojo.zan;
                    this.fans = res.data.pojo.fans;
                    this.follow = res.data.pojo.follow;
                    if(res.data.pojo.subject_type == 1){
                        this.subject_type = '个人'
                    }else if(res.data.pojo.subject_type == 2){
                        this.subject_type = '媒体'
                    }else if(res.data.pojo.subject_type == 3){
                        this.subject_type = '群媒体'
                    }else if(res.data.pojo.subject_type == 4){
                        this.subject_type = '企业'
                    }else if(res.data.pojo.subject_type == 5){
                        this.subject_type = '机构'
                    }else if(res.data.pojo.subject_type == 6){
                        this.subject_type = '其他组织'
                    }else if(res.data.pojo.subject_type == 7){
                        this.subject_type = '政府'
                    }
                }else{
                    this.$toast(res.data.msg);
                }
            })
        }
    },
    created() {
        this.info();
    }
}
</script>
<style scoped lang="less">
.px2rem(@name, @px) {
    @{name}: @px / 75 * 1rem;
}

.shezhi {
    background: #fff;
    ul {
        width: 90%;
        margin: 0 auto;
        li {
            .px2rem(height, 95);
            border-bottom: 1px solid #f3f3f3;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .px2rem(font-size, 25);
            p {
                display: flex;
                align-items: center;
            }
            img {
                .px2rem(width, 32);
                .px2rem(height, 32);
                .px2rem(margin-right, 30)
            }
            span {
                .px2rem(width, 30);
                .px2rem(height, 30);
                .px2rem(font-size, 30);
            }
        }
    }
}

.tutu {
    position: absolute;
    overflow: hidden;
    width: 100%;
    z-index: -1;
    .px2rem(height, 420);
    .mo {
        width: 100%;
        height: 100%;
        position: absolute;
        background: rgba(0, 0, 0, 0.3);
    }
    img {
        position: absolute;
        width: 100%;
        z-index: -5;
        filter: blur(5px);
        top: -50px;
    }
}

.postong {
    position: absolute;
    z-index: -1000; // color: #fff; 
    width: 100%;
    height: 100vh;
    background: #f3f3f3;

    .xiaoxi {
        width: 100%;
        .px2rem(height, 100);
        display: flex;
        align-items: center;
        justify-content: flex-end;
        dl {
            .px2rem(margin-right, 40);
            dt {
                .px2rem(width, 40);
                img {
                    width: 100%;
                }
            }
        }
    }
    .geqian {
        background: #fff;
        .px2rem(height, 256);
        overflow: hidden;
        dl {
            display: flex;
            align-items: center;
            .px2rem(margin-top, 100);
            dt {
                width: 28%;
                .tu {
                    
                    margin: 0 auto;
                    .px2rem(width, 120);
                    .px2rem(height, 120);
                    
                    border: none;position: relative;
                    overflow: hidden;
                    img {
                        width: 100%;
                        height: 100%;border-radius: 50%;
                    }
                }
                span {
                    display: block;
                    .px2rem(width, 35);
                    .px2rem(height, 35);
                    position: absolute;
                    z-index: 10000000;
                    right: 0;
                    bottom: 0;
                    border-radius: 50%;
                    color: #fff;
                    background: #ff870f;
                    .px2rem(font-size,14);
                    text-align: center;
                    .px2rem(line-height,35)
                }
            }
            dd {
                width: 72%;
                .px2rem(padding-right, 40);
                h1 {
                    .px2rem(font-size, 38);
                    .px2rem(line-height, 80)
                }
                ;
                ol {
                    align-items: center;
                    display: flex;
                    li {
                        .px2rem(font-size, 26);
                        display: flex;
                        p {
                            .px2rem(margin-right, 5)
                        }
                        .px2rem(margin-right, 20);
                        span {
                            color: #03A9F4;
                        }
                    }
                }
            }
        }
    } // .grcenter_nav{
    //     .px2rem(height,170);
    //     ul{
    //         height: 100%;
    //         align-items: center;
    //         display: flex;
    //         justify-content: space-around;
    //         li{
    //             .px2rem(font-size,26);
    //             text-align: center;
    //             span{
    //                 display: block;
    //                 .px2rem(margin-bottom,10);
    //                 color: #03A9F4;
    //             }
    //         }
    //     }
    // }
    .gongneng {
        background: #fff;
        display: flex;
        justify-content: space-around;
        .px2rem(height, 225);
        align-items: center;
        border-bottom: 10px solid #f3f3f3;
        border-top: 10px solid #f3f3f3;
        dl {
            dt {
                .px2rem(width, 70);
                .px2rem(height, 70);
                margin: 0 auto;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            ;
            dd {
                text-align: center;
                .px2rem(line-height, 65);
                .px2rem(font-size, 25);
            }
        }
    }
}
</style>