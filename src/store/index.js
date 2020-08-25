import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 用于书写组件间共享的变量
  state: {
    uid: sessionStorage.getItem("uid"),
    uname: sessionStorage.getItem("uname"),
  },
  // 专门更新state的值的方法
  mutations: {
    // user是形参   {uanme:xxx,uid:xxx}
    updateUser(state,user){
      state.uid = user.uid;
      state.uname = user.uname;

      // 为了防止页面刷新时, 状态值的消失. 利用session 来存储
      sessionStorage.setItem("uid", user.uid);
      sessionStorage.setItem("uname", user.uname);

      // bug: 退出之后, 设置为 null, 则session存储的是 {'uid': null}
      // getItem()的机制: 键只要存在 返回值是字符串类型,  所以反馈的是 'null', 导致结果错误.
      // 解决方式: 如果是null 则移除对应的键
      if (user.uid === null) sessionStorage.removeItem("uid");
      if (user.uname === null) sessionStorage.removeItem("uname");
    }
  },
  actions: {
  },
  modules: {
  }
})
