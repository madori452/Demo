<template>
    <h1 class="mt-5">Login Page</h1>
    <div class="container">
        <form class="col-8 mx-auto">
            <div class="mb-3 mt-5">
                <label for="exampleInputEmail1" class="form-label">fleetAccount</label>
                <input type="text" v-model="user.fleetAccount" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            </div>
            <div class="mb-3 mt-2">
                <label for="exampleInputPassword1" class="form-label">account</label>
                <input type="text" v-model="user.account" class="form-control" id="exampleInputPassword1">
            </div>
            <div class="mb-3 mt-2">
                <label for="exampleInputPassword1" class="form-label">pwd</label>
                <input type="password" v-model="user.pwd" class="form-control" id="exampleInputPassword1">
            </div>
            <div class="mb-3">
                <button type="submit"  class="btn btn-primary" @click="signIn">Submit</button>
            </div>
        </form>
    </div>
</template>
<script>
export default {
  data () {
    return {
      user: { fleetAccount: '', account: '', pwd: '' }
    }
  },
  methods: {
    signIn () {
      const api = `${process.env.VUE_APP_API}Token/GetToken`
      console.log(api)
      this.$http.post(api, this.user)
        .then((res) => {
          console.log(res)
          if (res.data.isSuccess === true) {
            const accessToken = res.data.data.accessToken
            const accessTokenExpires = res.data.data.accessTokenExpires
            console.log(new Date(accessTokenExpires))
            document.cookie = `kingwayToken=${accessToken}; expires=${new Date(accessTokenExpires)}`
            this.$router.push('/dashboard/map')
          }
        }).catch(err => {
          console.log(err)
          console.log(this.user)
        })
    }
  }
}

</script>

<style>

body{
  background-color: #dddddd70;
}
</style>
