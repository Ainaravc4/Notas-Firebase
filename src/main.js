import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

/**VUEFIRE */
import { firestorePlugin } from 'vuefire'
Vue.use(firestorePlugin)

/**BOOTESTRAP */
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

/**AUTENTICACION  */
import * as firebase from 'firebase/app';
import 'firebase/auth';
Vue.component(firebase);


/**COMPONENTES */
import nota from './components/nota.vue'
Vue.component(nota);

/**ROUTER */
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  { path: '/nota', component: nota, meta: { requiresAuth: true} }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

import Firebase from './components/db.js'

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!Firebase.auth.currentUser) {
      next('/')
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
