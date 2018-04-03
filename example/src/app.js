import Vue from 'vue'
import app from './app-test.vue'

new Vue({
  components: { app },
  template: '<app/>'
}).$mount('#app')
