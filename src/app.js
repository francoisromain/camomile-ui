import './css/styles.css'
import Vue from 'vue'

import app from './components/app.vue'

// const App = Vue.extend(app)
// new App().$mount('#app')

new Vue({
  template: '<app/>',
  components: { app }
}).$mount('#app')
