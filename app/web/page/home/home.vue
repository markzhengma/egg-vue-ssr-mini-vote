<template>
  <div>
    <h1>个人主页</h1>
    <h3>欢迎, {{ user.username || '' }}!</h3>
    <BButton v-on:click="changePage('eventCreator')" variant="danger">Create Vote Event</BButton>
    <BButton v-on:click="changePage('eventBrowser')" variant="warning">Browse Vote Event</BButton>
  </div>
</template>

<script>
import { BButon } from 'bootstrap-vue'
export default {
  data(){
    return {
      user: this.$store.state.user
    }
  },
  methods: {
    changePage(page){
      this.$emit('changePage', page);
    }
  }
}
</script>

<style>

</style>