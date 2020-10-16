<template>
    <div class="grcenter_model"  @click.self="dsds">
        <div class="footer">
            <ul>
                <li><textarea type="text" v-model="items" ref="count" onfocus="this.placeholder=''" onblur="this.placeholder='请输入介绍'"   placeholder="请输入介绍"></textarea><span>{{number}}/20</span></li>
                <li><button :disabled="State==false" :class="{btnBg:State}" @click="gai">确定</button></li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'model',
    data () {
        return {
            number: 0,
            items:this.$store.state.msgtwo == '待完善' || this.$store.state.msgtwo == ''?'':this.$store.state.msgtwo
        }
    },
     computed:{
        State(){
           return this.items!==""
       }
   },
    methods:{
        dsds(){
            this.$store.commit('isuserheads',false)
        },
        bbb(){
            this.number = this.$refs.count.value.length;
        },
        gai(){
            var description = {description:this.items,name:this.$store.state.msg,userhome:localStorage.getItem('msgfive'),sex:this.$store.state.msgthree == '男'?1:0,birthday:this.$store.state.msgfour}
            this.$axios({
                method: 'post',
                url: this.GLOBAL.baseURL+'/user/edit',
                data: description
            }).then((res)=>{
                this.$toast(res.data.msg == '操作成功！'?'修改成功':res.data.msg);
                if(res.data.result){
                        this.$store.commit('msgtwo',this.items == ''?'待完善':this.items);
                        localStorage.setItem('msgtwo',this.items == ''?'待完善':this.items);
                        this.$store.commit('isuserheads',false);
                    }
            })
        }
    },
    directives: {	    
        focus: {	        
            inserted: function (el, {value}) {            
                if (value) {	                
                el.focus();	            
                }	        
            }	    
        }	
    },
    watch:{   //watch()监听某个值（双向绑定）的变化，从而达到change事件监听的效果
        items(a,b){
                var _this = this;
                var _sum = 20; //字体限制为100个
                _this.$refs.count.setAttribute("maxlength",_sum);
                _this.number= _this.$refs.count.value.length;
        }
    }
}
</script>
<style scoped lang="less">
  .px2rem(@name,@px){
    @{name}:@px / 75 * 1rem;
  }
  .grcenter_model{
    width: 100%;
    height: 100%;
    z-index: 1000;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5)
  }
  .footer{
    width: 100%;
    .px2rem(height,300);
    background: #F1F1F1;
    position: fixed;
    bottom: 0;
    ul{
      overflow: hidden;
      width: 95%;
      margin: 0.3rem auto;
      li:last-child{
        display: flex;
        align-items: center;
        justify-content: flex-end;
          .px2rem(margin-top,70);
      }
      li{
        .px2rem(height,80);
        textarea{
          position: relative;
          width: 93%;
          .px2rem(padding-left,20);
          .px2rem(padding-right,20);
          .px2rem(padding-top,20);
          .px2rem(padding-bottom,50);
          background:rgba(255,255,255,1);
          .px2rem(font-size,32);
          border-radius:4px;
          resize: none;
          border:1px solid rgba(204,204,204,1);
        }
        span{
            .px2rem(font-size,24);
            position: absolute;
            right: 18px;
            color: #999999;
            .px2rem(top,130);
        }
        button{
          .px2rem(width,100);
          .px2rem(height,50);
          .px2rem(margin-left,20);
          border: none;
          color: #fff;
          .px2rem(font-size,25);
          // background: #03A9F4;
          border-radius:4px;
        }
      }
    }
    
  }
  /*button禁用时的背景颜色*/
button{
background:#cccccc;
}
/*button可用时的背景颜色*/
.btnBg{
background:#03a9f4;
}
</style>