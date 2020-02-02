<template>
  <div>
    <h1>EVENT PAGE</h1>
    <BButton v-on:click="changePage('eventBrowser')" variant="info">返回投票列表</BButton>
    <h3>Title: {{ event.title }}</h3>
    <p>Info: {{ event.info }}</p>
    <div v-if="event.open_status">
      <b>Status: OPEN</b>
      <BButton v-if="user.userid === event.userid" v-on:click="changeOpenStatus(event_id, false)" variant="danger">关闭投票</BButton>
    </div>
    <div v-else>
      <b>Status: CLOSED</b>
      <BButton v-if="user.userid === event.userid" v-on:click="changeOpenStatus(event_id, true)" variant="success">打开投票</BButton>
    </div>
    <p>Creator: {{ event.creator }}</p>
    <BCard 
      v-for="item in event.option_list" 
      v-bind:key="item.option_id"
      :title="'Option: ' + item.detail"
      style="max-width: 20rem; margin: 2px;">
      <BButton v-if="event.open_status && !item.voted" v-on:click="vote(item.option_id)" variant="primary">Vote</BButton>
      <BButton v-else-if="event.open_status && item.voted" v-on:click="unvote(item.option_id)" variant="warning">Unvote</BButton>
      <div>
        <b>Voted Users: </b>
        <div class="user-card" v-for="user in item.user_list" v-bind:key="user.userid">
          {{ user.username }}
        </div>
      </div>
    </BCard>
  </div>
</template>

<script>
import axios from 'axios';
import { BButton, BCard, BCardText } from 'bootstrap-vue'
export default {
  components: {
    BButton,
    BCard,
    BCardText
  },
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
                let voted = false;
                option.user_list.forEach(user => {
                  if(user.userid === this.user.userid){
                    voted = true;
                  }
                })
                return {
                  option_id: option._id,
                  detail: option.detail,
                  user_list: option.user_list,
                  voted,
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
    },
    vote(option_id){
      axios.post(
        'http://localhost:7001/event/vote',
        {
          option_id,
          userid: this.user.userid
        }
      )
        .then(res => {
          console.log(res);
          if(res.data.code !== 200){
            alert('operation failed');
          } else {
            this.fetchEventData(this.event_id);
          }
        })
        .catch(err => {
          console.log(err);
        })
    },
    unvote(option_id){
      axios.delete(`http://localhost:7001/event/vote?option_id=${option_id}&userid=${this.user.userid}`)
        .then(res => {
          console.log(res);
          if(res.data.code !== 200){
            alert('operation failed');
          } else {
            this.fetchEventData(this.event_id);
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
  .option-card{
    padding: 5px;
    background-color: rgb(255, 244, 194);
    margin: 5px;
  }
  .user-card{
    padding: 0 8px;
    margin: 2px;
    border-radius: 4px;
    background-color: grey;
    color: white;
    display: inline-block;
  }
</style>