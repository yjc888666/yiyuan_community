<template>
<div class="sousuo" v-show="isshow">
    <div class="zhanshis">
        <div>
            <p v-show="show">暂无您搜索的城市</p>
            <ul v-show="!show">
                <li v-for="(item,index) in NewItems" :key="index" @click="tiao(item.name,item.id)">{{item.name}}</li>
            </ul>
        </div>
    </div>
</div>
    
</template>

<script>
import Bscroll from 'better-scroll'
export default {
    name:"citysousuo", 
    props:['citymainList'],
    data(){
        return{
            NewItems:[],
            isshow:false,
            show:false
        }
    },
    computed:{
        fon(){
            return this.$store.state.sousuo
        }
    },
    methods:{
        tiao(city,id){
            console.log(city,id)
            this.$store.commit('changecity', city);
            localStorage.setItem('cityid',id);
            //存储到本地
            localStorage.setItem('changecity', city);
            //跳转
            this.$router.push({ path: '/' });
            this.$toast(city);
        }
    },
    watch:{
        fon(a){
            
            var nameArr = [];
            var spellArr = [];
            var NewItem = [];
            for(var i in this.citymainList.cities) {
                this.citymainList.cities[i].forEach((val)=>{
                    nameArr.push(val)
                    spellArr.push(val.pinyin)
                });
            }
            // console.log(nameArr,spellArr)
            // console.log(arr)
            // arr.forEach((val)=>{
            //     console.log(val);
            // });
            nameArr.map((item)=>{
                if (item.name.search(a) != -1) {
                    NewItem.push(item);
                }	//返回判断条件为真的数组元素
            })
            spellArr.map((item,index)=>{
                if (item.search(a) != -1) {
                    NewItem.push(nameArr[index]);
                }	//返回判断条件为真的数组元素
            })
            this.NewItems = NewItem;
            // console.log(NewItem)
            if(a == ""){
                this.isshow = false
            }else{
                this.isshow = true
            }
            if(this.NewItems.length < 1){
                this.show = true
            }else{
                this.show = false
            }
        }
    }
}
</script>

<style scoped lang="less">
    .px2rem(@name,@px){
        @{name}:@px / 75 * 1rem;
    }
    .sousuo{
        position: fixed;
        width: 100%;
        min-height: 100vh;
        .px2rem(top, 180);
        background: #fff;
        z-index: 100000;
    }
    .zhanshis{
    }
    ul li{
        .px2rem(height, 72);
        border-bottom: 1px solid #eeeeee;
        .px2rem(font-size, 27);
        .px2rem(line-height, 75);
        .px2rem(padding-left, 15);
    }
</style>
