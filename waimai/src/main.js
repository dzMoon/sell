// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
Vue.prototype.$http = axios
import router from './router'
import moment from 'moment/moment'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
Vue.filter('moment', function (value, formatString) {
    formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
    // return moment(value).format(formatString); // value可以是普通日期 20170723
    return moment.unix(value).format(formatString); // 这是时间戳转时间
});