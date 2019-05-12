import Vue from 'vue'
import Router from 'vue-router'
import Skills from '../Skills/Skills.vue'
import Points from '../Points/Points.vue'

Vue.use(Router)

export default new Router({
    routes: [
      {
        path: '/',
        name: 'skills',
        component: Skills
      },
      {
        path: '/points',
        name: 'points',
        component: Points
      }
    ]
})