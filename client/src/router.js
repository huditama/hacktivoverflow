import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'
import CreateQuestion from './views/CreateQuestion.vue'
import ViewQuestion from './views/ViewQuestion.vue'
import UserDashboard from './views/UserDashboard.vue'
import UserAnswers from './views/UserAnswers.vue'
import Jobs from './views/Jobs.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: 'view/:QuestionId',
          name: 'view',
          component: ViewQuestion
        }
      ],
      beforeEnter(to, from, next) {
        if (localStorage.getItem('token')) next()
        else next('/login')
      }
    },
    {
      path: '/createQuestion',
      name: 'createQuestion',
      component: CreateQuestion,
      beforeEnter(to, from, next) {
        if (localStorage.getItem('token')) next()
        else next('/login')
      }
    },
    {
      path: '/myDashboard',
      name: 'userDashboard',
      component: UserDashboard,
      beforeEnter(to, from, next) {
        if (localStorage.getItem('token')) next()
        else next('/login')
      }
    },
    {
      path: '/myAnswers',
      name: 'userAnswers',
      component: UserAnswers,
      beforeEnter(to, from, next) {
        if (localStorage.getItem('token')) next()
        else next('/login')
      }
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: Jobs
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
