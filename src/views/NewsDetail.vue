<template>
  <div>
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2>
          <a href>首页</a>&gt;
          <a href>公司动态</a>
        </h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container">
      <div class="news_details">
        <h2>{{transfromHTML(data.title)}}</h2>
        <span>发布时间：{{data.pubTime | date}}</span>
        <div v-if="data" class="news_content" v-html="transfromHTML(data.content)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data:[]
    }
  },
  methods:{
    transfromHTML(html){
      if(this.data.content){
        return html.replace(
          /<img src="news_imgs/g,
          '<img src="http://101.96.128.94:9999/mfresh/news_imgs'
        ).replace(
          /净美仕/g,'佳仕美'
        )
      }
    }
  },
  mounted() {
    console.log(this.$route.params);
    let nid = this.$route.params.nid;
    this.axios.get("news_detail.php?nid=" + nid)
    .then(res => {
      console.log(res.data)
      this.data = res.data;
    })
    .catch(err => {
      console.error(err); 
    })
  },
  
};
</script>

<style>
</style>