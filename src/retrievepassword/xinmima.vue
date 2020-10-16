<template>
    <div id="shenfen">
        <div class="header">
            <div>
                <img src="../assets/fanhui.png" alt="" @click="fanhui">
            </div>
            <h2>设置新密码</h2>
        </div>
        <ul>
            <li>请输入您要设置的密码：</li>
            <li><input type="password" v-model="mima"></li>
            <li><button :disabled="State==false" :class="{btnBg:State}" @click="queding">确定</button></li>
        </ul>
        
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'shenfen',
    data() {
        return {
            mima:'',
      disabled: false
        }
    },
    methods:{
        fanhui(){
            this.$router.push({
                path:'/shenfen'
            })
        },
        queding(){
            this.$axios({
                method: 'post',
                url: this.GLOBAL.baseURL + '/user/pwdset',
                data: {
                    password:this.mima,
                    byteid:localStorage.getItem('jiami')
                },
                
            }).then((res)=>{
                if(res.data.result){
                    // this.isshow = true;
                    this.$toast(res.data.msg);
                    this.$router.push({
                        path:'/land'
                    })
                }else{
                    this.$toast(res.data.msg);
                }
                
            })
        }
    },
      computed: {
    State() {
      return this.mima !== "";
    }
  },

}
</script>
<style scoped lang="less">
.px2rem(@name, @px) {
    @{name}: @px / 75 * 1rem;
}
.header {
    width: 100%;
    .px2rem(height, 110);
    border-bottom: 1px solid #f6f6f6;
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
        .px2rem(font-size, 35);
        font-weight: 400;
    }
}ul{
    width: 70%;
    margin: 0 auto;
    li:last-child{
        border: none
    }
    li:first-child{
        border: none
    }
    li{
        .px2rem(font-size, 28);
        .px2rem(height,60);
        .px2rem(margin-top,30);
        border-bottom: 1px solid #f3f3f3;
        display: flex;
        align-items: center;
        input{
            width: 100%;
            border: none;
            
        }
        button{
            width: 100%;
            border: none;
            .px2rem(height,80);
        .px2rem(font-size, 32);
            border-radius: 2px;
            color: #fff;
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
</style>