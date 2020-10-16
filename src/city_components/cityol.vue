<template>
    <div class="box">
        <ol :class="{'dsds':olds}">
            <li v-for="(val,b,index) in citymainList.cities" :key="index"
                @click="clickHandler(index)"
                @touchstart="touchstartHander(index,$event)"
                @touchmove.prevent ="touchmoveHander"
                @touchend= "handleTouchEnd"
			>
            {{b}}</li>
        </ol>
    </div>
</template>

<script>
export default {   
    name:"cityol", 
    props:['citymainList'],
    data(){
        return{
            touchstart:false,
            timer:null,
            startindex:0,
            startY:0,
            curindex:0,
            olds:false
        }
    },
    methods:{
        clickHandler:function(e){
            //发送索引到组件的父级
            this.$emit('passindex',e)
        },
        touchstartHander:function(index,evt){				
            //记录用户开始滑动时的位置 和索引
            this.startindex=index;
            console.log(index,evt);
            this.startY=evt.touches[0].clientY;
            this.olds = true;
        },
        touchmoveHander:function(evt){
            //滑动过程中根据手指的位置判断 手指所在的位置
            var cha=evt.touches[0].clientY-this.startY;
            console.log(cha)
            if(cha>0){
                //用户在向下滑动
                var chaindex=Math.ceil(cha/20);					
            }else{
                //用户在向上滑动
                var chaindex=Math.floor(cha/20);	
            }
                //用户现在手指所处位置的索引值
            this.curindex=parseInt(this.startindex)+parseInt(chaindex);	

            this.$emit('passalpindex',this.curindex);
            
        },
        handleTouchEnd () {
            this.olds = false
            // 手指离开
        }
    }
}
</script>

<style scoped lang="less">
    .px2rem(@name,@px){
        @{name}:@px / 75 * 1rem;
    }
    ol{
        position: fixed;
        right: 0;
        top: 60%;
        margin-top: -240px;
        z-index: 10;
        .px2rem(width,45);
        li{
            width: 100%;
            text-align: center;
            color: #03a9f4;
            height: 20px;
        }
    }
    .dsds{
        background: rgba(0, 0, 0,0.3)
    }
</style>
