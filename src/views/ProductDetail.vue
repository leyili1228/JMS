<template>
  <div>
    <!-- product_detail.html 12~53 -->
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2>
          <a href="">首页</a>&gt;<a href="">产品中心</a>&gt;<a href=""
            >佳仕美净化器</a
          >
        </h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container">
      <div class="pd_info clearfloat">
        <div class="pdinfo_img" v-if="data.pic">
          <img :src="'http://101.96.128.94:9999/mfresh/' + data.pic" alt="" />
        </div>
        <div class="pdinfo_text">
          <h2>{{ data.title1 }}</h2>
          <ul>
            <li>型号：{{ data.model }}</li>
            <li>功能：{{ data.func }}</li>
            <li>噪音：{{ data.noise }}</li>
            <li>风量：{{ data.wind }}</li>
            <li>适用对象：{{ data.applyTo }}</li>
            <li>适用面积：{{ data.size }}</li>
            <li>空气净化能效等级：{{ data.level }}</li>
          </ul>
          <p>
            价格：<span>¥</span><strong id="price">{{ data.price }}</strong>
          </p>
          <a @click="addCart" id="addCart"><span class="icon_cart"></span>加入购物车</a>
        </div>
      </div>
      <div class="details_box">
        <h2 class="title">产品详情</h2>
        <div class="pd_details" v-html="transformHTML(data.detail)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 异步请求未完成之前的报错解决方案: 给默认值可以防止 undefined 报错
      data: {},
    };
  },
  mounted() {
    console.log(this.$route);
    let pid = this.$route.params.pid;

    this.axios
      .get("product_detail.php?pid=" + pid)
      .then((res) => {
        console.log(res);
        this.data = res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  methods: {
    transformHTML(html) {
      // 防止网络请求未完毕前, html为undefined 导致的报错
      if (!html) return "";

      //<img src="product-imgs/m8088a/01.jpg" alt="">
      //<img src="http://101.96.128.94:9999/mfresh/product-imgs/m8088a/01.jpg" alt="">
      return html.replace(
        /<img src="product-imgs/g,
        '<img src="http://101.96.128.94:9999/mfresh/product-imgs' 
      );
    },
    addCart(){
      // 添加购物车
      let uid = this.$store.state.uid;
      let pid = this.$route.params.pid;
      this.axios.post("cart_detail_add.php",`uid=${uid}&pid=${pid}`)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.error(err); 
      })
    }
  },
};
</script>

<style></style>
