<template>
    <div class="grcenter_model"  @click.self="dsds">
        <div class="footer">
            <ul>
                <li><input type="text" v-model="items.text" ref="count" v-focus="true" @focus="bbb" placeholder="请输入用户名"></li>
                <li><span>{{number}}/15<button @click="baocun">保存</button></span></li>
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
            items: {
                text:this.$store.state.msg,
            },
        }
    },
    methods:{
        dsds(){
            this.$store.commit('isuserhead',false);
        },
        baocun(){
            if(this.items.text != "" && this.number >= 2){
                var data = {
                    name:this.items.text,
                    userhome:localStorage.getItem('msgfive'),
                    description:this.$store.state.msgtwo,
                    sex:this.$store.state.msgthree == '男'?1:0,
                    birthday:this.$store.state.msgfour
                }
                this.$axios({
                    method: 'post',
                    url: this.GLOBAL.baseURL+'/user/edit',
                    data: data
                }).then((res)=>{
                    this.$toast(res.data.msg == '操作成功！'?'修改成功':res.data.msg);
                    if(res.data.result){
                        this.$store.commit('msg',this.items.text);
                        localStorage.setItem('msg',this.items.text);
                        this.$store.commit('isuserhead',false);
                    }
                })
            }
        },
        bbb(){
            this.number = this.$refs.count.value.length
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
        items:{
            handler:function(){
                var _this = this;
                var _sum = 15; //字体限制为100个
                _this.$refs.count.setAttribute("maxlength",_sum);
                _this.number=_this.$refs.count.value.length;
            },
            deep:true
        }
    },
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
    .px2rem(height,200);
    background: #fff;
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
      }
      li{
        .px2rem(height,80);
        input{
          width: 100%;
          .px2rem(height,80);
          .px2rem(padding-left,20);
          .px2rem(padding-right,20);
          border: none;
          background: #f9f9f9;
        }
        span{
            .px2rem(font-size,25);
        }
        button{
          .px2rem(width,100);
          .px2rem(height,50);
          .px2rem(margin-left,20);
          border: none;
          color: #fff;
          .px2rem(font-size,25);
          background: #03A9F4;
        }
      }
    }
    
  }
</style>