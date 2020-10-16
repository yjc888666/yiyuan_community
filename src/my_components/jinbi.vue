<template>
    <div class="setup">
        <div class="header">
            <div>
                <img src="../assets/fanhui.png" alt="" @click="fanhui">
            </div>
            <h2>金币中心</h2>
        </div>
        <div class="banner">
            <img src="../assets/jinbi1.png" alt="">
            <div class="post-ss">
            <div class="post-left">
            <img style="width:0.3rem" :src="GLOBAL.basesURL + gold.userhead" alt="">            
            </div>
            <p class="post-right">{{gold.score_num}}<i>金币</i></P>
            </div>
            <div class="post-s1">
            <!-- <a href="#" @click="handleSee">点击查看</a> -->
            <p @click="handleSee">点击查看</p>
            </div>
            <img src="../assets/myjinbi.png" alt="">
        </div>
        <div class="jinbirenwu">
            <h3>金币任务</h3>
            <dl>
                <dt><img src="../assets/jinbi2.png" alt=""></dt>
                <dd>
                    <div>
                        <p>邀请好友 
                            <!-- <img src="../assets/jinbi3.png" alt=""> -->
                            <!-- <span style="color:red">31元</span> -->
                        </p>
                        <span class="s1">首次邀请好友送1金币</span>
                    </div>
                    <button @click="handleInvitation">去邀请</button>
                </dd>
            </dl>
            <dl>
                <dt><img src="../assets/pic-0001.png" alt=""></dt>
                <dd>
                    <div>
                        <p>关注用户 <img src="../assets/pic-0009.png" alt="">
                            <span>+1金币</span>
                        </p>
                        <span class="s1">每天最多关注4次用户，完成{{comelist.attention_num}}/4次</span>
                    </div>
                    <button :disabled="comelist.attention_num==10?true:false" @click="hanlefollow">{{comelist.attention_num==4?'已完成':'去关注'}}</button>
                </dd>
            </dl>
            <dl>
                <dt><img src="../assets/pic-0002.png" alt=""></dt>
                <dd>
                    <div>
                        <p>点赞 <img src="../assets/pic-0009.png" alt="">
                            <span>+1金币</span>
                        </p>
                        <span class="s1">每天最多完成10次奖励，完成{{comelist.zan_num}}/10次</span>
                    </div>
                    <button :disabled="comelist.zan_num==10?true:false" @click="handlecomplete">{{comelist.zan_num>10?'已完成':'去完成'}}</button>
                </dd>
            </dl>
            <dl>
                <dt><img src="../assets/pic-0003.png" alt=""></dt>
                <dd>
                    <div>
                        <p>分享内容 <img src="../assets/pic-0009.png" alt="">
                            <span>+1金币</span>
                        </p>
                        <span class="s1">每日最多完成5次奖励，完成0/5次</span>
                    </div>
                    <button  @click="handlescompletes">去完成</button>
                </dd>
            </dl>
            <dl>
                <dt><img src="../assets/pic-0008.png" alt=""></dt>
                <dd>
                    <div>
                        <p>发表评论备份 <img src="../assets/pic-0009.png" alt="">
                            <span>+1金币</span>
                        </p>
                        <span class="s1">每日最多评论10次，完成{{comelist.commentadd_num}}/10次</span>
                    </div>
                    <button :disabled="comelist.commentadd_num==10?true:false"  @click="handlePublish">{{comelist.commentadd_num==10?'已完成':'去完成'}}</button>
                </dd>
            </dl>
            
        </div>
        <div class="jinbiren">
            <h3>文章收益</h3>
            <dl>
                <dt><img src="../assets/pic-0006.png" alt=""></dt>
                <dd>
                    <div>
                        <p>发布文章 <img src="../assets/pic-0009.png" alt="">
                            <span>+700金币</span>
                        </p>
                    </div>
                    <button @click="handlearticle">去完成</button>
                </dd>
            </dl>
            <dl>
                <dt><img src="../assets/pic-0007.png" alt=""></dt>
                <dd>
                    <div>
                        <p>上热榜 <img src="../assets/pic-0009.png" alt="">
                            <span>1金币</span>
                        </p>
                        <span class="s1">持续是那个热榜3天可增加1金币</span>
                    </div>
                    <button>去完成</button>
                </dd>
            </dl>
            
        </div>
        <div class="jinbi">
            <h3>积分兑换商城</h3>
            <dl>
                <dt><img src="../assets/pic-0005.png" alt=""></dt>
                <dd>
                    <div>
                        <p>商城</p>
                    </div>
                    <button>点击进入</button>
                </dd>
            </dl>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'setup',
     data() {
    return {
      comelist: {},//点赞数量 关注数量 评论数量
      gold:{},//金币
    };
  },
    methods: {
        fanhui() {
            this.$router.push({
                path: '/my'
            })
        },
        handleInvitation() {
             this.$router.push({
                path: '/vitation'
            })
        },
        handleSee() {
            this.$router.push({
                path: '/account'
            })
        },
        handlecomplete(){
            this.$router.push({
                path: '/onepage'
            })
        },
        handlescompletes(){
            this.$router.push({
                path: '/onepage'
            })
        },
        handlePublish() {
             this.$router.push({
                path: '/onepage'
            })
        },
        handlearticle() {
             this.$router.push({
                path: '/release'
            })
        },
        hanlefollow() {
             this.$router.push({
                path: '/onepage'
            })
        },
          // 邀请
      async handleIncomelist() {
        var id = { id: localStorage.getItem("userid") };
      const res = await axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/user/info",
        data:id
      })
      this.comelist = res.data.pojo
        // console.log(this.comelist)
      },
      // 分享
       async handleshare() {
      const res = await axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/pointNote/share",
      })
      //   this.comelist = res.data.pojo
        // console.log(this.comelist)
        // console.log(res)
    },
     // 现金收益
      async goldcoin() {
      var id = { id: localStorage.getItem("userid") };
      const res = await axios({
        method: "post",
        url: this.GLOBAL.baseURL + "/user/info",
        data: id
      })
        this.gold = res.data.pojo
        
        console.log(this.gold)
        console.log(this.gold.score_num)
    },
    },
     created() {
        this.handleIncomelist();//邀请
        // this.handleshare();//分享
        this.goldcoin();//金币
    }
    }
