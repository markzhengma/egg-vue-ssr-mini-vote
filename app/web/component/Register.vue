<template>
  <div>
    <h1>REGISTER</h1>
    <form v-on:submit.prevent="register">
      <input type="text" v-model="username" placeholder="username"/>
      <input type="password" v-model="password" placeholder="password"/>
      <input type="password" v-model="passwordCheck" placeholder="password check"/>
      <input type="submit"/>
    </form>
    <button v-on:click="changeLogin">Login!</button>
  </div>
</template>

<script>
export default {
  computed: {
    // username(){
    //   return this.$store.state.user.username;
    // }
  },
  data(){
    return{
      username: '',
      password: '',
      passwordCheck: ''
    }
  },
  methods: {
    changeLogin(){
      this.$emit('changeLogin');
    },
    register(){
      if(this.username === '' || this.password === '' || this.passwordCheck === '') {
        alert('Please fill in all the required fields!');
      } else {
        if(this.password !== this.passwordCheck){
          alert('Please input the same password again in password check!');
        } else {
          this.$emit('success', { username: this.username, password: this.password });
          this.changeLogin();
        }
      }
    }
  }
}
</script>

<style>

</style>