<template>
  <div class="register">
    <nav-bar :nav-info="navInfo"/>
    <van-form @submit="onSubmit">
      <van-field
          v-model="user.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写账号' }]"
      />
      <van-field
          v-model="user.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button  block type="primary" native-type="submit">提 交</van-button>
      </div>
      <div class="register-info" @click="goLogin">已有账号,去登陆~</div>
    </van-form>
  </div>
</template>

<script>
import NavBar from "components/common/navBar/NavBar";
export default {
  name: "Register",
  data() {
    return {
      navInfo: { title: '账号注册' },
      user: {
        username: '',
        password: ''
      },
    }
  },
  methods: {
    onSubmit() {
      this.$axios.post('admin/registered',this.user).then(res => {
        console.log(res)
        if(res.status !== 200) return this.$toast.fail(res.description)
        this.$toast.success(res.description)
        this.$router.replace('/login')
      })
    },
    goLogin() {
      this.$router.replace('/login')
    }
  },
  components: {NavBar}
}
</script>

<style lang="less" scoped>
  .register{
    *{
      font-size: 14px;
    }
    .van-nav-bar__title{
      font-size: 14px;
    }
    /deep/.van-nav-bar__left *{
      color: black;
    }
    .van-form{
      margin-top: 20px;
      .register-info{
        font-size: 13px;
        width: 120px;
        text-align: center;
        margin: auto;
        color: #7c7878;
      }
    }
  }
</style>