</script>

<style scoped lang="less">
.px2rem(@name, @px) {
    @{name}: @px / 75 * 1rem;
}
.setup {
    background: #F4F5F7;    
}
.header {
    width: 100%;
    .px2rem(height, 110);
    background: #fff;
    border-bottom: 1px solid #f6f6f6;
    box-shadow: 0px 0px 5px 1px #f6f6f6;
    display: flex;
    align-items: center;
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
    h2 {
        text-align: center;
        .px2rem(padding-right, 100);
        flex: 1;
        .px2rem(font-size, 38);
        font-weight: 400;
    }
}

.banner {
    position:relative;
    background: #F4F5F7;
    .px2rem(padding-bottom, 20);
    img:first-child {
        width: 100%;
        .px2rem(margin-bottom, 15);
    }
    img:last-child {
        display: block;
        width: 90%;
        margin: 0 auto;
    }
}
.post-ss {
    position:absolute;
    .px2rem(width, 149);    
    .px2rem(height, 28);    
    background:rgba(255,255,255,1);
    .px2rem(border-radius, 14);
    .px2rem(left,52);       
    .px2rem(top,25);
    .px2rem(padding, 5); 
    .px2rem(line-height, 28);           
    color: #F94E2B;   
    display:flex;
    img {
    .px2rem(width, 25);    
    .px2rem(height, 25); 
    padding-top: 2px;
    border-radius: 5px;
    }     
    .post-left{
    float:left;
    }  
    .post-right {
    float:right;
    .px2rem(padding-left, 4);           
    }
    p {
    // .px2rem(font-size, 2);  
    font-size: 10px;              
    }
    i {
    font-style:normal;
    color:#000;                  
    }
}
.post-s1 {
    position: absolute;
    .px2rem(width, 181);    
    .px2rem(height, 42);
    background:rgba(221,59,0,1);
    .px2rem(border-radius, 21);
    .px2rem(left,52);       
    .px2rem(top,240);
    p {
    color:#FFFFFF;
    .px2rem(font-size, 29);
    .px2rem(padding-left, 31);
    .px2rem(padding-top, 2);
    }               
}
.jinbirenwu {
    background: #fff;
    h3 {
        .px2rem(font-size, 29);
        .px2rem(padding-left,30);
        .px2rem(line-height,90)
    }
    dl {
        display: flex;
        .px2rem(height,115);
        
        dd {
            border-bottom: 1px solid #f3f3f3;
            .px2rem(margin-right, 20);
            width: 85%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            div {
                .s1 {
                    .px2rem(font-size, 21)
                }
                p {
                    display: flex;
                    align-items: center;
                    .px2rem(font-size, 25);
                    span {
                        color: #FA6400;
                    }
                    img {
                        .px2rem(margin-left, 20);
                        .px2rem(margin-right, 20);
                        .px2rem(width, 35);
                        .px2rem(height, 40)
                    }
                }
            }
            button {
                .px2rem(width, 120);
                .px2rem(height, 45);
                border: 1px solid #FA6400;
                background: #fff;
                color:#FA6400;
                .px2rem(border-radius,45);
                
            }
        }
        dt {
            width: 15%;
            display: flex;
            align-items: center;
            img {
                display: block;
                margin: 0 auto;
                .px2rem(width, 67);
                .px2rem(height, 67)
            }
        }
    }
}

