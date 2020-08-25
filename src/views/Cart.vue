<template>
  <div>
    <!-- cart.html 12~69 -->
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2><a href="">首页</a>&gt;<a href="">产品中心</a></h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container">
      <div class="cart">
        <div class="cart_header">
          <span
            >已选商品<em>{{ total }}</em
            >件</span
          >
          <span
            >总金额：<strong>{{ totalPrice }}</strong></span
          >
          <button type="button">结算</button>
        </div>
        <div class="cart_con">
          <div class="cartcon_title">
            <span
              ><input
                type="checkbox"
                @change="checkAll()"
                v-model="check_all"
              />
              全选</span
            >
            <span>商品信息</span>
            <span>单价</span>
            <span>数量</span>
            <span>金额</span>
            <span>操作</span>
          </div>
          <ul>
            <h2 v-if="products.length == 0">购物车中没有任何商品！</h2>
            <li v-for="(item, index) in products" :key="index">
              <input
                type="checkbox"
                class="cart_checkbox"
                v-model="item.checked"
                @change="check()"
              />
              <a href="" class="cart_img"
                ><img
                  :src="'http://101.96.128.94:9999/mfresh/' + item.pic"
                  alt=""
              /></a>
              <a href="" class="cart_title">{{ item.title1 }}</a>
              <i>¥{{ item.price }}</i>
              <div>
                <span @click="changeCount(index, -1)">-</span>
                <input type="text" v-model="item.count" />
                <span @click="changeCount(index, 1)">+</span>
              </div>
              <strong>¥{{ item.price * item.count }}</strong>
              <em @click="doDel(index)"></em>
            </li>
          </ul>
        </div>
        <div class="cart_header">
          <span
            >已选商品<em>{{ total }}</em
            >件</span
          >
          <span
            >总金额：<strong>{{ totalPrice }}</strong></span
          >
          <button type="button">结算</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      check_all: false,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    changeCount(index, delta) {
      // delta: 变化量, 可以是 +1 或者 -1
      let product = this.products[index];
      let count = parseInt(product.count) + delta;

      // 数量最下为1
      if (count < 1) return;

      let { did, pid } = product;

      this.axios
        .post("cart_detail_update.php", `did=${did}&pid=${pid}&count=${count}`)
        .then((res) => {
          console.log(res);
          if (res.data.code == 1) {
            // alert("更新成功");
            product.count = count;
          } else {
            alert("更新失败");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

    doDel(index) {
      let product = this.products[index];

      this.axios
        .get("cart_detail_delete.php?did=" + product.did)
        .then((res) => {
          console.log(res);
          if (res.data.code == 1) {
            alert("删除成功!");
            this.products.splice(index, 1);
          } else {
            alert("删除失败!");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    check() {
      // 单独某个商品的选中
      // 在数学运算中, true是1, false是0
      // 数组里所有元素都勾选 即全是真的, 则总和 和 数组长度一致
      let sum = 0;
      this.products.forEach((item) => {
        sum += item.checked;
      });

      // 全选按钮的状态 = 所有栏目的选中数量总和 == 数组长度;
      this.check_all = sum === this.products.length;
    },
    checkAll() {
      console.log(this.check_all);
      // 全选
      this.products = this.products.map((item) => {
        item.checked = this.check_all;
        return item;
      });
    },
    getData() {
      let uid = this.$store.state.uid;
      this.axios
        .get("cart_detail_select.php?uid=" + uid)
        .then((res) => {
          // map(): 自动遍历数组 对每个元素进行修改. 然后返回新的数组
          this.products = res.data.products.map((item) => {
            item.checked = false;
            return item;
          });

          console.log(this.products);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  // 计算属性
  computed: {
    total() {
      // 勾选的商品数量
      let sum = 0;
      this.products.forEach((item) => {
        if (item.checked) sum++;
      });

      return sum;
    },
    totalPrice() {
      let sum = 0;
      this.products.forEach((item) => {
        if (item.checked) {
          sum += item.price * item.count;
        }
      });

      return sum;
    },
  },
};
</script>

<style>
.cart_con * {
  user-select: none;
}
</style>
