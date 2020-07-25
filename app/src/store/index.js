import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import todos from './modules/todos';
import notify from './modules/notify';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    todos,
    notify,
  },
});
