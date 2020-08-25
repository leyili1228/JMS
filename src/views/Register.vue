<template>
  <div>
    <div class="register">
      <h2>新用户注册</h2>
      <ul>
        <li>
          <span>邮箱：</span>
          <input type="text" id="uname" placeholder="请输入邮箱名" v-model="email" />
          <em></em>
          <i></i>
        </li>
        <li>
          <span>密码：</span>
          <input type="password" id="upwd" placeholder="请输入密码" v-model="passwd" />
          <em></em>
          <i></i>
        </li>
        <li>
          <span>重复密码：</span>
          <input type="password" id="upwd2" placeholder="请重复输入密码" v-model="re_passwd" />
          <em></em>
          <i></i>
        </li>
        <li>
          <span>手机号：</span>
          <input type="text" id="phone" placeholder="请输入手机号" v-model="phone" />
          <em></em>
          <i></i>
        </li>
        <li>
          <span>验证码：</span>
          <input type="text" class="inp_yzm" placeholder="请输入验证码" v-model="code" />
          <img src="../assets/images/yzm.png" alt />
          <strong class="icon_refresh"></strong>
        </li>
        <li class="li_checkbox">
          <label>
            <input type="checkbox" v-model="checked" />
            <span>我已阅读并同意用户注册协议</span>
          </label>
        </li>
        <li class="li_btn">
          <button @click="doLogin" v-if="checked">提交注册</button>
          <button class="disabled" disabled v-else>提交注册</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email:'',
      passwd:'',
      re_passwd:'',
      phone:'',
      code:'',
      checked:false  //默认false 未勾选
    }
  },
  methods: {
    doLogin(){
      // 
      this.axios.post("user_register.php",`uname=${this.email}&upwd=${this.passwd}&phone=${this.phone}`)
      .then(res => {
        console.log(res)
        
        // 解包写法
        let {code , uid , uname} = res.data;
        if(code == 1){
          alert("注册成功,即将之前页面");
          // -1代表上一页
          this.$router.go(-1);
          // 更新状态值  -->   Vue X
          this.$store.commit("updateUser",{uname,uid});
        }else{
          alert("注册失败");
        }

      })
      .catch(err => {
        console.error(err); 
      })
    }
  },
};
</script>

<style>
</style>