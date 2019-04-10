import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate';
import Notifications from 'vue-notification'
import router from './components/Utils/router'
import store from './components/Utils/Store/store'
// import VueAxios from 'vue-axios';
// import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(VeeValidate);
Vue.use(Notifications);
// Vue.use(VueAxios,axios);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
