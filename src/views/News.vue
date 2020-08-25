<template>
  <div>
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
      <div class="news">
        <ul v-if="data">
          <li v-for="(item,index) in data" :key="index">
            <span>{{item.pubTime | date}}</span>
            <router-link :to="`/news_detail/${item.nid}`">{{transformHTML(item.title)}}</router-link>
          </li>
        </ul>
      </div>
      <!-- 分页导航-->
      <div class="pages">
        <a @click="getData(pageNum - 1)" v-if="pageNum>1" class>上一页</a>
        <a class="default" v-else>上一页</a>
        <a v-for="(item,index) in pageCount" 
           :key="index"
           :class="{cur:item == pageNum}"
           @click="getData(item)"
           >{{item}}</a>
        <a @click="getData(pageNum + 1)" v-if="pageNum < pageCount" >下一页</a>
        <a class="default" v-else>下一页</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      pageCount: 0,
      pageNum: 0,
      pageSize: 0,
      totalRecord: 0
    };
  },
  mounted() {
    this.getData(1);
  },
  methods: {
    getData(pno){
      // 考虑到网络请求需要重复使用,这里封装成一个函数
      // 在main.js中配置了基础路径
      let url = "news_select.php?pageNum=" + pno;
      this.axios
        .get(url)
        .then(res => {
          console.log(res.data.data);
          this.data = res.data.data;
          this.pageCount = res.data.pageCount;
          this.pageNum = res.data.pageNum;
          this.pageSize = res.data.pageSize;
          this.totalRecord = res.data.totalRecord;
        })
        .catch(err => {
          console.error(err);
        });
    },
    transformHTML(html) {
      // 防止网络请求未完毕前, html为undefined 导致的报错
      if (!html) return "";

      //<img src="product-imgs/m8088a/01.jpg" alt="">
      //<img src="http://101.96.128.94:9999/mfresh/product-imgs/m8088a/01.jpg" alt="">
      return html.replace(
        /净美仕/g,
        '佳仕美'
      );
    },
  }
};
</script>

<style>
.pages>a{
  cursor: pointer;
  -moz-user-select:none;
  -webkit-user-select:none;
  -ms-user-select:none;
  -khtml-user-select:none;
  user-select:none;
}
</style>