import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './assets/styles/main.scss';
import * as VueGoogleMaps from 'vue2-google-maps';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI, { locale });

import './assets/styles/main.scss';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDyKytLc6HSBg15d2n3erx3dlTpxi4Xci8',
    libraries: 'places',
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
