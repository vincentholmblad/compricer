import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

Vue.use(require('vue-moment'));

import lineClamp from 'vue-line-clamp'
 
Vue.use(lineClamp, {})

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart, faComment, faPlay, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHeart)
library.add(faComment)
library.add(faPlay)
library.add(faSearch)

Vue.component('font-awesome-icon', FontAwesomeIcon)

require('./assets/scss/main.scss');

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
