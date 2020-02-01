<template>
  <div>
    <h1>EVENT CREATOR</h1>
    <p>USER: {{ user.username || '' }}</p>
    <button v-on:click="changePage('home')">Home</button>
    <div>
      <input type="text" v-model="title" placeholder="title"/>
      <input type="text" v-model="info" placeholder="info"/>
      <div v-for="item in options" v-bind:key="item.id">
        <div>
          <input v-model="item.text" type="text" placeholder="option"/>
          <button v-on:click="removeOption(options.indexOf(item))">remove option</button>
        </div>
      </div>
      <button v-on:click="addOption">add option</button>
      <button  v-on:click="createEvent">create</button>
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
      title: '',
      info: '',
      options: [{ id: 0, text: ''}],
      newOptionIndex: 1
    }
  },
  methods: {
    ...mapActions([
      'commitSetEventId'
    ]),
    changePage(page){
      this.$emit('changePage', page);
    },
    createEvent(){
      const optionList = [];
      this.options.forEach(option => {
        optionList.push(option.text);
      });
      axios.post(
        'http://localhost:7001/event/single',
        {
          title: this.title,
          info: this.info,
          userid: this.user.userid,
          options: optionList
        }
      )
        .then(res => {
          console.log(res);
          this.$emit('changePage', 'event');
          this.commitSetEventId(res.data.data._id);
        })
        .catch(err => {
          console.log(err);
        })
    },
    addOption() {
      this.options.push({
        id: this.newOptionIndex ++,
        text: ''
      });
    },
    removeOption(index) {
      this.options.splice(index, 1);
    }
  }
}
</script>

<style>

</style>