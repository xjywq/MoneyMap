import Vue from 'vue'
import App from './App'

import store from './store'

Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'

Vue.filter('numfilter', (value, num) => {
  const nums = num || '5';// 设置限定字数,默认为5
  if (!value) return '';
  if (value.length > nums) {
    return value.slice(0, nums) + '...';
  }
  return value;
});

const app = new Vue({
	store,
    ...App
})
app.$mount()


