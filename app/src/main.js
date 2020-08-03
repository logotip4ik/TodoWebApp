import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import hooks from '@u3u/vue-hooks';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App.vue';
import router from './router';
import store from './store';

const vueShortKey = require('vue-shortkey');

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(hooks);
Vue.use(VueCompositionApi);
Vue.use(vueShortKey);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
