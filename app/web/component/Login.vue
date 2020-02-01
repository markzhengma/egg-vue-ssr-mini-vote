<template>
  <div>
    <h1>LOGIN</h1>
    <form v-on:submit.prevent="login">
      <input type="text" v-model="username" placeholder="username"/>
      <input type="password" v-model="password" placeholder="password"/>
      <input type="submit"/>
    </form>
    <button v-on:click="changeLogin">Register!</button>
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
      password: ''
    }
  },
  methods: {
    changeLogin(){
      this.$emit('changeLogin');
    },
    login(){
      if(this.username === '' || this.password === '') {
        alert('Please fill in all the required fields!');
      } else {
        this.$emit('success', { username: this.username, password: this.password });
      }
    }
  }
}
</script>

<style>

</style>