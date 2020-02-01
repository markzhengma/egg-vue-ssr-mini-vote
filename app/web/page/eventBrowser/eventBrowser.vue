<template>
  <div>
    <h1>EVENT BROWSER</h1>
    <p>USER: {{ user.username || '' }}</p>
    <button v-on:click="changePage('home')">Home</button>
    <h3>EVENT LIST</h3>
    <div v-for="item in event_list" v-bind:key="item._id">
      <h5>{{ item.title }}</h5>
      <b v-if="item.open_status">Status: OPEN</b>
      <b v-else>Status: CLOSED</b>
      <button v-on:click="goToEventPage(item._id)">Detail</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
export default {
  data(){
    return {
      user: this.$store.state.user,
      event_list: []
    }
  },
  created(){
    this.findAllEvents();
  },
  methods: {
    ...mapActions([
      'commitSetEventId'
    ]),
    changePage(page){
      this.$emit('changePage', page);
    },
    findAllEvents(){
      axios.get('http://localhost:7001/event/all')
        .then(res => {
          console.log(res);
          if(res.data.code !== 200){
            alert('not found!')
          } else {
            this.event_list = res.data.data
          }
        })
        .catch(err => {
          console.log(err);
        })
    },
    goToEventPage(id){
      console.log(`navigating to event page id: ${id}`);
      this.$emit('changePage', 'event');
      this.commitSetEventId(id);
    }
  }
}
</script>

<style>

</style>