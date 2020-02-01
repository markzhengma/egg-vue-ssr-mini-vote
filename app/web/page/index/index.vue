<template>
  <div>
    <!-- <h1>hello, world.</h1>
    <p>{{list}}</p> -->
    <h1>INDEX</h1>
    <Login v-if="isLogin" @changeLogin="changeLogin" @success="login"/>
    <Register v-else @changeLogin="changeLogin" @success="register"/>
  </div>
</template>

<script type="babel">
import Login from '../../component/Login';
import Register from '../../component/Register';
import axios from 'axios';
import { mapActions } from 'vuex';
export default {
  components: {
    Login,
    Register
  },
  data(){
    return {
      // user: 'markzhengma',
      // list: ''
      isLogin: true
    }
  },
  methods: {
    ...mapActions([
      'commitSetUser'
    ]),
    // findAll(){
    //   this.$request.get('/user/all')
    //     .then(res => {
    //       this.list = res.data;
    //       console.log(res.data);
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // }
    changeLogin(){
      this.isLogin = !this.isLogin;
    },
    register(data){
      axios.post(
        'http://localhost:7001/user/single', 
        { 
          username: data.username, 
          password: data.password 
        } 
      )
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
    },
    login(data){
      axios.get(
        'http://localhost:7001/user/login',
        {
          params: {
            username: data.username, 
            password: data.password
          } 
        }
      )
        .then(res => {
          console.log(res)
          if(res.data.code !== 200) {
            alert('Please check your username and password!');
          } else {
            const user = {
              username: res.data.data.username,
              userid: res.data.data._id
            };
            this.commitSetUser(user);
            this.$emit('changePage', 'home');
          }
        })
    }
  },
  created() {
    // this.findAll();
  }
}
</script>

<style>
  @import "index.css";
</style>