import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MainView from '../views/MainView.vue'
import ProfileView from '../views/Profile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: MainView,
    props: { view: true }
  },
  {
    path: '/menu',
    name: 'Menu',
    component: MainView,
    props: { view: false }
  },
  {
    path: '/sign',
    name: 'SignUp',
    component: ProfileView,
    props: { view: false }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
    props: { view: true }
  }
]

const router = new VueRouter({
  routes
})

export default router
