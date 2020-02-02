<template>
  <div>
    <h1>创建投票</h1>
    <p>用户: {{ user.username || '' }}</p>
    <BButton v-on:click="changePage('home')" variant="info">返回主页</BButton>
    <div style="max-width: 20rem; margin: 5px;">
      <BButton  v-on:click="createEvent" variant="success">创建</BButton>
      <BFormInput type="text" v-model="title" placeholder="title" style="margin: 2px;"/>
      <BFormInput type="text" v-model="info" placeholder="info" style="margin: 2px;"/>
      <div v-for="item in options" v-bind:key="item.id" style="display:flex; flex-direction: row; margin: 2px 0;">
        <BFormInput v-model="item.text" type="text" placeholder="option" style="width: 15rem; margin: 2px;"/>
        <BButton v-on:click="removeOption(options.indexOf(item))" variant="danger">删除</BButton>
      </div>
      <BButton v-on:click="addOption" variant="primary">新选项</BButton>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
import{ BForm, BFormInput, BButton } from 'bootstrap-vue';
export default {
  components: {
    BForm,
    BFormInput,
    BButton
  },
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