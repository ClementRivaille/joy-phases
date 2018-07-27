import Vue from 'vue';
import App from './app';
// import router from './router';
// import i18n from './i18n/i18n';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  // i18n,
  template: '<App/>',
  components: { App },
  // methods: {
  //   changeLocale: (locale) => {
  //     i18n.locale = locale;
  //   },
  // },
  data() {
    return {
      world: 'WORLD',
    };
  },
});
