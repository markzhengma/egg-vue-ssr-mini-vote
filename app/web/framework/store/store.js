import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  state: {
    user: {
      username: '',
      userid: ''
    },
    page: 'index',
    eventId: ''
  },
  getters: {
    getPage: state => {
      return state.page
    }
  },
  mutations: {
    setUser: (state, data) => {
      state.user = data;
    },
    setPage: (state, page) => {
      state.page = page;
    },
    setEventId: (state, id) => {
      state.eventId = id;
    }
  },
  actions: {
    commitSetUser: (context, data) => {
      context.commit('setUser', data);
    },
    commitSetPage: (context, data) => {
      context.commit('setPage', data);
    },
    commitSetEventId: (context, data) => {
      context.commit('setEventId', data);
    }
  }
});