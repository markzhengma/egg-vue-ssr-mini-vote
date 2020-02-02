<template>
  <div id="app">
    <Header/>
    <Index v-if="page === 'index'" @changePage="changePage"/>
    <Home v-if="page === 'home'" @changePage="changePage"/>
    <EventCreator v-if="page === 'eventCreator'" @changePage="changePage"/>
    <EventBrowser v-if="page === 'eventBrowser'" @changePage="changePage"/>
    <Event v-if="page === 'event'" @changePage="changePage"/>
  </div>
</template>

<script>
import Header from './component/Header';
import Index from './page/index/index';
import Home from './page/home/home';
import EventCreator from './page/eventCreator/eventCreator';
import EventBrowser from './page/eventBrowser/eventBrowser';
import Event from './page/event/event';
import { mapActions } from 'vuex';
export default {
  components: {
    Header,
    Index,
    Home,
    EventCreator,
    EventBrowser,
    Event
  },
  name: 'app',
  data () {
    return {
      user: this.$store.state.user,
      page: this.$store.state.page
    }
  },
  created(){
    this.$store.watch(
      (state, getters) => getters.getPage,
      (newValue, oldValue) => {
        console.log(`changing page from ${oldValue} to ${newValue}`);
        this.page = this.$store.state.page;
      }
    )
  },
  methods: {
    ...mapActions([
      'commitSetPage'
    ]),
    changePage(page){
      this.commitSetPage(page);
    }
  }
}
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #555;
}
#app{
  padding: 10px;
}
</style>
