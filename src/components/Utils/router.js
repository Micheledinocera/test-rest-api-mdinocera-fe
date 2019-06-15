import Vue from 'vue'
import Router from 'vue-router'
import Skills from '../Skills/Skills.vue'
import Points from '../Points/Points.vue'
import Admin from '../Admin/Admin.vue'

Vue.use(Router)

export default new Router({
    routes: [
      {
        path: '/skills',
        name: 'skills',
        component: Skills
      },
      {
        path: '/points',
        name: 'points',
        component: Points
      },
      {
        path: '/',
        name: 'admin',
        component: Admin
      }
    ]
})