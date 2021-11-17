<template>
  <div class="login">
    <van-nav-bar title="登陆"/>
    <van-form @submit="onSubmit">
      <van-field
          v-model="user.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
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
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
    }
  },
  components: {
  },
  methods: {
    onSubmit() {
      this.$axios.post('admin/login',this.user).then(res => {
        console.log(res)
        if(res.status !== 200) return this.$toast.fail('登陆失败')
        this.$toast.success('登陆成功')
        this.$router.push('/home')
        localStorage.token = res.body.token
      })
    }
  }
}
</script>

<style lang="less" scoped>
  /deep/ .van-nav-bar__content {
    background: cadetblue;
    .van-nav-bar__title{
      color: white;
    }
  }
</style>