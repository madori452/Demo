<template>
    <h3 class="user">USER : {{user}}</h3>
    <router-view/>
</template>
<style>
h3.user{
  z-index: 8888;
  position: relative;
  font-size: 16px;
  padding: 10px;
  background-color: #e7f3ff;
  margin-bottom: 0px;
}
</style>

<script>
export default
{
  data () {
    return {
      user: ''
    }
  },
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)kingwayToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = `Bearer ${token}`
    const api = `${process.env.VUE_APP_API}Token/GetUser`
    this.$http.get(api).then((res) => {
      this.user = res.data.data.users.user.account
      // this.user = res.data.data.users.user.account
      // 判斷如果為 Unauthorized 跳到登入頁面
      if (res.status(401)) {
        this.$router.push('/login')
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
