<template>
  <div>
    <h1>HOME!</h1>
    <h3>Welcome, {{ user.username || '' }}!</h3>
    <button v-on:click="changePage('eventCreator')">Create Vote Event</button>
    <button v-on:click="changePage('eventBrowser')">Browse Vote Event</button>
  </div>
</template>

<script>
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