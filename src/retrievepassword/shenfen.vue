<template>
    <div id="shenfen">
        <div class="header">
            <div>
                <img src="../assets/fanhui.png" alt="" @click="fanhui">
            </div>
            <h2>身份验证</h2>
        </div>
        <ul>
            <li class="li">安全校验手机号:</li>
            <li><input type="text" v-model="shoujihao"></li>
            <li class="li">验证码：</li>
            <li><input type="text" v-model="code"></li>
            <li><button @click="queding">确定</button></li>
        </ul>
        
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'shenfen',
    data() {
        return {
            shoujihao:localStorage.getItem('shoujihao'),
            code:''
        }
    },
    methods:{
        fanhui(){
            this.$router.push({
                path:'/zhanghao'
            })
        },
        queding(){
            this.$axios({
                method: 'post',
                url: this.GLOBAL.baseURL + '/user/pwdsetreceive',
                data: {
                    pushmail:this.shoujihao,
                    code:this.code
                },
                transformRequest: [
                    function(data) {
                        console.log(data)
                        let ret = '';
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
                        }
                        return ret;
                    }
                ],
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).then((res)=>{
                if(res.data.result){
                    localStorage.setItem('jiami',res.data.pojo);
                    this.$router.push({
                        path:'/xinmima'
                    })
                }else{
                    this.$toast(res.data.msg);
                }
                
            })
        }
    }

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
}
ul{
    width: 70%;
    margin: 0 auto;
    li:last-child{
        border: none;
        .px2rem(margin-top,50);
    }
    .li{
        border: none;
        .px2rem(margin-top,50);
    }
    li{
        .px2rem(height,40);
        .px2rem(font-size, 28);
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
            background: #03A9F4;
            .px2rem(height,80);
            border-radius: 2px;
            color: #fff;
            font-size: 14px;
        }
    }
}
</style>