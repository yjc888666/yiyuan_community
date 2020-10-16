<template>
    <dl>
        <dt>
            <div class="tu"><img class="head-img" src="" ref="goodsImg" alt=""/></div>
        </dt>
        <dd>
            <p>请上传营业执照/组织机构代码证/法人证书扫描件，支持jpg、jpeg、png文件，最大5M</p> 
            <div class="back">
                <van-uploader :after-read="onRead" accept="image/*" multiple>
                    选择文件
                </van-uploader>
            </div>
            
        </dd>
    </dl>
</template>
<script>
export default {
  name: 'index',
  data () {
    return {
    }
  },
  methods:{
      onRead(file) {
		       console.log(file);
               //将原图片显示为选择的图片
               this.$refs.goodsImg.src = file.content;
		    //    this.$store.commit('filedata',file.content);
		   }
  }
}
</script>
<style scoped lang="less">
  .px2rem(@name,@px){
    @{name}:@px / 75 * 1rem;
  }
  .back{
        .px2rem(height,50);
        .px2rem(width,120);
        border: none;
        background: #d6d6d6;border-radius: 2px;
        .px2rem(font-size,22);
        text-align: center;
        .px2rem(line-height,50);
  }
  dl{
        display: flex;
        .px2rem(margin-top,25);
        .px2rem(margin-bottom,20);
        dt{
            width: 28%;
            .tu{
                .px2rem(width,180);
                .px2rem(height,180);
                background: #f6f6f6;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        dd{
            display: flex;
            flex-flow:column; 
            width: 70%;
            margin-left: 2%;
            p{
                flex: 1;
                height: 50%;
            }
        }
    }
</style>
