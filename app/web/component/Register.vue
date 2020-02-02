<template>
  <div>
    <h1>REGISTER</h1>
    <div class="login-form">
      <BForm v-on:submit.prevent="register">
        <BFormInput type="text" v-model="username" placeholder="username"/>
        <BFormInput type="password" v-model="password" placeholder="password"/>
        <BFormInput type="password" v-model="passwordCheck" placeholder="password again"/>
        <BButton type="submit" variant="primary">注册</BButton>
      </BForm>
    </div>
    <BButton v-on:click="changeLogin" variant="success">跳至登录页</BButton>
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

<style scoped>
  .login-form{
    width: 300px;
    margin: 10px;
  }
  .login-form input{
    margin: 5px;
  }
</style>