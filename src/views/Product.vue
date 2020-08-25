<template>
  <div>
    <!-- product.html 12~98 -->
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2><a href="">首页</a>&gt;<a href="">产品中心</a></h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container" v-if="data">
      <div class="pl_header">
        <router-link to="/product/1" :class="{ cur: type == 1 }"
          >佳仕美净化器</router-link
        >
        <router-link to="/product/2" :class="{ cur: type == 2 }"
          >佳仕美滤网</router-link
        >
      </div>
      <!-- 产品列表-->
      <ul class="product_list clearfloat">
        <li v-for="(item, index) in data.data" :key="index">
          <router-link :to="{name:'ProductDetail',params:{pid:item.pid}}">
            <img :src="'http://101.96.128.94:9999/mfresh/' + item.pic" alt=""/>
          </router-link>
          <div class="pdlist_text clearfloat">
            <h3>
              <p>{{ item.model }}</p>
              <span>{{ item.title2 }}</span>
            </h3>
            <router-link :to="{name:'ProductDetail',params:{pid:item.pid}}">查看详情</router-link>
          </div>
        </li>
      </ul>
      <!-- 分页导航-->
      <div class="pages">
        <a @click="getData(data.pageNum - 1)" v-if="data.pageNum > 1">上一页</a>
        <a v-else class="default">上一页</a>

        <a
          v-for="(item, index) in data.pageCount"
          :key="index"
          @click="getData(item)"
          :class="{ cur: item == data.pageNum }"
          >{{ item }}</a
        >
        <a
          @click="getData(data.pageNum + 1)"
          v-if="data.pageNum < data.pageCount"
          >下一页</a
        >
        <a v-else class="default">下一页</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 如果开启属性传参 props:true, 则:
  props: ["type"],
  data() {
    return {
      data: null,
    };
  },
  mounted() {
    // 普通方式的路由参数, 存放在$route中
    // console.log(this.$route);
    // 通过属性读取路由传参
    // console.log(this.type);

    this.getData(1);
  },
  // 路由官方文档: 导航守卫
  // https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
  beforeRouteUpdate(to, from, next) {
    // 相当于生命周期, 监听路由变化
    // console.log(to, from, next);

    // 当路由变更时, 重新发送请求, 获取新的数据!
    this.getData(1);

    // next()代表继续下一步, 如果不写, 路由默认的后续操作就会停止.
    next();
  },
  methods: {
    getData(pageNum) {
      this.axios
        .get(`product_select.php?type=${this.type}&pageNum=${pageNum}`)
        .then((res) => {
          // console.log(res);
          this.data = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style></style>
