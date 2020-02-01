<template>
  <div>
    <h1>EVENT PAGE</h1>
    <button v-on:click="changePage('eventBrowser')">Event Browser</button>
    <h3>Title: {{ event.title }}</h3>
    <p>Info: {{ event.info }}</p>
    <div v-if="event.open_status">
      <b>Status: OPEN</b>
      <button v-if="user.userid === event.userid" v-on:click="changeOpenStatus(event_id, false)">Close Vote</button>
    </div>
    <div v-else>
      <b>Status: CLOSED</b>
      <button v-if="user.userid === event.userid" v-on:click="changeOpenStatus(event_id, true)">Re-Open Vote</button>
    </div>
    <p>Creator: {{ event.creator }}</p>
    <div v-for="item in event.option_list" v-bind:key="item.option_id">
      <b>Option: {{item.detail}}</b>
      <button v-if="event.open_status" v-on:click="vote(item.option_id)">Vote</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data(){
    return {
      user: this.$store.state.user,
      event_id: this.$store.state.eventId,
      event: ''
    }
  },
  created(){
    console.log(this.event_id);
    this.fetchEventData(this.event_id);
  },
  methods: {
    changePage(page){
      this.$emit('changePage', page);
    },
    vote(id){
      console.log(`userid: ${this.user.userid} is voting for option id: ${id}`)
    },
    changeOpenStatus(id, status){
      axios.put(
        `http://localhost:7001/event/status/${id}`,
        {
          open_status: status
        }
      )
        .then(res => {
          console.log(res);
          if(res.data.code !== 200){
            alert('operation failed');
          } else {
            this.fetchEventData(id);
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchEventData(id){
      axios.get(`http://localhost:7001/event/single/${id}`)
      .then(res => {
        console.log(res)
        if(res.data.code !== 200) {
          alert('not found');
        } else {
          axios.get(`http://localhost:7001/user/single/${res.data.data.event.userid}`)
            .then(user => {
              console.log(user);
              const event = res.data.data.event;
              const optionList = res.data.data.options.map(option => {
                return {
                  option_id: option._id,
                  detail: option.detail
                }
              });
              this.event = {
                title: event.title,
                info: event.info,
                open_status: event.open_status,
                userid: event.userid,
                creator: user.data.data.username,
                option_list: optionList
              }
            })
            .catch(err => {
              console.log(err);
            })
        }
      })
      .catch(err => {
        alert(err);
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>