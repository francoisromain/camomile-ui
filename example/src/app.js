import Vue from 'vue'
import app from './app.vue'

// const App = Vue.extend(app)
// new App().$mount('#app')

new Vue({
  template: '<app/>',
  components: { app }
}).$mount('#app')
