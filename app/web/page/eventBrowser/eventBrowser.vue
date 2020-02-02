<template>
  <div>
    <h1>EVENT BROWSER</h1>
    <p>USER: {{ user.username || '' }}</p>
    <BButton v-on:click="changePage('home')" variant="info">回主页</BButton>
    <h3>EVENT LIST</h3>
    <BCard 
      v-for="item in event_list" 
      v-bind:key="item._id"
      style="max-width: 20rem; margin: 5px"
      :title="item.title">
      <BCardText v-if="item.open_status">状态: OPEN</BCardText>
      <BCardText v-else>状态: CLOSED</BCardText>
      <BButton v-if="item.userid === user.userid" v-on:click="deleteEvent(item._id)" variant="danger">Delete</BButton>
      <BButton v-on:click="goToEventPage(item._id)" variant="primary">Detail</BButton>
    </BCard>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
import { BCard, BButton, BCardText } from 'bootstrap-vue'
export default {
  components: {
    BCard,
    BButton,
    BCardText
  },
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
    },
    deleteEvent(id){
      axios.delete(`http://localhost:7001/event/single/${id}`)
        .then(res => {
          console.log(res);
          if(res.data.code !== 200){
            alert('not found!')
          } else {
            alert('Delete event successful')
            this.findAllEvents();
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
}
</script>

<style scoped>
  .event-card{
    background-color: grey;
    color: white;
    margin: 10px;
    padding: 10px;
  }
</style>