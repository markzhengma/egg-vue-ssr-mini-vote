<template>
  <div>
    <h1>登录页</h1>
    <div class="login-form">
      <BForm v-on:submit.prevent="login">
        <BFormInput type="text" v-model="username" placeholder="username"/>
        <BFormInput type="password" v-model="password" placeholder="password"/>
        <BButton type="submit" variant="primary">登录</BButton>
      </BForm>
    </div>
    <BButton v-on:click="changeLogin" variant="success">注册新用户</BButton>
  </div>
</template>

<script>
import{ BForm, BFormInput, BButton } from 'bootstrap-vue';
export default {
  components: {
    BForm,
    BFormInput,
    BButton
  },
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
  .login-form{
    width: 300px;
    margin: 10px;
  }
  .login-form input{
    margin: 5px;
  }
</style>