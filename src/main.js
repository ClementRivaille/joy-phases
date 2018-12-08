import Vue from 'vue';
import App from './components/app';
import store from './store'

import './style.css';
import 'what-input'

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  components: { App },
  data() {
    return {
      world: 'WORLD',
    };
  },
  template: '<App/>',
});
