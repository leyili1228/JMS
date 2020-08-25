<template>
  <div>
    <!-- 页头 -->
    <!-- vue要求,模板的内容只能有一个唯一的父元素 -->
    <!-- 此网站是重构 !!! -->
    <header class="header container">
      <h1 class="logo">
        <router-link to="/" class="link"></router-link>
      </h1>
      <div class="h_con">
        <ul class="clearfloat">
          <li class="phone">4000-585-116</li>
          <li>
            <a href="#">中文</a>
          </li>
          <li>
            <em>|</em>
          </li>
          <li>
            <a href="#">English</a>
          </li>
          <li>
            <a href="#" class="weixin"></a>
          </li>
          <li>
            <a href="#" class="weibo"></a>
          </li>
          <li v-if="!$store.state.uid">
            <router-link to="/login" class="h_login">登录</router-link>
          </li>
          <li v-if="!$store.state.uid"><em>|</em></li>
          <li v-if="!$store.state.uid">
            <router-link to="/register" class="h_register">注册</router-link>
          </li>
          <li v-if="$store.state.uid" class="top_user"><a href="">{{uname}}</a></li>
          <li v-if="$store.state.uid" class="top_quit"><a @click="Logout">退出</a></li>
        </ul>
        <div class="search clearfloat">
          <button type="button"></button>
          <input type="text" />
        </div>
      </div>
    </header>
    <!--nav-->
    <nav class="navbar">
      <div class="container">
        <div class="nav">
          <ul>
            <li>
              <router-link to="/">
                <span class="icon_home"></span>首页
              </router-link>
            </li>
            <li>
              <router-link to="about">关于佳仕美</router-link>
            </li>
            <li>
              <router-link to="/news">公司动态</router-link>
            </li>
            <li class="nav_pd">
              <router-link to="/product/1" :class="{navCur: $router.name == 'Product'}">
                产品中心
                <span class="icon_pd"></span>
              </router-link>
              <div class="pd_dropdown">
                <router-link to="/product/1">佳仕美净化器</router-link>
                <router-link to="/product/2">佳仕美滤网</router-link>
              </div>
            </li>
            <li>
              <router-link to="/contcat">联系我们</router-link>
            </li>
          </ul>
        </div>
        <div class="s_cart" v-if="$store.state.uid">
          <router-link to="/cart">
            <span class="icon_cart"></span>购物车(
            <strong id="cart_sum">0</strong>)
            <span class="icon_sj"></span>
          </router-link>
          <div class="cart_dropdown">
            <!--<h3>您的购物车为空~</h3>-->
            <ul>
              <!--<li>-->
              <!--<a href=""><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
              <!--<div>-->
              <!--<span>-</span><input type="text" value="2"/><span>+</span>-->
              <!--</div>-->
              <!--<strong>¥1599.00</strong>-->
              <!--<em></em>-->
              <!--</li>-->
              <!--<li>-->
              <!--<a href=""><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
              <!--<div>-->
              <!--<span>-</span><input type="text" value="2"/><span>+</span>-->
              <!--</div>-->
              <!--<strong>¥1599.00</strong>-->
              <!--<em></em>-->
              <!--</li>-->
            </ul>
            <div class="cd_js clearfloat">
              <span>
                共计：
                <strong>0.00</strong>
              </span>
              <a href="#">结算</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uname:this.$store.state.uname
    }
  },
  methods: {
    Logout(){
     this.$store.commit("updateUser", { uid: null, uname: null });
    }
  },
};
</script>

<style>
  /* 
  router-link在选中状态时,会自动添加两个样式 
  router-link-exact-active 精确匹配
  router-link-active 模糊匹配
  */
  .nav a.router-link-exact-active{
    background-color: orange;
  }
  .nav a.router-link-exact-active,.navCur:hover{
    background-color: orange;
  }
</style>