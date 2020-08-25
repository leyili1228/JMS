<template>
  <div>
    <div class="login_box">
      <div class="container">
        <div class="login">
          <h2>用户登录</h2>
          <dl class="clearfloat">
            <dt>
              <span class="tips" id="uname_prompt_text" style="display:inline" v-if="showErr">用户名错误</span>用户名：
            </dt>
            <dd>
              <input type="text" id="uname" placeholder="邮箱/手机号" v-model="uname" />
              <em class="icon_user"></em>
              <i class="icon_error" id="uname_prompt_icon"></i>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="tips" id="pwd_prompt_text">请输入密码</span>密码：
            </dt>
            <dd>
              <input type="password" id="pwd" placeholder="密码" v-model="upwd" />
              <em class="icon_pwd"></em>
              <i class="icon_error" id="pwd_prompt_icon"></i>
            </dd>
          </dl>
          <p>
            <label>
              <input type="checkbox" />
              <span>自动登录</span>
            </label>
          </p>
          <button type="button" id="login" @click="doLogin">立 即 登 录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uname:'',
      upwd:'',
      showErr:''
    }
  },
  methods: {
    doLogin(){
      this.axios.post("user_login.php",`unameOrPhone=${this.uname}&upwd=${this.upwd}`)
      .then(res => {
        console.log(res)
        // 解包
        let {code , uname , uid , phone} = res.data;
        if(code==1){
          this.$store.commit("updateUser",{uid,uname});

          this.$router.replace("/");
        }else{
          this.showErr = true;
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