.jinbiren {
    background: #fff;
    .px2rem(margin-top,20);                  
    h3 {
        .px2rem(font-size, 29);
        .px2rem(padding-left,30);
        .px2rem(line-height,90)
    }
    dl {
        display: flex;
        .px2rem(height,115);
        
        dd {
            border-bottom: 1px solid #f3f3f3;
            .px2rem(margin-right, 20);
            width: 85%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            div {
                .s1 {
                    .px2rem(font-size, 21)
                }
                p {
                    display: flex;
                    align-items: center;
                    .px2rem(font-size, 25);
                    span {
                        color: #FA6400;
                    }
                    img {
                        .px2rem(margin-left, 20);
                        .px2rem(margin-right, 20);
                        .px2rem(width, 35);
                        .px2rem(height, 40)
                    }
                }
            }
            button {
                .px2rem(width, 120);
                .px2rem(height, 45);
                border: 1px solid #FA6400;
                background: #fff;
                color:#FA6400;
                .px2rem(border-radius,45);
                
            }
        }
        dt {
            width: 15%;
            display: flex;
            align-items: center;
            img {
                display: block;
                margin: 0 auto;
                .px2rem(width, 67);
                .px2rem(height, 67)
            }
        }
    }
}
.jinbi {
    background: #fff;
    .px2rem(margin-top,20);
    h3 {
        .px2rem(font-size, 29);
        .px2rem(padding-left,30);
        .px2rem(line-height,90)
    }
    dl {
        display: flex;
        .px2rem(height,115);
        
        dd {
            border-bottom: 1px solid #f3f3f3;
            .px2rem(margin-right, 20);
            width: 85%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            div {
                .s1 {
                    .px2rem(font-size, 21)
                }
                p {
                    display: flex;
                    align-items: center;
                    .px2rem(font-size, 25);
                    span {
                        color: #FA6400;
                    }
                    img {
                        .px2rem(margin-left, 20);
                        .px2rem(margin-right, 20);
                        .px2rem(width, 35);
                        .px2rem(height, 40)
                    }
                }
            }
            button {
                .px2rem(width, 120);
                .px2rem(height, 45);
                border: 1px solid #FA6400;
                background: #fff;
                color:#FA6400;
                .px2rem(border-radius,45);
                
            }
        }
        dt {
            width: 15%;
            display: flex;
            align-items: center;
            img {
                display: block;
                margin: 0 auto;
                .px2rem(width, 67);
                .px2rem(height, 67)
            }
        }
    }
}
</style>
